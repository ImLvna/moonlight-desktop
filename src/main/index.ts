import { app, session } from "electron";
import showFirstRun from "./firstrun";
import * as Config from "./config";
import { existsSync, mkdir, mkdirSync } from "fs";
import patch from "./patch";

if (!existsSync(Config.ConfigDir)) mkdirSync(Config.ConfigDir);

app.on("ready", async () => {
  if (Config.isFirstRun()) await showFirstRun();

  const config = Config.readConfig()!;

  patch(config.moonlightDir);

  const createMainWindow = require("./mainWindow").default;

  createMainWindow(config.discordChannel);
});
