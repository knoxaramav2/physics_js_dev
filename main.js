//import electron, { BrowserWindow, app } from 'electron'; NOTE: Can't import like this, shaddap vscode
const {app, BrowserWindow, Menu, globalShortcut} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow({width:750, height:680});
 
    win.loadFile("index.html");

    //register quit shortcuts
    globalShortcut.register('Ctrl+F+X', ()=> {app.quit();})
    globalShortcut.register('Alt+F4', ()=> {app.quit();})
    globalShortcut.register('F11', ()=> {win.webContents.openDevTools();})

    //menubar
    //https://electronjs.org/docs/api/menu-item#roles
    const menuTemplate = [
        {
            label : 'File',
            submenu : [{
                label : 'About',
                click: ()=> {console.log('About clicked');}
            },
            {type : 'separator'},
            ,{
                label : 'Minimize',
                role : 'Minimize'
            },
            {
                label : 'Maximize',
                role : 'Maximize'
            },
            {
                label : 'Zoom In',
                role : 'zoomIn'
            },
            {
                label : 'Zoom Out',
                role : 'zoomOut'
            },
            {
                label : 'Something',
                role : 'services'
            },
            {type : 'separator'},
            {
                label : 'Exit',
                click : ()=> {app.quit();}
            }]
        },{
            
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    win.on('closed', ()=>{
        win = null;
    });

    //win.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    //because OSX is stupid
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=>{
    if (win === null){
        createWindow();
    }
});