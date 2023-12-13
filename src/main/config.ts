import { app } from "electron";
import { join } from "path";
import { Channel } from "../constants";
import { existsSync, readFileSync, writeFileSync } from "fs";

export interface Config {
  discordChannel: Channel;
  moonlightDir: string;
}

export const ConfigDir = join(app.getPath("appData"), "moonlight-desktop");
export const ConfigFile = join(ConfigDir, "config.json");

export const isFirstRun = () => !existsSync(ConfigFile);

export let config: Config | undefined;
export const readConfig = () => {
  if (isFirstRun()) {
    config = undefined;
    return;
  } else {
    config = JSON.parse(readFileSync(ConfigFile, "utf8"));
    return config;
  }
};
export const writeConfig = (newConfig: Config) => {
  config = newConfig;
  writeFileSync(ConfigFile, JSON.stringify(config, null, 2));
};

export const getDefaultMoonlightDir = () => {
  return join(app.getPath("appData"), "moonlight-desktop");
};
