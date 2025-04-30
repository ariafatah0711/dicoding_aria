// Method 1: Using base and height
function calculateTriangleArea(base, height) {
  return (base * height) / 2;
}

// Method 2: Using three sides (Heron's formula)
function calculateTriangleAreaWithSides(a, b, c) {
  // Calculate semi-perimeter
  const s = (a + b + c) / 2;

  // Calculate area using Heron's formula
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  // Check if the triangle is valid
  if (isNaN(area)) {
    return "Invalid triangle sides";
  }

  return area;
}

// Example usage:
console.log(calculateTriangleArea(5, 4)); // Output: 10
console.log(calculateTriangleAreaWithSides(3, 4, 5)); // Output: 6

// Adding to your existing code
function calculateSquareArea(side) {
  return side * side; // Testing different scenarios
  console.log(calculateTriangleArea(6, 8)); // Output: 24
  console.log(calculateTriangleAreaWithSides(5, 5, 5)); // Output: 10.825317547305483 (equilateral triangle)
}

function calculateRectangleArea(length, width) {
  return length * width;
}
