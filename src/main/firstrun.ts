import { BrowserWindow } from "electron";
import { join } from "path";
import { Channel, StaticDir } from "../constants";
import { Config, ConfigDir, config, writeConfig } from "./config";

export default async function showFirstRun() {
  const window = new BrowserWindow({
    width: 300,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  window.setMenu(null);
  window.loadFile(join(StaticDir, "firstRun", "index.html"));

  let isSubmitted = false;

  window.webContents.addListener("console-message", (_e, _l, msg) => {
    if (!msg.startsWith("ready:")) return;
    const data = JSON.parse(msg.slice(6)) as Config;
    writeConfig(data);
    window.close();
    isSubmitted = true;
  });

  while (!isSubmitted) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
