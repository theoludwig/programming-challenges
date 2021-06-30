from typing import List
import sys

numbers: List[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

numbers = numbers[1:]
sorted_numbers = sorted(numbers, key=int)
for number in sorted_numbers:
    print(number)
