from typing import List
import sys

input_values: List[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def fizzbuzz(length: int) -> None:
    for number in range(1, length + 1, 1):
        is_divisible_by_3 = number % 3 == 0
        is_divisible_by_5 = number % 5 == 0
        if is_divisible_by_3 and is_divisible_by_5:
            print("FizzBuzz")
        elif is_divisible_by_3:
            print("Fizz")
        elif is_divisible_by_5:
            print("Buzz")
        else:
            print(number)


fizzbuzz(int(input_values[0]))
