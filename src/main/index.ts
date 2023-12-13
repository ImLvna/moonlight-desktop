import { app, session } from "electron";
import showFirstRun from "./firstrun";
import * as Config from "./config";
import { existsSync, mkdir, mkdirSync } from "fs";
import patch from "./patch";
import createMainWindow from "./mainWindow";

if (!existsSync(Config.ConfigDir)) mkdirSync(Config.ConfigDir);

app.on("ready", async () => {
  session.defaultSession.setProxy({
    mode: "fixed_servers",
    proxyRules: "socks5://127.0.0.1:9090",
  });

  if (Config.isFirstRun()) await showFirstRun();

  const config = Config.readConfig()!;

  patch(config.moonlightDir);

  createMainWindow(config.discordChannel);
});
