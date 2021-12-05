#include "array_2D_int.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

void array_2D_int_print(int **array, size_t number_of_rows, size_t number_of_columns) {
  for (size_t i = 0; i < number_of_rows; i++) {
    for (size_t j = 0; j < number_of_columns; j++) {
      printf("%d", array[i][j]);
      if (j != number_of_columns - 1) {
        printf(" ");
      }
    }
    printf("\n");
  }
}

int **array_2D_int_input(size_t *number_of_rows, size_t *number_of_columns) {
  int **array = malloc(sizeof(int *));
  *number_of_rows = 1;
  *number_of_columns = 1;
  array[0] = malloc(*number_of_columns * sizeof(int));
  array[0][0] = 0;
  char character;
  size_t length = 1;
  char *string = malloc(length * sizeof(char));
  *string = '\0';
  while ((character = getchar()) != EOF) {
    if (character == '\n') {
      int number = atoi(string);
      array[*number_of_rows - 1][*number_of_columns - 1] = number;
      length = 1;
      memset(string, 0, length * sizeof(char));
      *string = '\0';
      *number_of_rows = *number_of_rows + 1;
      *number_of_columns = 1;
      array = realloc(array, *number_of_rows * sizeof(int *));
      array[*number_of_rows - 1] = malloc(*number_of_columns * sizeof(int));
    } else {
      if (character == ' ') {
        int number = atoi(string);
        array[*number_of_rows - 1][*number_of_columns - 1] = number;
        length = 1;
        memset(string, 0, length * sizeof(char));
        *string = '\0';
        *number_of_columns = *number_of_columns + 1;
      } else {
        length++;
        string = realloc(string, length * sizeof(char));
        character_append(string, character);
      }
    }
  }
  int number = atoi(string);
  array[*number_of_rows - 1][*number_of_columns - 1] = number;
  return array;
}

int **array_2D_int_reverse_rows(int **array, size_t *number_of_rows, size_t *number_of_columns) {
  int **rotated_array = malloc(*number_of_columns * sizeof(int *));
  for (size_t i = 0; i < *number_of_columns; i++) {
    rotated_array[i] = malloc(*number_of_rows * sizeof(int));
  }
  for (size_t i = 0; i < *number_of_columns; i++) {
    for (size_t j = 0; j < *number_of_rows; j++) {
      rotated_array[i][j] = array[*number_of_rows - i - 1][j];
    }
  }
  return rotated_array;
}

int **array_2D_int_rotate_90_degrees_clockwise(int **array, size_t *number_of_rows, size_t *number_of_columns) {
  int **rotated_array = malloc(*number_of_columns * sizeof(int *));
  for (size_t i = 0; i < *number_of_columns; i++) {
    rotated_array[i] = malloc(*number_of_rows * sizeof(int));
  }
  for (size_t i = 0; i < *number_of_columns; i++) {
    for (size_t j = 0; j < *number_of_rows; j++) {
      rotated_array[i][j] = array[*number_of_rows - j - 1][i];
    }
  }
  size_t number_of_rows_temp = *number_of_rows;
  *number_of_rows = *number_of_columns;
  *number_of_columns = number_of_rows_temp;
  return rotated_array;
}

int **array_2D_int_rotate_90_degrees_anticlockwise(int **array, size_t *number_of_rows, size_t *number_of_columns) {
  int **result = array_2D_int_rotate_90_degrees_clockwise(array, number_of_rows, number_of_columns);
  result = array_2D_int_rotate_90_degrees_clockwise(result, number_of_rows, number_of_columns);
  result = array_2D_int_rotate_90_degrees_clockwise(result, number_of_rows, number_of_columns);
  result = array_2D_int_reverse_rows(result, number_of_rows, number_of_columns);
  return result;
}
