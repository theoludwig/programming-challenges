#include <stdlib.h>
#include <string.h>

#include "array_2D_int.h"
#include "input.h"

int main() {
  size_t number_of_rows = 0;
  size_t number_of_columns = 0;
  char *direction = input();
  int **array_input = array_2D_int_input(&number_of_rows, &number_of_columns);

  int **array;
  if (strcmp(direction, "clockwise") == 0) {
    array = array_2D_int_rotate_90_degrees_clockwise(array_input, &number_of_rows, &number_of_columns);
  } else {
    array = array_2D_int_rotate_90_degrees_anticlockwise(array_input, &number_of_rows, &number_of_columns);
  }
  array_2D_int_print(array, number_of_rows, number_of_columns);

  free(direction);
  for (size_t row = 0; row < number_of_rows; row++) {
    free(array[row]);
  }
  free(array);
  return EXIT_SUCCESS;
}
