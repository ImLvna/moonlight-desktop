import { existsSync } from "fs";
import { join } from "path";

export default function patch(moonlightDir: string) {
  if (!existsSync(moonlightDir)) alert("Moonlight directory does not exist!");
  const { inject } = require(join(
    moonlightDir,
    "injector-desktop"
  )) as typeof import("injector-desktop");

  inject();
}
