from typing import List
import sys


def bubble_sort(numbersInput: List[int]) -> List[int]:
    numbers = list(numbersInput)
    length = len(numbers)
    for index_1 in range(length):
        for index_2 in range(length - index_1 - 1):
            if numbers[index_2] > numbers[index_2 + 1]:
                temporary = numbers[index_2]
                numbers[index_2] = numbers[index_2 + 1]
                numbers[index_2 + 1] = temporary
    return numbers


numbers: List[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

sorted_numbers = bubble_sort(numbers)
for number in sorted_numbers:
    print(number)
