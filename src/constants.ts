import { existsSync } from "fs";

const UserAgents = {
  darwin:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  linux:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  windows:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
};

export const UserAgent = UserAgents[process.platform] || UserAgents.windows;

export enum Channel {
  Canary = "canary",
  PTB = "ptb",
  Stable = "stable",
}

let _StaticDir = "./static";
if (existsSync("./static")) _StaticDir = "./static";
else if (existsSync("../static")) _StaticDir = "../static";

export const StaticDir = _StaticDir;
