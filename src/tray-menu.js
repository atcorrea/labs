const { Tray } = remote;
const path = require("path");

let trayIcon = new Tray(path.join('', './ico.png'));

const trayIconTemplate = [
  {
    label: "Empty Application",
    enabled: false
  },
  {
    label: "Settings",
    click: function() {
      console.log("Clicked on settings");
    }
  },
  {
    label: "Help",
    click: function() {
      console.log("Clicked on Help");
    }
  }
];

let trayMenu = Menu.buildFromTemplate(trayIconTemplate);
trayIcon.setContextMenu(trayMenu);