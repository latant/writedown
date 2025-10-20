import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs"

export function runCommand(opts) {
  const { name, cmd, args, ...spawnSyncOptions } = opts;
  console.log(`\n${name}`);
  const start = Date.now();
  const result = spawnSync(cmd, args, {
    ...spawnSyncOptions,
    stdio: "inherit",
  });
  const duration = Date.now() - start;
  console.log(`${name} exited with status ${result.status} in ${duration} ms`);
  if (result.status !== 0) {
    process.exit(1);
  }
}

rmSync("resources/assets", {force: true, recursive: true})

runCommand({
  name: "neu-update",
  cmd: "npx",
  args: ["neu", "update"]
})

runCommand({
  name: "esbuild",
  cmd: "npx",
  args: [
    "esbuild",
    "main.js",
    "--bundle",
    "--outfile=resources/assets/main.js",
    "--loader:.woff2=file",
    "--loader:.woff=file",
    "--loader:.ttf=file",
    "--loader:.png=file",
    "--loader:.jpg=file",
    "--loader:.svg=file",
    "--loader:.css=css",
  ]
})

runCommand({
  name: "neu-build",
  cmd: "npx",
  args: ["neu", "build"]
})

