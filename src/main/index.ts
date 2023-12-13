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

  /// We require it here instead of importing it at the top of the file because
  /// we need it to import electron after it has been patched.
  const createMainWindow = require("./mainWindow").default;

  createMainWindow(config.discordChannel);
});
