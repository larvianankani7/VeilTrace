import { describe, expect, it } from "vitest";
import { DEMO_PASS } from "../src/desktop/apps/PassGeneratorApp";
import { PROFILE_DATA } from "../src/data/profileData";

describe("Screen 4 Auth and Profile Logic", () => {
  it("generates the exact required pass: @1234M_#9", () => {
    expect(DEMO_PASS).toBe("@1234M_#9");
  });

  it("verifies login credentials match M's email and vault password", () => {
    const validEmail = PROFILE_DATA.email;
    const vaultPassword = "@1234M_#9";

    function validateLogin(email: string, pass: string, vault: string | null): boolean {
      if (!vault) return false;
      return (
        email.trim().toLowerCase() === validEmail.toLowerCase() &&
        pass.trim() === vault.trim()
      );
    }

    expect(validateLogin(validEmail, "@1234M_#9", vaultPassword)).toBe(true);
    expect(validateLogin("other@example.com", "@1234M_#9", vaultPassword)).toBe(false);
    expect(validateLogin(validEmail, "wrongpass", vaultPassword)).toBe(false);
    expect(validateLogin(validEmail, "@1234M_#9", null)).toBe(false);
  });

  it("validates location update requiring non-blank string", () => {
    function isValidLocation(loc: string): boolean {
      return loc.trim().length > 0;
    }

    expect(isValidLocation("Sector-04 Core")).toBe(true);
    expect(isValidLocation("")).toBe(false);
    expect(isValidLocation("   ")).toBe(false);
  });
});
