import { describe, expect, it } from "vitest";
import { PROFILE_DATA } from "../src/data/profileData";
import { getLearningConcept } from "../src/data/learningConcepts";

describe("Profile Data and Learning Concepts", () => {
  it("contains M's exact profile details from profile.txt", () => {
    expect(PROFILE_DATA.fullName).toBe("Merdin Morov");
    expect(PROFILE_DATA.email).toBe("merdinmorov1@gmail.com");
    expect(PROFILE_DATA.nickname).toBe("M");
    expect(PROFILE_DATA.age).toBe(28);
    expect(PROFILE_DATA.sex).toBe("Male");
    expect(PROFILE_DATA.nationality).toBe("Republic of Valen");
    expect(PROFILE_DATA.occupation).toBe("Systems Infrastructure Analyst");
    expect(PROFILE_DATA.phoneNumber).toBe("(202) 555-0147");
    expect(PROFILE_DATA.fathersName).toBe("Daniel Morov");
    expect(PROFILE_DATA.mothersName).toBe("Elena Morova");
    expect(PROFILE_DATA.assignedNode).toBe("VT-NODE-08 (Containment Wing)");
    expect(PROFILE_DATA.status).toBe("Detained / Protocol Locked");
    expect(PROFILE_DATA.incidentCode).toBe("SEC-BREACH-0x4B");
    expect(PROFILE_DATA.initialLocation).toBe("North District · Building 08");
  });

  it("provides Access Token and Caching learning concepts", () => {
    const token = getLearningConcept("access-token");
    expect(token).toBeDefined();
    expect(token?.topic).toBe("Access Token");
    expect(token?.summary).toContain("access token");

    const caching = getLearningConcept("caching");
    expect(caching).toBeDefined();
    expect(caching?.topic).toBe("Caching");
    expect(caching?.summary).toContain("Caching");
  });
});
