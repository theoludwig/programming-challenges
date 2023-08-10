#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int main() {
  unsigned long length;
  scanf("%lu", &length);
  for (unsigned long number = 1; number <= length; number++) {
    bool is_divisible_by_3 = number % 3 == 0;
    bool is_divisible_by_5 = number % 5 == 0;
    if (is_divisible_by_3 && is_divisible_by_5) {
      printf("FizzBuzz\n");
    } else if (is_divisible_by_3) {
      printf("Fizz\n");
    } else if (is_divisible_by_5) {
      printf("Buzz\n");
    } else {
      printf("%lu\n", number);
    }
  }
  return EXIT_SUCCESS;
}
