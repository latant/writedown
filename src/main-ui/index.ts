import Electrobun from "electrobun/view";
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

console.log("🌐 Initializing Multitab Browser UI...");

// Initialize Electrobun with RPC
const electrobun = new Electrobun.Electroview({ rpc: null });

console.log("hello")

const crepe = new Crepe({
  root: document.getElementById("app"),
  defaultValue: "# Hello, Crepe!\n\nStart writing your markdown...",
});

console.log("crepe", crepe)

// Initialize the editor
await crepe.create();