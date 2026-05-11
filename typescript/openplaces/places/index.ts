import { chromium } from "playwright";

import { type OpenPlaces } from "..";

export class Places {
  constructor(private readonly client: OpenPlaces) {}

  async search(
    query: string,
    { limit = 1 }: OpenPlaces.Places.Search.Options = {},
  ): Promise<OpenPlaces.Places.Search.Result[]> {
    const { headless } = this.client.options;

    const browser = await chromium.launch({ headless });
    const page = await browser.newPage({ locale: "en-US" });

    try {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}?hl=en`;

      await page.goto(url, { waitUntil: "domcontentloaded" });

      if (page.url().includes("consent.google.com")) {
        await (await page.$("form:last-of-type button"))?.click();
      }

      await page.waitForSelector(
        'button[data-item-id^="address"], [role="feed"]',
      );

      const scrape = async (): Promise<OpenPlaces.Places.Search.Result> => ({
        url: page.url().split("?")[0],
        // prettier-ignore
        name: (await (await page.$("h1"))?.innerText()) || undefined,
        // prettier-ignore
        location: (await (await page.$('button[data-item-id^="address"] > div > div:nth-child(2) > div:first-child'))?.textContent())?.trim() || undefined,
        // prettier-ignore
        website: (await (await page.$('a[data-item-id^="authority"]'))?.getAttribute("href")) || undefined,
        // prettier-ignore
        phone: (await (await page.$('button[data-item-id^="phone"] > div > div:nth-child(2) > div:first-child'))?.textContent())?.trim() || undefined,
      });

      if (await page.$('button[data-item-id^="address"]')) {
        await page.waitForURL(/\/maps\/place\//).catch(() => undefined);
        return [await scrape()];
      }

      // prettier-ignore
      const articles = await page.evaluate((max) => {
        return [...new Set([...document.querySelectorAll<HTMLAnchorElement>(
          '[role="article"]:has(> div:nth-child(3) > div:nth-child(2):empty) a[href*="/maps/place/"]',
        )].map((a) => a.href))].slice(0, max);
      }, limit);

      const results: OpenPlaces.Places.Search.Result[] = [];

      for (const url of articles) {
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.waitForSelector('button[data-item-id^="address"]');
        results.push(await scrape());
      }

      return results;
    } finally {
      await page.close();
      await browser.close();
    }
  }
}

declare module ".." {
  namespace OpenPlaces.Places.Search {
    interface Result {
      url: string;
      name?: string;
      location?: string;
      website?: string;
      phone?: string;
    }

    interface Options {
      limit?: number;
    }
  }
}
