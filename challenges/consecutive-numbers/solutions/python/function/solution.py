from typing import List
import sys

input_values: List[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def consecutive_numbers(numbers: List[int]) -> List[List[int]]:
    consecutive_numbers_pairs: List[List[int]] = []
    numbers_length = len(numbers)
    for index in range(numbers_length):
        number = numbers[index]
        is_last_number = index == numbers_length - 1
        if not is_last_number and number + 1 == numbers[index + 1]:
            consecutive_numbers_pairs.append([number, number + 1])
    return consecutive_numbers_pairs


numbers: List[int] = []
for value in input_values:
    numbers.append(int(value))

consecutive_numbers_pairs = consecutive_numbers(numbers)
for pairs in consecutive_numbers_pairs:
    print(f"{pairs[0]} ; {pairs[1]}")
