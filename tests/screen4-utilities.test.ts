import { describe, expect, it } from "vitest";
import { WATCH_PRODUCTS } from "../src/desktop/apps/EcomApp";
import { NATURE_PHOTOS } from "../src/desktop/apps/GalleryApp";
import { MUSIC_TRACKS } from "../src/desktop/apps/MusicApp";
import { computeTaskStats } from "../src/desktop/apps/TaskManagerApp";

describe("Screen 4 Utility Apps Contracts", () => {
  describe("TaskManagerApp logic", () => {
    it("computes completed and remaining traces accurately without hardcoding", () => {
      const statsZero = computeTaskStats([], 4);
      expect(statsZero.completed).toBe(0);
      expect(statsZero.remaining).toBe(4);

      const statsOne = computeTaskStats(["atlas-places"], 4);
      expect(statsOne.completed).toBe(1);
      expect(statsOne.remaining).toBe(3);

      const statsAll = computeTaskStats(["atlas-places", "route-trace", "location-exposure", "token-cabinet"], 4);
      expect(statsAll.completed).toBe(4);
      expect(statsAll.remaining).toBe(0);
    });
  });

  describe("EcomApp watch catalog", () => {
    it("provides fictional watch products with required specifications", () => {
      expect(WATCH_PRODUCTS.length).toBeGreaterThanOrEqual(3);
      for (const watch of WATCH_PRODUCTS) {
        expect(watch.name).toBeTruthy();
        expect(watch.price).toBeTruthy();
        expect(watch.specs.movement).toBeTruthy();
        expect(watch.specs.materials).toBeTruthy();
        expect(watch.specs.waterResistance).toBeTruthy();
        expect(watch.specs.strap).toBeTruthy();
      }
    });
  });

  describe("GalleryApp nature collection", () => {
    it("provides nature landscape photos with metadata", () => {
      expect(NATURE_PHOTOS.length).toBeGreaterThanOrEqual(4);
      for (const photo of NATURE_PHOTOS) {
        expect(photo.title).toBeTruthy();
        expect(photo.category).toBeTruthy();
        expect(photo.svgContent).toBeTruthy();
      }
    });
  });

  describe("MusicApp track catalog", () => {
    it("defines local audio paths and tracks", () => {
      expect(MUSIC_TRACKS).toHaveLength(7);
      for (const track of MUSIC_TRACKS) {
        expect(track.id).toBeTruthy();
        expect(track.title).toBeTruthy();
        expect(track.duration).toBeTruthy();
        expect(track.src.startsWith("/media/audio/")).toBe(true);
      }
    });
  });
});
