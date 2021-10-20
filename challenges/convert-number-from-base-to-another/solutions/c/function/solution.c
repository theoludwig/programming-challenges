#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

int math_power(int base, int power) {
  int result = 1;
  for (int iteration = 0; iteration < power; iteration++) {
    result = result * base;
  }
  return result;
}

char* convert_from_base_10_to_base(unsigned long number, unsigned int base) {
  if (number == 0) {
    return "0";
  }
  int remainders[64] = {};
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
  return result;
}

int convert_from_base_to_base_10(char* number, unsigned int base) {
  int length = strlen(number);
  int exponent = length - 1;
  int result = 0;
  int index = 0;
  while (exponent >= 0) {
    int current_number = (int)(number[index] - '0');
    if (current_number >= 10) {
      current_number = (int)(number[index] - 'A') + 10;
    } else {
      current_number = (int)(number[index] - '0');
    }
    result = result + current_number * math_power(base, exponent);
    exponent--;
    index++;
  }
  return result;
}

int main() {
  char* number = input();
  int base_from;
  int base_target;
  scanf("%d", &base_from);
  scanf("%d", &base_target);
  printf("%s\n", convert_from_base_10_to_base(convert_from_base_to_base_10(number, base_from), base_target));
  return EXIT_SUCCESS;
}
