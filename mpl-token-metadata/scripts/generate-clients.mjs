#!/usr/bin/env zx
import 'zx/globals';
import * as k from 'kinobi';
import { rootNodeFromAnchor } from "@kinobi-so/nodes-from-anchor";
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
    (node, _stack) => {
      return node.kind === 'definedTypeLinkNode' && /update*/.test(node.name);
    },
  ])
);

// Render JavaScript.
const jsClient = path.join(__dirname, '..', 'clients', 'js');
kinobi.accept(
  renderJavaScriptVisitor(path.join(packageDir, 'src', 'generated'), {
    prettier: require(path.join(packageDir, '.prettierrc.json')),
  })
);
