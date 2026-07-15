import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

function data(): string {
  const macos = () => {
    return path.join(homedir(), "Library", "Application Support", "openplaces");
  };

  if (process.platform === "darwin") return macos();

  const windows = () => {
    const local = process.env.LOCALAPPDATA;
    const fallback = path.join(homedir(), "AppData", "Local");
    return path.join(local || fallback, "openplaces", "Data");
  };

  if (process.platform === "win32") return windows();

  const linux = () => {
    const xdg = process.env.XDG_DATA_HOME;
    const fallback = path.join(homedir(), ".local", "share");
    return path.join(xdg || fallback, "openplaces");
  };

  return linux();
}

export function mkcert(): { key: Buffer; cert: Buffer } {
  const dir = data();

  const key = path.join(dir, "localhost-key.pem");
  const cert = path.join(dir, "localhost.pem");

  if (!existsSync(key) || !existsSync(cert)) {
    mkdirSync(dir, { recursive: true });

    try {
      execFileSync("mkcert", ["localhost"], { cwd: dir, stdio: "pipe" });
    } catch {
      const reset = "\x1b[0m";
      const bold = "\x1b[1m";
      const dim = "\x1b[2m";
      const red = "\x1b[31m";
      const cyan = "\x1b[36m";

      console.error(
        `\n${red}${bold}Error:${reset} ` +
          `Failed to establish a secure connection to localhost\n\n` +
          `${dim}Some browsers block access to localhost by default. ` +
          `You need to install mkcert and generate a self-signed certificate. ` +
          `Follow the installation steps at ${reset}${cyan}https://mkcert.dev${reset}${dim}, ` +
          `run ${reset}${cyan}mkcert -install${reset}${dim}, ` +
          `and restart the atlas for the changes to take effect.${reset}\n`,
      );

      process.exit(1);
    }
  }

  return { key: readFileSync(key), cert: readFileSync(cert) };
}
