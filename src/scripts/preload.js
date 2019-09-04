const titlebar = require("custom-electron-titlebar");

new titlebar.Titlebar({
    backgroundColor: titlebar.Color.fromHex('#2b2e3b'),
    shadow: true,
    icon: false,
    menu: null
});
