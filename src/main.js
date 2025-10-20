import "./main.css";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Crepe } from "@milkdown/crepe";
import { getCurrent } from "@tauri-apps/plugin-deep-link";

// Choose your preferred theme

// Create editor instance

// Initialize the editor

async function main() {
  const startUrls = await getCurrent();
  const crepe = new Crepe({
    root: document.getElementById("app"),
    defaultValue: `\`${JSON.stringify(startUrls, null, 2)}\``,
  });
  await crepe.create();
}

main()

