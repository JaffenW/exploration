const { app, BrowserWindow } = requier('electron');

function createWindow () {
    const win = new BrowserWindow({
        innerWidth: 700,
        innerHeight: 500,
    })
    win.loadingFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})