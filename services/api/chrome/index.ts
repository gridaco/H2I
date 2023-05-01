import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function image(url: string) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const promises = [
    //
    browser.version(),
    browser.userAgent(),
    page.title(),
    page.screenshot({ fullPage: true, encoding: "base64" }),
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
    version,
    userAgent,
    title,
    img,
  };
}
