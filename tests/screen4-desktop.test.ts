import { describe, expect, it } from "vitest";
import { SCREEN_4_ITEMS } from "../src/desktop/DesktopEnvironment";

describe("Screen 4 Desktop Items", () => {
  it("contains exactly 12 items with exact visible names", () => {
    expect(SCREEN_4_ITEMS).toHaveLength(12);

    const expectedNames = [
      "dashboard_prj",
      "login_prj",
      "ecom_prj",
      "personal hu_prj",
      "pass-generator_prj",
      "key-vault_prj",
      "Sentinel-Alerts_prj",
      "learnings",
      "gallery_prj",
      "music_prj",
      "task-manager_prj",
      "mine folder",
    ];

    const actualNames = SCREEN_4_ITEMS.map((item) => item.name);
    expect(actualNames).toEqual(expectedNames);
  });

  it("every Screen 4 item has a valid iconSrc or SVG asset and non-empty alt", () => {
    SCREEN_4_ITEMS.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.iconSrc).toBeTruthy();
      expect(item.alt).toBeTruthy();
    });
  });
});
