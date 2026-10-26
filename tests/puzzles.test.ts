import { describe, expect, it } from "vitest";
import { puzzleRegistry } from "../src/puzzles/puzzleRegistry";
import { validatePuzzle } from "../src/puzzles/puzzleValidator";

describe("VEILTRACE puzzle registry", () => {
  it("contains exactly 11 critical puzzles", () => {
    expect(puzzleRegistry).toHaveLength(11);
  });

  it("contains no duplicate puzzle IDs", () => {
    const ids = puzzleRegistry.map((puzzle) => puzzle.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("marks a puzzle solved after its required action", () => {
    const result = validatePuzzle("persona-hub", {
      "set-private": true,
    });

    expect(result.solved).toBe(true);
    expect(result.message).toBe("Profile visibility restricted.");
  });

  it("keeps a puzzle unsolved when its action is incomplete", () => {
    const result = validatePuzzle("persona-hub", {
      "set-private": false,
    });

    expect(result.solved).toBe(false);
  });

  it("rejects unknown puzzle IDs", () => {
    const result = validatePuzzle("unknown-puzzle", {});

    expect(result.solved).toBe(false);
    expect(result.message).toBe("Unknown puzzle.");
  });
});