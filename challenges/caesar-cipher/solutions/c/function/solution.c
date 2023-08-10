#include <stdio.h>
#include <stdlib.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  int shift;
  scanf("%d", &shift);
  char* result = string_caesar_cipher(string, shift);
  printf("%s\n", result);
  free(string);
  free(result);
  return EXIT_SUCCESS;
}
