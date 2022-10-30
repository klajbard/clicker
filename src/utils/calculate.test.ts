import { describe, expect, it } from "vitest";

import { toHumanReadable } from "./calculate";

describe("calculate", () => {
  it("should convert number to human readable string", () => {
    expect(toHumanReadable(1454.1856)).toBe("1,454.186");
    expect(toHumanReadable(14800.55)).toBe("14.8 k");
    expect(toHumanReadable(145211)).toBe("145.2 k");
    expect(toHumanReadable(1452113)).toBe("1,452 k");
    expect(toHumanReadable(14521133.55)).toBe("14.52 M");
  });
});
