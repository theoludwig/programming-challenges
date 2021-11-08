#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

char *swap(char *string, size_t index_from, size_t index_target) {
  size_t string_length = strlen(string);
  char *result = malloc(sizeof(char *) * (string_length));
  for (size_t index = 0; index < string_length; index++) {
    if (index == index_from) {
      result[index] = string[index_target];
    } else if (index == index_target) {
      result[index] = string[index_from];
    } else {
      result[index] = string[index];
    }
  }
  return result;
}

void heap_algorithm(unsigned long number_of_elements_to_operate, char *string) {
  if (number_of_elements_to_operate == 1) {
    printf("%s\n", string);
  } else {
    heap_algorithm(number_of_elements_to_operate - 1, string);
    for (size_t index = 0; index < number_of_elements_to_operate - 1; index++) {
      bool is_even = number_of_elements_to_operate % 2 == 0;
      if (!is_even) {
        string = swap(string, index, number_of_elements_to_operate - 1);
      } else {
        string = swap(string, 0, number_of_elements_to_operate - 1);
      }
      heap_algorithm(number_of_elements_to_operate - 1, string);
    }
  }
}

int main() {
  char *string = input();
  size_t string_length = strlen(string);
  heap_algorithm(string_length, string);
  return EXIT_SUCCESS;
}
