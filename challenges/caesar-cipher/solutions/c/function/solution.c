#include <stdio.h>
#include <stdlib.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  int shift;
  scanf("%d", &shift);
  string = string_caesar_cipher(string, shift);
  printf("%s\n", string);
  free(string);
  return EXIT_SUCCESS;
}
