import { BrowserWindow } from "electron";
import { UserAgent, Channel, StaticDir } from "../constants";
import { join } from "path";

export default (channel: Channel) => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
    icon: join(StaticDir, "icon.png"),
  });
  mainWindow.menuBarVisible = false;
  mainWindow.maximize();
  mainWindow.webContents.setUserAgent(UserAgent);
  let subdomain = "";
  switch (channel) {
    case Channel.PTB:
      subdomain = "ptb.";
      break;
    case Channel.Canary:
      subdomain = "canary.";
      break;
  }
  mainWindow.loadURL(`https://${subdomain}discord.com/channels/@me`);
};
