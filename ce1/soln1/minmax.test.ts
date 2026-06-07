import { describe, it, expect } from "vitest";
import { numbers, min_max } from "./src/minmax.js";

describe("numbers", () => {
  it("parses valid integers", () => {
    expect(numbers(["1", " 2", "x"])).toEqual([1, 2]);
  });
});

describe("min_max", () => {
  it("returns min and max", () => {
    expect(min_max([3, 1, 9])).toEqual({ min: 1, max: 9 });
  });
});