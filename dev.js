import concurrently from "concurrently";

concurrently([
  {
    name: "neu",
    command: "npx neu run",
  },
  {
    name: "esbuild",
    command: [
      "npx esbuild --watch main.js --bundle",
      "--outfile=resources/assets/main.js",
      "--loader:.woff2=file",
      "--loader:.woff=file",
      "--loader:.ttf=file",
      "--loader:.png=file",
      "--loader:.jpg=file",
      "--loader:.svg=file",
      "--loader:.css=css",
    ].join(' '),
  },
])
  .result.then((result) => {
    console.log(result.map((r) => `${r.command.name} (${r.exitCode})`).join(", "));
  })
  .catch((result) => {
    console.log(result.map((r) => `${r.command.name} (${r.exitCode})`).join(", "));
  });