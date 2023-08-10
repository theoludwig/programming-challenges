#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

bool is_prime_number(unsigned long number) {
  for (unsigned long iteration = 2; iteration < number; iteration++) {
    if (number % iteration == 0) {
      return false;
    }
  }
  return true;
}

int main() {
  unsigned long number;
  scanf("%lu", &number);
  bool is_prime = is_prime_number(number);
  printf("%s\n", is_prime ? "true" : "false");
  return EXIT_SUCCESS;
}
