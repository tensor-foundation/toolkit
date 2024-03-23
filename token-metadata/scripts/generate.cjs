const fs = require("fs");
const path = require("path");
const k = require("@metaplex-foundation/kinobi");

// Paths.
const packageDir = path.join(__dirname, "package");
const idlDir = path.join(__dirname);

// Render Token Metadata types.
const kinobi = k.createFromJson(
  fs.readFileSync(path.join(idlDir, "token-metadata.json"))
);
/*
kinobi.update(
  k.updateInstructionsVisitor({
    "/^delegate*$/": { delete: true },
    "/^revoke*$/": { delete: true },
    "/^update*$/": { delete: true },
  })
);
*/
kinobi.update(
  k.deleteNodesVisitor([
    (node, _stack) => {
      return node.kind === "instructionNode" && /delegate*/.test(node.name);
    },
    (node, _stack) => {
      return node.kind === "instructionNode" && /revoke*/.test(node.name);
    },
    (node, _stack) => {
      return node.kind === "instructionNode" && /update*/.test(node.name);
    },
  ])
);

const prettier = require(path.join(packageDir, ".prettierrc.json"));
kinobi.accept(
  k.renderJavaScriptExperimentalVisitor(path.join(packageDir, "src", "generated"), {
    prettier,
  })
);
