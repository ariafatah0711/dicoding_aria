const detectTriangle = (sideA, sideB, sideC) => {
  [sideA, sideB, sideC] = [sideA, sideB, sideC]
    .map((side) => {
      if (!Number.isInteger(side)) {
        throw new Error("Sides have to be Integer");
      }

      if (side < 1) {
        throw new Error("Strange Triangle");
      }
      return side;
    })
    .sort();

  if (sideA + sideB <= sideC) {
    throw new Error("Triangle does not conform inequality principle");
  }

  if (sideA === sideB && sideA === sideC && sideB === sideC) {
    return "Equilateral Triangle";
  }

  if (sideA === sideB || sideB === sideC) {
    return "Isosceles Triangle";
  }

  return "Scalene Triangle";
};

export default detectTriangle;
