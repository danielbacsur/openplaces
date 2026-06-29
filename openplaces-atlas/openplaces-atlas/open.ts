import { spawn } from "node:child_process";

export function open(url: string) {
  const platform =
    process.platform === "darwin"
      ? { command: "open", args: [url] }
      : process.platform === "win32"
        ? { command: "cmd", args: ["/c", "start", "", url] }
        : { command: "xdg-open", args: [url] };

  spawn(platform.command, platform.args, { stdio: "ignore", detached: true })
    .on("error", () => {})
    .unref();
}
