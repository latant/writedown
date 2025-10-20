// import Neutralino from "@neutralinojs/lib"
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

// function setTray() {
//     // Tray menu is only available in window mode
//     if(NL_MODE != "window") {
//         console.log("INFO: Tray menu is only available in the window mode.");
//         return;
//     }

//     // Define tray menu items
//     let tray = {
//         icon: "/resources/icons/trayIcon.png",
//         menuItems: [
//             {id: "VERSION", text: "Get version"},
//             {id: "SEP", text: "-"},
//             {id: "QUIT", text: "Quit"}
//         ]
//     };

//     // Set the tray menu
//     Neutralino.os.setTray(tray);
// }

// /*
//     Function to handle click events on the tray menu items.
//     This function performs different actions based on the clicked item's ID,
//     such as displaying version information or exiting the application.
// */
// function onTrayMenuItemClicked(event) {
//     switch(event.detail.id) {
//         case "VERSION":
//             // Display version information
//             Neutralino.os.showMessageBox("Version information",
//                 `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
//             break;
//         case "QUIT":
//             // Exit the application
//             Neutralino.app.exit();
//             break;
//     }
// }

// Initialize Neutralino

Neutralino.init();

// // Register event listeners
// Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", () => Neutralino.app.exit());

// Conditional initialization: Set up system tray if not running on macOS
// if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
//   setTray();
// }

const crepe = new Crepe({
  root: "#app",
  defaultValue: `# Hello, Milkdown!`,
});

crepe.create();
