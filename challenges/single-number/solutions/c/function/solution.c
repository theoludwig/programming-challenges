#include <stdio.h>
#include <stdlib.h>

int single_number(int* numbers, size_t numbers_size) {
  int result = numbers[0];
  for (size_t index = 1; index < numbers_size; index++) {
    result = result ^ numbers[index];
  }
  return result;
}

int main() {
  size_t numbers_size = 0;
  int number;
  int* numbers = malloc(sizeof(int));
  do {
    scanf("%d", &number);
    numbers = realloc(numbers, sizeof(int) * (numbers_size + 1));
    numbers[numbers_size] = number;
    numbers_size++;
  } while (fgetc(stdin) != EOF);
  printf("%d\n", single_number(numbers, numbers_size));
  free(numbers);
  return EXIT_SUCCESS;
}
