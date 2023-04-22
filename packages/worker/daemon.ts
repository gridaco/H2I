import puppeteer, { LaunchOptions, Browser } from "puppeteer";

type RenderOptions = {
  url?: string;
  html?: string;
  outputPath: string;
  puppeteerOptions?: LaunchOptions;
};

export async function renderToPng(options: RenderOptions): Promise<void> {
  const { url, html, outputPath, puppeteerOptions } = options;

  if (!url && !html) {
    throw new Error("Either a URL or HTML content must be provided.");
  }

  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();

    if (url) {
      await page.goto(url, { waitUntil: "networkidle2" });
    } else if (html) {
      await page.setContent(html, { waitUntil: "networkidle2" });
    }

    const screenshot = await page.screenshot({ type: "png" });
    require("fs").writeFileSync(outputPath, screenshot);
    console.log(`PNG saved to ${outputPath}`);
  } catch (error) {
    console.error("Error in Puppeteer:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
