#!/usr/bin/env zx
import 'zx/globals';
import * as c from 'codama';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor as renderJavaScriptVisitor } from '@codama/renderers-js';

// Paths.
const packageDir = path.join(__dirname, '..');
const idlDir = path.join(__dirname, '..');

// Render MPL Bubblegum
const idlBubblegum = rootNodeFromAnchor(require(path.join(idlDir, 'mpl-bubblegum.json')));
const codamaBubblegum = c.createFromRoot(idlBubblegum, []);

// Render SPL Account Compression
const idlAccountCompression = rootNodeFromAnchor(require(path.join(idlDir, 'spl-account-compression.json')));
const codamaAccountCompression = c.createFromRoot(idlAccountCompression, []);

// Add proof as rem accs for verify creator ix (bubblegum) ...
codamaBubblegum.update(
  c.bottomUpTransformerVisitor([
    {
    select: (node) => {
      const names = [
        "verifyCreator",
      ];
      return (
        c.isNode(node, "instructionNode") && names.includes(node.name)
      );
    },
    transform: (node) => {
      c.assertIsNode(node, "instructionNode");
      return {
        ...node,
        extraArguments: [
          c.instructionArgumentNode({
            name: "proof",
            type: c.arrayTypeNode(
              c.publicKeyTypeNode(),
              c.prefixedCountNode(c.numberTypeNode("u32")),
            ),
          }),
        ],
        remainingAccounts: [
          c.instructionRemainingAccountsNode(
            c.argumentValueNode("proof"),
          ),
        ],
      };
    },
    },
  ])
);

// ... and for verify leaf ix (account compression)
codamaAccountCompression.update(
  c.bottomUpTransformerVisitor([
    {
    select: (node) => {
      const names = [
        "verifyLeaf",
      ];
      return (
        c.isNode(node, "instructionNode") && names.includes(node.name)
      );
    },
    transform: (node) => {
      c.assertIsNode(node, "instructionNode");
      return {
        ...node,
        extraArguments: [
          c.instructionArgumentNode({
            name: "proof",
            type: c.arrayTypeNode(
              c.publicKeyTypeNode(),
              c.prefixedCountNode(c.numberTypeNode("u32")),
            ),
          }),
        ],
        remainingAccounts: [
          c.instructionRemainingAccountsNode(
            c.argumentValueNode("proof"),
          ),
        ],
      };
    },
    },
  ])
);


// Render JavaScript.
codamaBubblegum.accept(
  renderJavaScriptVisitor(path.join(packageDir, 'src', 'generated'), {
    prettier: require(path.join(packageDir, '.prettierrc.json')),
  })
);

codamaAccountCompression.accept(
  renderJavaScriptVisitor(path.join(packageDir, 'src', 'account_compression', 'generated'), {
    prettier: require(path.join(packageDir, '.prettierrc.json')),
  })
);
