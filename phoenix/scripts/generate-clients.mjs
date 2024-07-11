#!/usr/bin/env zx
import "zx/globals";
import * as k from "kinobi";
import { rootNodeFromAnchor } from "@kinobi-so/nodes-from-anchor";
import { renderVisitor as renderJavaScriptVisitor } from "@kinobi-so/renderers-js";

// Paths.
const packageDir = path.join(__dirname, "..");
const idlDir = path.join(__dirname, "..");

// Render Phoenix types.
const idl = rootNodeFromAnchor(require(path.join(idlDir, "phoenix_v1.json")));
const kinobi = k.createFromRoot(idl, []);

// Render JavaScript.
kinobi.accept(
  renderJavaScriptVisitor(path.join(packageDir, "src", "generated"), {
    prettier: require(path.join(packageDir, ".prettierrc.json")),
  }),
);
