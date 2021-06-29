from typing import List
import sys


def insertion_sort(numbersInput: List[int]) -> List[int]:
    numbers = list(numbersInput)
    for index_1 in range(1, len(numbers)):
        current = numbers[index_1]
        index_2 = index_1 - 1
        while index_2 >= 0 and numbers[index_2] > current:
            numbers[index_2 + 1] = numbers[index_2]
            index_2 -= 1
        numbers[index_2 + 1] = current
    return numbers


numbers: List[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

sorted_numbers = insertion_sort(numbers)
for number in sorted_numbers:
    print(number)
