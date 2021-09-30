#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

bool is_odd(int number) {
  return number % 2 == 1;
}

int find_outlier_number(int* numbers, size_t length) {
  int outlier_number;
  int* odd_numbers = malloc(length * sizeof(int));
  int* even_numbers = malloc(length * sizeof(int));
  size_t odd_length = 0;
  size_t even_length = 0;
  for (size_t index = 0; index < length; index++) {
    if (is_odd(numbers[index])) {
      odd_numbers[odd_length] = numbers[index];
      odd_length++;
    } else {
      even_numbers[even_length] = numbers[index];
      even_length++;
    }
  }
  if (odd_length == 1) {
    outlier_number = odd_numbers[0];
  } else {
    outlier_number = even_numbers[0];
  }
  free(odd_numbers);
  free(even_numbers);
  return outlier_number;
}

int main() {
  size_t length = 0;
  int number;
  int* numbers = malloc(sizeof(int));
  do {
    scanf("%d", &number);
    numbers = realloc(numbers, sizeof(int) * (length + 1));
    numbers[length] = number;
    length++;
  } while (fgetc(stdin) != EOF);
  printf("%d\n", find_outlier_number(numbers, length));
  free(numbers);
  return EXIT_SUCCESS;
}
