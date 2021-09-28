#include <stdio.h>
#include <stdlib.h>

int main() {
  char input[1024];
  while (scanf("%s", &input) != EOF) {
    printf("Hello, %s!", input);
  }
  return EXIT_SUCCESS;
}
