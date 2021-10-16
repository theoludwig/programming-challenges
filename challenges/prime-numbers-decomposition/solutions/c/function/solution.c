#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

void print_array(int* numbers, int numbers_length) {
  for (int index = 0; index < numbers_length; index++) {
    printf("%d", numbers[index]);
    if (numbers_length - 1 != index) {
      printf(" * ");
    }
  }
  printf("\n");
}

int* get_dividers_list(int number, int* dividers_length) {
  *dividers_length = 1;
  int* dividers = malloc(sizeof(int) * *dividers_length);
  for (int index = 1; index <= number; index++) {
    if (number % index == 0) {
      dividers[*dividers_length - 1] = index;
      *dividers_length = *dividers_length + 1;
      dividers = realloc(dividers, sizeof(int) * *dividers_length);
    }
  }
  *dividers_length = *dividers_length - 1;
  return dividers;
}

bool is_prime_number(int number) {
  int dividers_length;
  get_dividers_list(number, &dividers_length);
  return dividers_length == 2;
}

int sum_multiply_numbers(int* numbers, int numbers_length) {
  int sum = 1;
  for (int index = 0; index < numbers_length; index++) {
    sum = sum * numbers[index];
  }
  return sum;
}

int* prime_numbers_decomposition(int number, int* decomposition_length) {
  *decomposition_length = 1;
  int* decomposition = malloc(sizeof(int) * *decomposition_length);
  int total = 0;
  int dividend = number;
  while (total != number) {
    int divider = 2;
    int reste = 0;
    int quotient = 0;
    do {
      reste = dividend % divider;
      quotient = dividend / divider;
      divider++;
    } while (reste != 0);
    divider--;
    decomposition[*decomposition_length - 1] = divider;
    *decomposition_length = *decomposition_length + 1;
    decomposition = realloc(decomposition, sizeof(int) * *decomposition_length);
    if (is_prime_number(quotient)) {
      decomposition[*decomposition_length - 1] = quotient;
      *decomposition_length = *decomposition_length + 1;
      total = sum_multiply_numbers(decomposition, *decomposition_length - 1);
    } else {
      total = sum_multiply_numbers(decomposition, *decomposition_length - 1);
      dividend = quotient;
    }
  }
  *decomposition_length = *decomposition_length - 1;
  return decomposition;
}

int main() {
  int number;
  int decomposition_length = 0;
  scanf("%d", &number);
  int* decomposition = prime_numbers_decomposition(number, &decomposition_length);
  print_array(decomposition, decomposition_length);
  free(decomposition);
  return EXIT_SUCCESS;
}
