from typing import TypeVar
import sys

T = TypeVar('T')

input_values: list[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def get_is_valid_subsequence(array: list[T], sequence: list[T]) -> bool:
    index_to_check = 0
    for index in range(len(array)):
        if index_to_check < len(sequence) and array[index] == sequence[index_to_check]:
            index_to_check += 1
    return index_to_check == len(sequence)


is_valid_subsequence = get_is_valid_subsequence(
    input_values[0].split(' '), input_values[1].split(' '))
print('true' if is_valid_subsequence else 'false')
