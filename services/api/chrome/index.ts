import puppeteer, { PuppeteerLifeCycleEvent } from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import assert from "assert";
import { DEFAULT_VIEWPORT } from "../k";

async function getBrowser() {
  return puppeteer.launch({
    args: chromium.args,
    defaultViewport: DEFAULT_VIEWPORT, // chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

export interface ChromeImageExport {
  mode: "src" | "url";
  url?: string;
  src?: string | { [key: string]: string };
  waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
  fullPage?: boolean;
  viewport?: {
    width: number;
    height: number;
  };
}

export async function image({
  mode,
  url,
  src,
  fullPage = true,
  viewport,
  waitUntil = "networkidle0",
}: ChromeImageExport) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  const warnings = [];

  // set viewport
  if (viewport) {
    await page.setViewport(viewport);
  }

  switch (mode) {
    case "src":
      assert(src, "src is required");
      if (typeof src === "object") {
        const loads = [];
        for (const [key, value] of Object.entries(src)) {
          if (key.endsWith(".css")) {
            loads.push(
              page.addStyleTag({
                content: value,
              }),
            );
          } else if (key.endsWith(".js")) {
            loads.push(
              page.addScriptTag({
                content: value,
              }),
            );
          } else if (key.endsWith(".html")) {
            loads.push(
              page.setContent(value, {
                waitUntil,
              }),
            );
          } else {
            warnings.push(
              `Unknown key ${key} with value ${value} in src object`,
            );
          }
        }
        await Promise.all(loads);
      }
      if (typeof src === "string") {
        await page.setContent(src as string, {
          waitUntil,
        });
      }
      break;
    case "url":
      assert(url, "url is required");
      await page.goto(url, {
        waitUntil,
      });
      break;
  }

  const promises = [
    //
    browser.version(),
    browser.userAgent(),
    page.title(),
    page.screenshot({ fullPage, encoding: "base64" }),
  ];
  const [
    //
    version,
    userAgent,
    title,
    img,
  ] = await Promise.all(promises);

  await page.close();

  return {
    warnings,
    version,
    userAgent,
    title,
    img,
  };
}
