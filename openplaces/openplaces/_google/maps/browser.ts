import { type Browser, chromium, type Page } from "playwright";

let browser: Browser | null = null;
let page: Page | null = null;

async function open() {
  if (page) return page;

  browser = await chromium.launch({ headless: true });

  const scratch = await browser.newPage();

  const userAgent = await scratch
    .evaluate(() => navigator.userAgent)
    .then((value) => value.replace("Headless", ""));

  await scratch.close();

  const session = await browser.newPage({ userAgent, locale: "en-US" });

  // prettier-ignore
  await session.goto("https://www.google.com/maps/search/restaurants", {
    waitUntil: "domcontentloaded",
  }).catch(() => {});

  if (/consent\.google\.com/.test(session.url())) {
    await session
      .locator("form button")
      .first()
      .click()
      .catch(() => {});

    // prettier-ignore
    await session.goto("https://www.google.com/maps/search/restaurants", {
      waitUntil: "domcontentloaded",
    }).catch(() => {});
  }

  page = session;
  return session;
}

export async function get(url: string | URL | Request, init?: RequestInit) {
  const page = await open();

  // prettier-ignore
  return page.evaluate(({ href, init }) => {
    return fetch(href, {
      credentials: "include", ...init
    }).then((r) => r.text());
  }, { href: new Request(url).url, init });
}

export async function close() {
  await browser?.close();
  browser = null;
  page = null;
}
