import { describe, expect, it } from "vitest";
import { SCREEN_2_ITEMS } from "../src/desktop/DesktopEnvironment";

describe("Screen 2 Desktop Icons", () => {
  it("contains exactly the four requested Screen 2 icons", () => {
    expect(SCREEN_2_ITEMS).toHaveLength(4);

    const names = SCREEN_2_ITEMS.map((item) => item.name);
    expect(names).toEqual(["Device Registry", "Chrome", "IMPS", "VS Code"]);

    const assets = SCREEN_2_ITEMS.map((item) => item.iconSrc);
    expect(assets).toEqual([
      "/media/images/device-icon.png",
      "/media/images/chrome-icon.png",
      "/media/images/imps-icon.png",
      "/media/images/vscode-icon.png",
    ]);
  });
});
