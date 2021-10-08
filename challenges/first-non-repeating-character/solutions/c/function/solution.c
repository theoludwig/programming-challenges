#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  char character = string_first_non_repeating_character(string);
  if (character == 0) {
    printf("\n");
  } else {
    printf("%c\n", character);
  }
  free(string);
  return EXIT_SUCCESS;
}
