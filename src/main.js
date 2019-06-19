const { app, BrowserWindow, Menu, MenuItem } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, heigth: 600 });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
}

ipcMain.on("showMessage", (event, path) => {
  const { dialog } = require("electron");
  const options = {
    type: "warning",
    buttons: ["Hey", "Hi", "Hello"],
    title: "Message",
    message: "A stranger approaches you and says:",
    detail: "howdy mister!"
  };
  dialog.showMessageBox(null, options, response => {
    console.log(response);
    event.sender.send("message-response", options.buttons[response]);
  });
});

ipcMain.on("openFile", (event, path) => {
  const { dialog } = require("electron");
  const fs = require("fs");
  dialog.showOpenDialog(function(filenames) {
    if (filenames === undefined) {
      console.log("No File selected");
    } else {
      readFile(filenames[0]);
    }
  });

  function readFile(filePath) {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        alert("An Error ocurred reading the file " + err.message);
      }

      event.sender.send("fileData", data);
    });
  }
});

const template = [
  {
    label: "Edit",
    submenu: [
      {
        role: "undo"
      },
      {
        role: "redo"
      },
      {
        type: "separator"
      },
      {
        role: "cut"
      },
      {
        role: "copy"
      },
      {
        role: "paste"
      }
    ]
  },

  {
    label: "View",
    submenu: [
      {
        role: "reload"
      },
      {
        role: "toggledevtools"
      },
      {
        type: "separator"
      },
      {
        role: "resetzoom"
      },
      {
        role: "zoomin"
      },
      {
        role: "zoomout"
      },
      {
        type: "separator"
      },
      {
        role: "togglefullscreen"
      }
    ]
  },

  {
    role: 'window',
    submenu: [
      {
        role: "minimize"
      },
      {
        role: "close"
      }
    ]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More"
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
app.on("ready", createWindow);
