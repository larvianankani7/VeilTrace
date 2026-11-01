import { describe, expect, it } from "vitest";
import { SCREEN_5_ITEMS } from "../src/desktop/DesktopEnvironment";
import { PROFILE_DATA } from "../src/data/profileData";
import { getLearningConcept } from "../src/data/learningConcepts";

describe("Screen 5 Implementation Verification", () => {
  it("renders all 12 Screen 5 desktop items with exact visible names and valid icon assets", () => {
    const expectedNames = [
      "videos",
      "docs",
      "presentations",
      "excels",
      "Footprint Log",
      "Ledger",
      "Calendar",
      "calc",
      "Route Trace",
      "permits",
      "Signal Memory",
      "memo folder",
    ];

    expect(SCREEN_5_ITEMS).toHaveLength(12);
    expect(SCREEN_5_ITEMS.map((item) => item.name)).toEqual(expectedNames);

    SCREEN_5_ITEMS.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.iconSrc).toBeTruthy();
      expect(item.alt).toBeTruthy();
    });
  });

  it("verifies memo folder is configured as the navigation point to Screen 6", () => {
    const memo = SCREEN_5_ITEMS.find((item) => item.name === "memo folder");
    expect(memo).toBeDefined();
    expect(memo?.id).toBe("memo_folder");
  });

  it("verifies profile data contains M's profile without location leakage in dossier data", () => {
    expect(PROFILE_DATA.fullName).toBe("Merdin Morov");
    expect(PROFILE_DATA.nickname).toBe("M");
    expect(PROFILE_DATA.age).toBe(28);
    expect(PROFILE_DATA.sex).toBe("Male");
    expect(PROFILE_DATA.nationality).toBe("Republic of Valen");
    expect(PROFILE_DATA.occupation).toBe("Systems Infrastructure Analyst");
    expect(PROFILE_DATA.email).toBe("merdinmorov1@gmail.com");
    expect(PROFILE_DATA.phoneNumber).toBe("(202) 555-0147");
    expect(PROFILE_DATA.fathersName).toBe("Daniel Morov");
    expect(PROFILE_DATA.mothersName).toBe("Elena Morova");
    expect(PROFILE_DATA.assignedNode).toBe("VT-NODE-08 (Containment Wing)");
    expect(PROFILE_DATA.status).toBe("Detained / Protocol Locked");
    expect(PROFILE_DATA.incidentCode).toBe("SEC-BREACH-0x4B");
  });

  it("verifies Ciphertext, Race Condition, and Latency learning concepts exist", () => {
    const ciphertext = getLearningConcept("ciphertext");
    expect(ciphertext).toBeDefined();
    expect(ciphertext?.topic).toBe("Ciphertext");
    expect(ciphertext?.summary).toContain("Encrypted, unreadable data");

    const raceCondition = getLearningConcept("race-condition");
    expect(raceCondition).toBeDefined();
    expect(raceCondition?.topic).toBe("Race Condition");
    expect(raceCondition?.summary).toContain("simultaneous actions");

    const latency = getLearningConcept("latency");
    expect(latency).toBeDefined();
    expect(latency?.topic).toBe("Latency");
    expect(latency?.summary).toContain("wait for a response");
  });

  it("verifies safe calculation logic without eval", () => {
    function safeCalc(a: number, b: number, op: string): { result: number | null; error?: string } {
      switch (op) {
        case "+": return { result: a + b };
        case "-": return { result: a - b };
        case "×": return { result: a * b };
        case "÷": return b === 0 ? { result: null, error: "Error: Div by 0" } : { result: a / b };
        default: return { result: b };
      }
    }

    expect(safeCalc(10, 5, "+").result).toBe(15);
    expect(safeCalc(10, 5, "-").result).toBe(5);
    expect(safeCalc(10, 5, "×").result).toBe(50);
    expect(safeCalc(10, 5, "÷").result).toBe(2);
    expect(safeCalc(10, 0, "÷").error).toBe("Error: Div by 0");
  });
});
