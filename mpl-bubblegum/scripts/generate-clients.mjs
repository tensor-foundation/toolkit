#!/usr/bin/env zx
import 'zx/globals';
import * as c from 'codama';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor as renderJavaScriptVisitor } from '@codama/renderers-js';

// Paths.
const packageDir = path.join(__dirname, '..');
const idlDir = path.join(__dirname, '..');

// Render MPL Bubblegum types.
const idlBubblegum = rootNodeFromAnchor(require(path.join(idlDir, 'mpl-bubblegum.json')));
const codamaBubblegum = c.createFromRoot(idlBubblegum, []);

// Render SPL Account Compression types.
const idlAccountCompression = rootNodeFromAnchor(require(path.join(idlDir, 'spl-account-compression.json')));
const codamaAccountCompression = c.createFromRoot(idlAccountCompression, []);

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
