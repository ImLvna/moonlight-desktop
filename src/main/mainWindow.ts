import { BrowserWindow } from "electron";
import { UserAgent, Channel } from "../constants";

export default (channel: Channel) => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
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
