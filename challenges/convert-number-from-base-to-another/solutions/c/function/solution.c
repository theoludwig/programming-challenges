#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

unsigned long long mathematics_pow(unsigned long long base, unsigned long long exponent) {
  return exponent == 0 ? 1 : base * mathematics_pow(base, exponent - 1);
}

char* convert_number_from_base_10_to_base(unsigned long long number, unsigned long base) {
  if (number == 0) {
    return "0";
  }
  int remainders[64];
  int index = 0;
  while (number > 0) {
    remainders[index] = number % base;
    number = number / base;
    index++;
  }
  char* result = malloc(sizeof(char) * (index + 1));
  int index_result = 0;
  for (int iteration = index - 1; iteration >= 0; iteration--) {
    int remainder = remainders[iteration];
    if (remainder >= 10) {
      result[index_result] = (char)((remainder - 10) + 'A');
    } else {
      result[index_result] = (char)(remainder + '0');
    }
    index_result++;
  }
  result[index_result] = '\0';
  return result;
}

unsigned long convert_number_from_base_to_base_10(char* number, unsigned long base) {
  size_t length = strlen(number);
  int exponent = length - 1;
  unsigned long result = 0;
  int index = 0;
  while (exponent >= 0) {
    int current_number = (int)(number[index] - '0');
    if (current_number >= 10) {
      current_number = (int)(number[index] - 'A') + 10;
    } else {
      current_number = (int)(number[index] - '0');
    }
    result = result + current_number * mathematics_pow(base, exponent);
    exponent--;
    index++;
  }
  return result;
}

char* convert_number_from_base_to_another(char* number, unsigned long base_from, unsigned long base_target) {
  return convert_number_from_base_10_to_base(convert_number_from_base_to_base_10(number, base_from), base_target);
}

int main() {
  char* number = input();
  unsigned long base_from;
  unsigned long base_target;
  scanf("%lu", &base_from);
  scanf("%lu", &base_target);
  char* result = convert_number_from_base_to_another(number, base_from, base_target);
  printf("%s\n", result);
  free(number);
  free(result);
  return EXIT_SUCCESS;
}
