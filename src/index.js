const { app, BrowserWindow } = require('electron');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Logo
const nativeImage = require('electron').nativeImage;
    var image = nativeImage.createFromPath(__dirname + '/images/logo.png'); 
 // where public folder on the root dir

    image.setTemplateImage(true);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: image,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.webContents.on('did-finish-load', function() {
    
    // custom titlebar script
    mainWindow.webContents.executeJavaScript(`
    const titlebar = require("custom-electron-titlebar");
  
    new titlebar.Titlebar({
        backgroundColor: titlebar.Color.fromHex('#2b2e3b'),
        shadow: true,
        icon: false,
        menu: null
    });
    `)
  
    //Inject our css to fix text and sizing
    fs.readFile(__dirname+ '/index.css', "utf-8", function(error, data) {
      if(!error){
        var formatedData = data.replace(/\s{2,10}/g, ' ').trim()
        mainWindow.webContents.insertCSS(formatedData)
      }
    })
  })

  // and load the index.html of the app.
  //mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.loadURL(`https://explorer.decentraland.org`);
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


  // Discord RPC
  const client = require('discord-rich-presence')('618606658331082783');

  timethen = Date.now()

  setInterval(function(){
    let currentURL = mainWindow.webContents.getURL();
    currentURL = currentURL.replace('https://explorer.decentraland.org/?position=','');
    currentCoords = currentURL.replace('%2C',',')

    if (currentCoords.includes('https://explorer.decentraland.org') == true) {
      client.updatePresence({
        state: 'Currently Loading into Decentraland...',
        details: 'In Decentraland',
        startTimestamp: timethen,
        largeImageKey: 'logo',
        instance: true,
      });
    } else {
      client.updatePresence({
        state: 'Currently @ ' + currentCoords,
        details: 'In Decentraland',
        startTimestamp: timethen,
        largeImageKey: 'logo',
        instance: true,
      });
    }
  }, 600);

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.setAsDefaultProtocolClient("decentraclient");

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
