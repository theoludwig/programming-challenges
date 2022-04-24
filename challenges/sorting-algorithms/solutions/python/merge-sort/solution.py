from typing import TypeVar
import sys

T = TypeVar('T')


def divide_list(values: list[T]) -> tuple[list[T], list[T]]:
    middle = len(values) // 2
    left = values[middle:]
    right = values[:middle]
    return (left, right)


def merge(numbers_1: list[int], numbers_2: list[int]) -> list[int]:
    length_numbers_1 = len(numbers_1)
    length_numbers_2 = len(numbers_2)
    index_numbers_1 = 0
    index_numbers_2 = 0
    result: list[int] = []
    while index_numbers_1 < length_numbers_1 and index_numbers_2 < length_numbers_2:
        if numbers_1[index_numbers_1] < numbers_2[index_numbers_2]:
            result.append(numbers_1[index_numbers_1])
            index_numbers_1 += 1
        else:
            result.append(numbers_2[index_numbers_2])
            index_numbers_2 += 1
    for index_numbers_1 in range(index_numbers_1, length_numbers_1, 1):
        result.append(numbers_1[index_numbers_1])
    for index_numbers_2 in range(index_numbers_2, length_numbers_2, 1):
        result.append(numbers_2[index_numbers_2])
    return result


def merge_sort(numbers: list[int]) -> list[int]:
    if len(numbers) <= 1:
        return numbers
    left, right = divide_list(numbers)
    left, right = merge_sort(left), merge_sort(right)
    return merge(left, right)


numbers: list[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

numbers = numbers[1:]
sorted_numbers = merge_sort(numbers)
for number in sorted_numbers:
    print(number)
