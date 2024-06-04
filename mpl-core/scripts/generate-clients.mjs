#!/usr/bin/env zx
import 'zx/globals';
import * as k from 'kinobi';
import { rootNodeFromAnchor } from '@kinobi-so/nodes-from-anchor';
import { renderVisitor as renderJavaScriptVisitor } from '@kinobi-so/renderers-js';

// Paths.
const packageDir = path.join(__dirname, '..');
const idlDir = path.join(__dirname, '..');

// Render Token Metadata types.
const idl = rootNodeFromAnchor(require(path.join(idlDir, 'mpl-core.json')));
const kinobi = k.createFromRoot(idl, []);

// Render JavaScript.
const jsClient = path.join(__dirname, '..', 'clients', 'js');
kinobi.accept(
  renderJavaScriptVisitor(path.join(packageDir, 'src', 'generated'), {
    prettier: require(path.join(packageDir, '.prettierrc.json')),
  })
);
