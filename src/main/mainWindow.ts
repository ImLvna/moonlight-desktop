import { BrowserWindow, app, session } from "electron";
import { UserAgent, Channel } from "../constants";

export default (channel: Channel) => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  mainWindow.maximize();
  mainWindow.webContents.setUserAgent(UserAgent);
  mainWindow.setMenu(null);
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
