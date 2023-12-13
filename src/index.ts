import { BrowserWindow, app, session } from "electron";
const UserAgents = {
  darwin:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  linux:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  windows:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
};

const UserAgent = UserAgents[process.platform] || UserAgents.windows;

app.on("ready", () => {
  session.defaultSession.setProxy({
    mode: "fixed_servers",
    proxyRules: "socks5://127.0.0.1:9090",
  });
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: require.resolve("./preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  mainWindow.webContents.setUserAgent(UserAgent);
  mainWindow.loadURL(`https://discord.com/channels/@me`);

  return;
});
