const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();

menu.append(new MenuItem({
    label: 'Developer Tools',
    role: 'toggledevtools'
}));

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow())
}, false);
