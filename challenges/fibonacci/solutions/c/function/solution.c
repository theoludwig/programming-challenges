#include <stdio.h>
#include <stdlib.h>

int fibonacci(int number) {
  return number < 2 ? number : fibonacci(number - 1) + fibonacci(number - 2);
}

int main() {
  int number;
  scanf("%d", &number);
  printf("%d\n", fibonacci(number));
  return EXIT_SUCCESS;
}
