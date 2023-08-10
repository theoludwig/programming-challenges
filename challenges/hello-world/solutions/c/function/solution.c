#include <stdio.h>
#include <stdlib.h>

#include "input.h"

int main() {
  char *string = input();
  printf("Hello, %s!\n", string);
  free(string);
  return EXIT_SUCCESS;
}
