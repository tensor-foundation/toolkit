#!/usr/bin/env zx
import 'zx/globals';
import * as k from 'kinobi';
import { rootNodeFromAnchor } from '@kinobi-so/nodes-from-anchor';
import { renderVisitor as renderJavaScriptVisitor } from '@kinobi-so/renderers-js';

// Paths.
const packageDir = path.join(__dirname, '..');
const idlDir = path.join(__dirname, '..');

// Render Token Metadata types.
const idl = rootNodeFromAnchor(
  require(path.join(idlDir, 'token-metadata.json'))
);
const kinobi = k.createFromRoot(idl, []);

kinobi.update(
  k.deleteNodesVisitor([
    (node, _stack) => {
      return node.kind === 'instructionNode' && /delegate*/.test(node.name);
    },
    (node, _stack) => {
      return node.kind === 'instructionNode' && /revoke*/.test(node.name);
    },
    (node, _stack) => {
      return node.kind === 'instructionNode' && /update*/.test(node.name);
    },
  ])
);

const metadataSeeds = [
  k.constantPdaSeedNodeFromString('utf8', 'metadata'),
  k.constantPdaSeedNodeFromProgramId(),
  k.variablePdaSeedNode(
    'mint',
    k.publicKeyTypeNode(),
    'The address of the mint account'
  ),
];

kinobi.update(
  k.updateAccountsVisitor({
    metadata: {
      seeds: metadataSeeds,
    },
    masterEditionV2: {
      name: 'masterEdition',
      seeds: [
        ...metadataSeeds,
        k.constantPdaSeedNodeFromString('utf8', 'edition'),
      ],
    },
    tokenRecord: {
      seeds: [
        ...metadataSeeds,
        k.constantPdaSeedNodeFromString('utf8', 'token_record'),
        k.variablePdaSeedNode(
          'token',
          k.publicKeyTypeNode(),
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
kinobi.update(k.unwrapDefinedTypesVisitor(["AssetData"]));
kinobi.update(k.unwrapTypeDefinedLinksVisitor(["metadata.data"]));
kinobi.update(
  k.flattenStructVisitor({
    Metadata: ["data"],
    "CreateArgs.V1": ["assetData"],
  })
);

// Create versioned instructions.
kinobi.update(
  k.createSubInstructionsFromEnumArgsVisitor({
    create: 'createArgs',
    mint: 'mintArgs',
  })
);

kinobi.update(
  k.updateInstructionsVisitor({
    createV1: {
      accounts: {
        mint: { isSigner: 'either' },
        updateAuthority: { isSigner: 'either' },
        masterEdition: {
          defaultValue: k.pdaValueNode('masterEdition'),
        },
      },
    },
  })
);

// Render JavaScript.
const jsClient = path.join(__dirname, '..', 'clients', 'js');
kinobi.accept(
  renderJavaScriptVisitor(path.join(packageDir, 'src', 'generated'), {
    prettier: require(path.join(packageDir, '.prettierrc.json')),
  })
);
