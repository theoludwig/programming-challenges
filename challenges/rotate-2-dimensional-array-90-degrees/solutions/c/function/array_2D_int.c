#include "array_2D_int.h"

void array_2D_int_print(int **array, size_t number_of_rows, size_t number_of_columns) {
  for (size_t row = 0; row < number_of_rows; row++) {
    for (size_t column = 0; column < number_of_columns; column++) {
      printf("%d", array[row][column]);
      if (column != number_of_columns - 1) {
        printf(" ");
      }
    }
    printf("\n");
  }
}

int **array_2D_int_input(size_t *number_of_rows, size_t *number_of_columns) {
  *number_of_rows = 0;
  *number_of_columns = 0;
  int **array = malloc(sizeof(int *));
  char *line = input();
  while (string_get_length(line) != 0) {
    char **integers_string = string_split(line, ' ', number_of_columns);
    array[*number_of_rows] = malloc(*number_of_columns * sizeof(int));
    for (size_t column = 0; column < *number_of_columns; column++) {
      array[*number_of_rows][column] = atoi(integers_string[column]);
      free(integers_string[column]);
    }
    free(integers_string);
    free(line);
    line = input();
    *number_of_rows += 1;
    array = realloc(array, (*number_of_rows + 1) * sizeof(int *));
  }
  free(line);
  return array;
}

int **array_2D_int_reverse_rows(int **array, size_t *number_of_rows, size_t *number_of_columns) {
  int **rotated_array = malloc(*number_of_rows * sizeof(int *));
  for (size_t row = 0; row < *number_of_rows; row++) {
    rotated_array[row] = malloc(*number_of_columns * sizeof(int));
  }
  for (size_t row = 0; row < *number_of_columns; row++) {
    for (size_t column = 0; column < *number_of_rows; column++) {
      rotated_array[row][column] = array[*number_of_rows - row - 1][column];
    }
  }
  return rotated_array;
}

int **array_2D_int_rotate_90_degrees_clockwise(int **array, size_t *number_of_rows, size_t *number_of_columns) {
  int **rotated_array = malloc(*number_of_columns * sizeof(int *));
  for (size_t row = 0; row < *number_of_columns; row++) {
    rotated_array[row] = malloc(*number_of_rows * sizeof(int));
  }
  for (size_t row = 0; row < *number_of_columns; row++) {
    for (size_t column = 0; column < *number_of_rows; column++) {
      rotated_array[row][column] = array[*number_of_rows - column - 1][row];
    }
  }
  size_t number_of_rows_temp = *number_of_rows;
  *number_of_rows = *number_of_columns;
  *number_of_columns = number_of_rows_temp;
  return rotated_array;
}

int **array_2D_int_rotate_90_degrees_anticlockwise(int **array, size_t *number_of_rows, size_t *number_of_columns) {
  int **result_1 = array_2D_int_rotate_90_degrees_clockwise(array, number_of_rows, number_of_columns);
  size_t number_of_rows_temp = *number_of_rows;

  int **result_2 = array_2D_int_rotate_90_degrees_clockwise(result_1, number_of_rows, number_of_columns);
  for (size_t row = 0; row < number_of_rows_temp; row++) {
    free(result_1[row]);
  }
  free(result_1);
  number_of_rows_temp = *number_of_rows;

  int **result_3 = array_2D_int_rotate_90_degrees_clockwise(result_2, number_of_rows, number_of_columns);
  for (size_t row = 0; row < number_of_rows_temp; row++) {
    free(result_2[row]);
  }
  free(result_2);
  number_of_rows_temp = *number_of_rows;

  int **result_4 = array_2D_int_reverse_rows(result_3, number_of_rows, number_of_columns);
  for (size_t row = 0; row < number_of_rows_temp; row++) {
    free(result_3[row]);
  }
  free(result_3);

  return result_4;
}
