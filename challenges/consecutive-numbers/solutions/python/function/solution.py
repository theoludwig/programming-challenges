from typing import List
import sys

input_values: List[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def consecutive_numbers(numbers: List[int], couple_length: int) -> List[List[int]]:
    result: List[List[int]] = []
    numbers_length = len(numbers)
    for index in range(numbers_length):
        consecutive: List[int] = [numbers[index]]
        for couple_index in range(1, couple_length, 1):
            is_last_number = index + couple_index == numbers_length
            if is_last_number:
                break
            if (numbers[index] + couple_index == numbers[index + couple_index]):
                consecutive.append(numbers[index] + couple_index)
        is_consecutive = len(consecutive) == couple_length
        if is_consecutive:
            result.append(consecutive)
    return result


numbers: List[int] = []
for value in input_values[1].split(' ; '):
    numbers.append(int(value))

result = consecutive_numbers(numbers, int(input_values[0]))
for consecutive in result:
    consecutive = [str(number) for number in consecutive]
    print(' ; '.join(consecutive))
