import {
  escapeRegExp,
  replaceInArray,
  sortLexIgnoreCase,
  toExcludeQuery,
  toIncludeQuery,
} from ".";

describe("toExcludeQuery", () => {
  it("should produce empty string for empty array", () => {
    expect(toExcludeQuery([])).toBe("");
  });

  it("should add exclusion query to domains", () => {
    const array = ["example.com", "mozilla.org", "google.com"];
    expect(toExcludeQuery(array)).toMatch(
      "-site:example.com -site:mozilla.org -site:google.com"
    );
  });
});

describe("toIncludeQuery", () => {
  it("should produce empty string for empty array", () => {
    expect(toIncludeQuery([])).toBe("");
  });

  it("should add inclusion query to domains", () => {
    const array = ["example.com", "mozilla.org", "google.com"];
    expect(toIncludeQuery(array)).toMatch(
      "+site:example.com +site:mozilla.org +site:google.com"
    );
  });
});

describe("sortLexIgnoreCase", () => {
  it("should sort ascending by default", () => {
    const strings = ["BANANA", "orange", "Apple"];
    expect(sortLexIgnoreCase(strings)).toEqual(["Apple", "BANANA", "orange"]);
  });

  it("should sort descending", () => {
    const strings = ["BANANA", "orange", "Apple"];
    expect(sortLexIgnoreCase(strings, "desc")).toEqual([
      "orange",
      "BANANA",
      "Apple",
    ]);
  });

  it("should sort considering case when two words match", () => {
    const strings = ["BANANA", "orange", "Banana", "Apple"];
    expect(sortLexIgnoreCase(strings)).toEqual([
      "Apple",
      "BANANA",
      "Banana",
      "orange",
    ]);
  });
});

describe("replaceInArray", () => {
  it("should work with primitives", () => {
    const primitives = [1, 2, 3];
    expect(replaceInArray(primitives, 3, "c")).toEqual([1, 2, "c"]);
  });

  it("should work with objects", () => {
    const obj1 = { a: "1", b: "2" };
    const obj2 = { c: "3", d: "4" };
    const obj3 = { e: "5", f: "6" };
    const objects = [obj1, obj2, obj3];
    expect(replaceInArray(objects, obj3, "E")).toEqual([obj1, obj2, "E"]);
  });
});

describe("escapeRegExp", () => {
  test("should escape regex special characters", () => {
    const string = "*+?^${}()|[]\\";
    expect(escapeRegExp(string)).toMatch(
      "\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\"
    );
  });

  it("should not escape regular characters", () => {
    const string = "*::after {box-sizing: border-box;}";
    expect(escapeRegExp(string)).toMatch(
      "\\*::after \\{box-sizing: border-box;\\}"
    );
  });
});
