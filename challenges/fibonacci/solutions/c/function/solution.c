#include <stdio.h>
#include <stdlib.h>

unsigned long fibonacci(unsigned long number) {
  return number < 2 ? number : fibonacci(number - 1) + fibonacci(number - 2);
}

int main() {
  unsigned long number;
  scanf("%lu", &number);
  printf("%lu\n", fibonacci(number));
  return EXIT_SUCCESS;
}
