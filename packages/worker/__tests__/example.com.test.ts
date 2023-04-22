import * as path from "path";
import { renderToPng } from "../daemon";

describe("renderToPng", () => {
  it("renders example.com to a PNG", async () => {
    await renderToPng({
      url: "https://grida.co",
      outputPath: path.join(__dirname, "output.png"),
    });
  });
});
