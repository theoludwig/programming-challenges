#include <ctype.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"
#include "stack.h"

bool is_integer(char* string) {
  size_t string_length = strlen(string);
  for (size_t index = 0; index < string_length; index++) {
    if (!isdigit(string[index])) {
      return false;
    }
  }
  return true;
}

int main() {
  char* string = input();
  struct stack* stack = stack_initialization();
  char* token = strtok(string, " ");
  while (token != NULL) {
    if (is_integer(token)) {
      intptr_t number;
      sscanf(token, "%ld", &number);
      stack_push(stack, (void*)number);
    } else {
      intptr_t number1 = (intptr_t)stack_pop(stack);
      intptr_t number2 = (intptr_t)stack_pop(stack);
      intptr_t result = 0;
      if (strcmp(token, "+") == 0) {
        result = number2 + number1;
      } else if (strcmp(token, "-") == 0) {
        result = number2 - number1;
      } else if (strcmp(token, "*") == 0) {
        result = number2 * number1;
      } else {
        result = number2 / number1;
      }
      stack_push(stack, (void*)result);
    }
    token = strtok(NULL, " ");
  }
  printf("%ld\n", (intptr_t)stack_pop(stack));
  free(string);
  stack_free(stack);
  return EXIT_SUCCESS;
}
