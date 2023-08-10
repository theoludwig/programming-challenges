#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  string_to_uppercase(string);
  string_remove_character(string, ' ');
  bool is_palindrome = string_is_palindrome(string);
  free(string);
  printf("%s\n", is_palindrome ? "true" : "false");
  return EXIT_SUCCESS;
}
