#include <stdio.h>
#include <stdlib.h>

char* triangle_type(int triangle_sides[3]) {
  if ((triangle_sides[0] + triangle_sides[1] < triangle_sides[2]) || (triangle_sides[2] + triangle_sides[0] < triangle_sides[1]) || (triangle_sides[2] + triangle_sides[1] < triangle_sides[0])) {
    return "impossible";
  }
  if (triangle_sides[0] == triangle_sides[1] && triangle_sides[1] == triangle_sides[2]) {
    return "equilateral";
  }
  if (triangle_sides[0] == triangle_sides[1] || triangle_sides[1] == triangle_sides[2] || triangle_sides[2] == triangle_sides[0]) {
    return "isosceles";
  }
  return "scalene";
}

int main() {
  int triangle_sides[3] = {};
  for (size_t index = 0; index < 3; index++) {
    scanf("%d", &triangle_sides[index]);
  }
  printf("%s\n", triangle_type(triangle_sides));
  return EXIT_SUCCESS;
}
