#include <stdio.h>
#include <stdlib.h>

#include "bubble_sort.h"

int main() {
  int current_number;
  int length = scanf("%d", &current_number);
  int *numbers = malloc(current_number * sizeof(int));
  int index_input = 0;
  while (scanf("%d", &current_number) != EOF) {
    numbers[index_input] = current_number;
    index_input += 1;
  }
  bubble_sort(numbers, index_input);
  for (int index = 0; index < index_input; index++) {
    printf("%d\n", numbers[index]);
  }
  free(numbers);
  return 0;
}

void bubble_sort(int numbers[], const int length) {
  for (int index_1 = 0; index_1 < length; index_1++) {
    for (int index_2 = 0; index_2 < length - index_1 - 1; index_2++) {
      if (numbers[index_2] > numbers[index_2 + 1]) {
        swap_numbers(&numbers[index_2], &numbers[index_2 + 1]);
      }
    }
  }
}

void swap_numbers(int *value_1, int *value_2) {
  int temporary = *value_1;
  *value_1 = *value_2;
  *value_2 = temporary;
}
