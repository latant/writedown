import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { getCurrent } from "@tauri-apps/plugin-deep-link";
import { readTextFile } from "@tauri-apps/plugin-fs";
import "./main.css";

// Choose your preferred theme

// Create editor instance

// Initialize the editor

async function main() {
  let fileUrl = ""
  let fileContent = ""
  const startUrls = await getCurrent();
  if (startUrls && startUrls[0]) {
    fileUrl = startUrls[0]
    fileContent = await readTextFile(fileUrl);
  }
  const crepe = new Crepe({
    root: document.getElementById("app"),
    defaultValue: fileContent,
  });
  await crepe.create();
}

main()

