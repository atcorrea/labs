const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({ heigth: 600, width: 800 });
  win.loadUrl(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
}

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log(arg);
  event.sender.send("asynchronous reply", "async pong");
});

ipcMain.on("synchronous-message", (event, arg) => {
  console.log(arg);
  event.returnValue = "sync pong";
});

app.on('ready', createWindow());