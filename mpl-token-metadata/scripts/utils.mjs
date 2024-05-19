import "zx/globals";
import { parse as parseToml } from "@iarna/toml";

process.env.FORCE_COLOR = 3;
process.env.CARGO_TERM_COLOR = "always";

export const workingDirectory = (await $`pwd`.quiet()).toString().trim();

export function getAllProgramIdls() {
  return getAllProgramFolders().map((folder) =>
    path.join(workingDirectory, folder, "idl.json")
  );
}

export function getExternalProgramOutputDir() {
  return path.join(workingDirectory, "target/deploy");
}

export function getExternalProgramAddresses() {
  const addresses = getProgramFolders().flatMap(
    (folder) =>
      getCargo(folder).package?.metadata?.solana?.["program-dependencies"] ?? []
  );
  return Array.from(new Set(addresses));
}

let didWarnAboutMissingPrograms = false;
export function getProgramFolders() {
  // fixed here since we are only simulating having a program
  return ['program'];
}

export function getAllProgramFolders() {
  return getCargo().workspace.members.filter((member) =>
    (getCargo(member).lib?.["crate-type"] ?? []).includes("cdylib")
  );
}

export function getCargo(folder) {
  return parseToml(
    fs.readFileSync(
      path.join(workingDirectory, folder ? folder : ".", "Cargo.toml"),
      "utf8"
    )
  );
}
