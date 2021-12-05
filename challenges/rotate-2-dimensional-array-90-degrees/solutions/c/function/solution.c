#include <stdlib.h>
#include <string.h>

#include "array_2D_int.h"
#include "input.h"

int main() {
  size_t number_of_rows = 0;
  size_t number_of_columns = 0;
  char *direction = input();
  int **array = array_2D_int_input(&number_of_rows, &number_of_columns);

  if (strcmp(direction, "clockwise") == 0) {
    array = array_2D_int_rotate_90_degrees_clockwise(array, &number_of_rows, &number_of_columns);
  } else {
    array = array_2D_int_rotate_90_degrees_anticlockwise(array, &number_of_rows, &number_of_columns);
  }
  array_2D_int_print(array, number_of_rows, number_of_columns);

  for (size_t i = 0; i < number_of_rows; i++) {
    free(array[i]);
  }
  free(array);
  free(direction);
  return EXIT_SUCCESS;
}
