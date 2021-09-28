#include <stdio.h>
#include <stdlib.h>

#include "insertion_sort.h"

int main() {
  int current_number;
  int length = scanf("%d", &current_number);
  int *numbers = malloc(current_number * sizeof(int));
  int index_input = 0;
  while (scanf("%d", &current_number) != EOF) {
    numbers[index_input] = current_number;
    index_input += 1;
  }
  insertion_sort(numbers, index_input);
  for (int index = 0; index < index_input; index++) {
    printf("%d\n", numbers[index]);
  }
  free(numbers);
  return EXIT_SUCCESS;
}

void insertion_sort(int numbers[], const int length) {
  for (int index_1 = 1; index_1 < length; index_1++) {
    int current = numbers[index_1];
    int index_2 = index_1 - 1;
    while (index_2 >= 0 && numbers[index_2] > current) {
      numbers[index_2 + 1] = numbers[index_2];
      index_2 -= 1;
    }
    numbers[index_2 + 1] = current;
  }
}
