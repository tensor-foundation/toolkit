#!/usr/bin/env zx
import 'zx/globals';
import * as c from 'codama';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor as renderJavaScriptVisitor } from '@codama/renderers-js';

// Paths.
const packageDir = path.join(__dirname, '..');
const idlDir = path.join(__dirname, '..');

// Render Token Metadata types.
const idl = rootNodeFromAnchor(
  require(path.join(idlDir, 'token-metadata.json'))
);
const codama = c.createFromRoot(idl, []);

const metadataSeeds = [
  c.constantPdaSeedNodeFromString('utf8', 'metadata'),
  c.constantPdaSeedNodeFromProgramId(),
  c.variablePdaSeedNode(
    'mint',
    c.publicKeyTypeNode(),
    'The address of the mint account'
  ),
];

codama.update(
  c.updateAccountsVisitor({
    metadata: {
      seeds: metadataSeeds,
    },
    masterEditionV2: {
      name: 'masterEdition',
      seeds: [
        ...metadataSeeds,
        c.constantPdaSeedNodeFromString('utf8', 'edition'),
      ],
    },
    tokenRecord: {
      seeds: [
        ...metadataSeeds,
        c.constantPdaSeedNodeFromString('utf8', 'token_record'),
        c.variablePdaSeedNode(
          'token',
          c.publicKeyTypeNode(),
          'The address of the token account (ata or not)'
        ),
      ],
    },
    // Deprecated nodes.
    'mplTokenMetadata.ReservationListV1': { delete: true },
    'mplTokenMetadata.ReservationListV2': { delete: true },
  })
);

// Unwrap types and structs.
codama.update(c.unwrapDefinedTypesVisitor(['AssetData']));
codama.update(c.unwrapTypeDefinedLinksVisitor(['metadata.data']));
codama.update(
  c.flattenStructVisitor({
    Metadata: ['data'],
    'CreateArgs.V1': ['assetData'],
  })
);

// Create versioned instructions.
codama.update(
  c.createSubInstructionsFromEnumArgsVisitor({
    create: 'createArgs',
    mint: 'mintArgs',
  })
);

codama.update(
  c.updateInstructionsVisitor({
    createV1: {
      accounts: {
        mint: { isSigner: 'either' },
        updateAuthority: { isSigner: 'either' },
        masterEdition: {
          defaultValue: c.pdaValueNode('masterEdition'),
        },
      },
    },
  })
);

// Render JavaScript.
codama.accept(
  renderJavaScriptVisitor(path.join(packageDir, 'src', 'generated'), {
    prettier: require(path.join(packageDir, '.prettierrc.json')),
  })
);
