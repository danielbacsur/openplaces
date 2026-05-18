import { homepage, name, version } from "../../../package.json";

export const USER_AGENT = `${name}/${version} (${homepage})`;

export const TIMEOUT = 10_000;
