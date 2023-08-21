#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

void swap(char *string, size_t index_from, size_t index_target) {
  char temporary = string[index_from];
  string[index_from] = string[index_target];
  string[index_target] = temporary;
}

void heap_algorithm(char *string, size_t number_of_elements_to_operate) {
  if (number_of_elements_to_operate == 1) {
    printf("%s\n", string);
  } else {
    heap_algorithm(string, number_of_elements_to_operate - 1);
    for (size_t index = 0; index < number_of_elements_to_operate - 1; index++) {
      bool is_even = number_of_elements_to_operate % 2 == 0;
      swap(string, is_even ? index : 0, number_of_elements_to_operate - 1);
      heap_algorithm(string, number_of_elements_to_operate - 1);
    }
  }
}

int main() {
  char *string = input();
  size_t string_length = strlen(string);
  heap_algorithm(string, string_length);
  free(string);
  return EXIT_SUCCESS;
}
