import { describe, expect, it } from "vitest";
import {
  scene01Dialogue,
  scene01OpeningLines,
  scene01BreachLines,
  scene02Dialogue,
  scene03Dialogue,
  scene04Dialogue,
  deathEndingDialogue,
  escapeEndingDialogue,
} from "../src/data/dialogue";

describe("VEILTRACE Dialogue Script Verification", () => {
  it("matches Scene 01 exact lines and order", () => {
    const expectedScene01 = [
      { speaker: "M", text: "Ugh.. my whole body's aching" },
      { speaker: "M", text: "where am I?" },
      { speaker: "unknown", text: "Finally awake, huh?." },
      { speaker: "unknown", text: "This is what you get for crossing me." },
      { speaker: "unknown", text: "I'm not quite that cruel, you know?" },
      {
        speaker: "unknown",
        text: "But you gotta do something for it, and perhaps you'll earn a chance to escape.",
      },
      {
        speaker: "unknown",
        text: "just make certain no one can trace you, oh and you might hurry, you're running out of time.",
      },
      { speaker: "M", text: "who.. who was she?" },
      { speaker: "M", text: "Dammit!" },
      {
        speaker: "M",
        text: "locked in a room with a computer and some cryptic threat.. Brilliant",
      },
      { speaker: "M", text: "what the hell was that?" },
      { speaker: "Warning", text: "Emergency protocol initiated!" },
      {
        speaker: "Warning",
        text: "You have exactly 10 minutes to complete the required objective!",
      },
      {
        speaker: "Warning",
        text: "Failure to complete the objective within the allotted time, will result in total system destruction!",
      },
      { speaker: "M", text: "what is that even mean?" },
      { speaker: "M", text: "someone can find me though this thing?" },
      { speaker: "M", text: "what am i suppose to do now?" },
    ];

    expect(scene01Dialogue).toEqual(expectedScene01);
    expect(scene01OpeningLines.length).toBe(11);
    expect(scene01BreachLines.length).toBe(6);
    expect([...scene01OpeningLines, ...scene01BreachLines]).toEqual(scene01Dialogue);
  });

  it("matches Scene 02 exact lines and order", () => {
    const expectedScene02 = [
      { speaker: "M", text: "No, No, think!", start: 2, end: 4.5 },
      { speaker: "M", text: "10 minutes to do what exactly?", start: 5, end: 7 },
    ];
    expect(scene02Dialogue).toEqual(expectedScene02);
  });

  it("matches Scene 03 exact lines and order", () => {
    const expectedScene03 = [
      {
        speaker: "M",
        text: "No. No, I Cant afford to keep opening things at random.",
        start: 2,
        end: 6.5,
      },
      {
        speaker: "M",
        text: "Think!, What would let someone trace this system back to me?",
        start: 6.7,
        end: 11,
      },
    ];
    expect(scene03Dialogue).toEqual(expectedScene03);
  });

  it("matches Scene 04 exact line", () => {
    const expectedScene04 = [
      {
        speaker: "M",
        text: "Come on! Just one more… please, let this be enough.",
        start: 2,
        end: 7,
      },
    ];
    expect(scene04Dialogue).toEqual(expectedScene04);
  });

  it("matches Death Ending exact lines and countdown synchronization order", () => {
    const expectedDeath = [
      { speaker: "Warning", text: "Count Down Begins Now!", start: 1, end: 2.5 },
      { speaker: "Warning", text: "10!", start: 3, end: 3.9 },
      { speaker: "M", text: "NO!", start: 3.5, end: 4 },
      { speaker: "Warning", text: "09!", start: 4, end: 4.9 },
      { speaker: "Warning", text: "08!", start: 5, end: 5.9 },
      { speaker: "Warning", text: "07!", start: 6, end: 6.9 },
      { speaker: "Warning", text: "06!", start: 7, end: 7.9 },
      { speaker: "Warning", text: "05!", start: 8, end: 8.9 },
      { speaker: "Warning", text: "04!", start: 9, end: 9.9 },
      { speaker: "Warning", text: "03!", start: 10, end: 10.9 },
      { speaker: "M", text: "Open The Door!", start: 10, end: 10.9 },
      { speaker: "Warning", text: "02!", start: 11, end: 11.9 },
      { speaker: "Warning", text: "01!", start: 12, end: 12.9 },
      { speaker: "Warning", text: "00!", start: 13, end: 13.9 },
      { speaker: "M", text: "I did everything I could!", start: 11, end: 13 },
      { speaker: "M", text: "I didnt Know!, Please..", start: 13.5, end: 15.5 },
      { speaker: "M", text: "Nooo!!!", start: 16, end: 17.5 },
    ];
    expect(deathEndingDialogue).toEqual(expectedDeath);
  });

  it("matches Escape Ending exact line", () => {
    const expectedEscape = [
      { speaker: "M", text: "It's over…? I actually did it?", start: 1, end: 7 },
    ];
    expect(escapeEndingDialogue).toEqual(expectedEscape);
  });
});
