#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

void print_couple(int* numbers, size_t couple_length) {
  for (size_t index = 0; index < couple_length; index++) {
    printf("%d", numbers[index]);
    if (index != couple_length - 1) {
      printf(" ; ");
    }
  }
  printf("\n");
}

int main() {
  size_t couple_length;
  scanf("%ld\n", &couple_length);
  char* string = input();
  char* token = strtok(string, " ; ");
  size_t numbers_length = 1;
  int* numbers = malloc(sizeof(int) * numbers_length);
  while (token != NULL) {
    if (strcmp(token, ";") != 0) {
      int number;
      sscanf(token, "%d", &number);
      numbers[numbers_length - 1] = number;
      numbers_length++;
      numbers = realloc(numbers, sizeof(int) * numbers_length);
    }
    token = strtok(NULL, " ");
  }

  for (size_t index = 0; index < numbers_length; index++) {
    int* consecutive = malloc(sizeof(int) * couple_length);
    consecutive[0] = numbers[index];
    size_t consecutive_length = 1;
    for (size_t couple_index = 1; couple_index < couple_length; couple_index++) {
      bool is_last_number = index + couple_index == numbers_length;
      if (is_last_number) {
        break;
      }
      if ((int)(numbers[index] + couple_index) == numbers[index + couple_index]) {
        consecutive[consecutive_length] = (int)(numbers[index] + couple_index);
        consecutive_length++;
      }
      bool is_consecutive = consecutive_length == couple_length;
      if (is_consecutive) {
        print_couple(consecutive, consecutive_length);
      }
    }
    free(consecutive);
  }
  free(numbers);
  return EXIT_SUCCESS;
}
