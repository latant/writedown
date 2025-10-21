import "./index.css";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Crepe } from "@milkdown/crepe";
import { webviewWindow } from "@tauri-apps/api";
import * as deeplink from "@tauri-apps/plugin-deep-link";
import * as fs from "@tauri-apps/plugin-fs";
import * as log from "@tauri-apps/plugin-log";
import * as process from '@tauri-apps/plugin-process';
import * as uuid from "uuid";

function encodeLabel(input) {
  return btoa(input).replaceAll("+", "_").replaceAll("=", "")
}

function decodeLabel(input) {
  return atob(input.replaceAll("_", "+"))
}

async function openEditor(fileUrl) {
  const label = encodeLabel(fileUrl)
  log.info(`Opening editor for file: ${fileUrl} ${label}`)
  const allWebviewWindows = await webviewWindow.getAllWebviewWindows()
  let window = allWebviewWindows.find(w => w.label === label)
  if (!window) {
    const lastWindow = allWebviewWindows.find(w => w.label !== "main")
    if (lastWindow) {
      const outerPos = await lastWindow.outerPosition()
      const scaleFactor = await lastWindow.scaleFactor()
      const lastPos = outerPos.toLogical(scaleFactor)
      window = new webviewWindow.WebviewWindow(label, {
        title: new URL(fileUrl).pathname,
        url: location.href,
        x: lastPos.x + 20,
        y: lastPos.y + 20,
      })
    } else {
      window = new webviewWindow.WebviewWindow(label, {
        title: new URL(fileUrl).pathname,
        url: location.href,
      })
    }
    log.info("new")
    await new Promise(async (resolve) => {
      const unlisten = await window.listen("ready", () => {
        unlisten()
        resolve()
      })
    })
  }
  log.info(`Opened editor for file: ${fileUrl}`)
  await window.setFocus()
}

async function runController() {
  const startUrls = await deeplink.getCurrent()
  for (const url of startUrls ?? []) {
    await openEditor(url)
  }
  await deeplink.onOpenUrl(async (urls) => {
    for (const url of startUrls) {
      await openEditor(url)
    }
  })
}

async function runEditor() {
  log.info("Editor starting")
  const currentWindow = webviewWindow.getCurrentWebviewWindow()
  await currentWindow.emit("ready")
  const fileUrl = decodeLabel(webviewWindow.getCurrentWebviewWindow().label)
  log.info(`Reading file: ${fileUrl}`)
  const fileContent = await fs.readTextFile(fileUrl);
  const crepe = new Crepe({
    root: document.getElementById("app"),
    defaultValue: fileContent,
  });
  await crepe.create();
}

(async () => {
  addEventListener('unhandledrejection', function(event) {
    log.error(`${event.reason}`)
  });
  if (webviewWindow.getCurrentWebviewWindow().label === "main") {
    await runController()
    await openEditor("file:///Users/latinovits/Development/latanti/latant.github.io/README.md")
    await openEditor("file:///Users/latinovits/Development/latanti/writedown/README.md")
    await openEditor("file:///Users/latinovits/Development/latanti/latant.github.io/README.md")
  } else {
    await runEditor()
  }
})().catch(e => {
  log.error(`${e}`)
})
