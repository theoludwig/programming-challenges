#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  string = string_to_upper(string);
  string = string_replace(string, ' ', '\0');
  bool is_palindrome = string_is_palindrome(string);
  free(string);
  printf("%s\n", is_palindrome ? "true" : "false");
  return EXIT_SUCCESS;
}
