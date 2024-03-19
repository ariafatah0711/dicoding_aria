import detectTriangle from "../src/detectTriangle";

describe("Detect the triangle", () => {
  it("Should fail if the sides are less than 1", () => {
    expect(() => detectTriangle(-1, 2, 2)).toThrowError("Strange Triangle");
    expect(() => detectTriangle(1, -2, 2)).toThrowError("Strange Triangle");
    expect(() => detectTriangle(1, 2, -2)).toThrowError("Strange Triangle");
  });

  it("Should fail if the sides are not integer", () => {
    expect(() => detectTriangle("a", 2, 2)).toThrowError("Sides have to be Integer");
    expect(() => detectTriangle(1, "a", 2)).toThrowError("Sides have to be Integer");
    expect(() => detectTriangle(1, 2, "a")).toThrowError("Sides have to be Integer");

    expect(() => detectTriangle(" ", 2, 2)).toThrowError("Sides have to be Integer");
  });

  it("Should detect inequality problem", () => {
    expect(() => detectTriangle(4, 1, 2)).toThrowError("Triangle does not conform inequality principle");
    expect(() => detectTriangle(5, 1, 3)).toThrowError("Triangle does not conform inequality principle");
  });

  it("Should detect Equilateral Triangle if all sides are equal", () => {
    expect(detectTriangle(1, 1, 1)).toEqual("Equilateral Triangle");
    expect(detectTriangle(1, 2, 2)).not.toEqual("Equilateral Triangle");
  });

  it("Should detect Isosceles Triangle if only two sides are equal", () => {
    expect(detectTriangle(2, 2, 3)).toEqual("Isosceles Triangle");
    expect(detectTriangle(4, 2, 4)).toEqual("Isosceles Triangle");
    expect(detectTriangle(1, 2, 2)).toEqual("Isosceles Triangle");

    expect(detectTriangle(4, 1, 4)).toEqual("Isosceles Triangle");
  });

  it("Should detect Scalene Triangle if no sides are the same", () => {
    expect(detectTriangle(2, 4, 3)).toEqual("Scalene Triangle");
  });
});
