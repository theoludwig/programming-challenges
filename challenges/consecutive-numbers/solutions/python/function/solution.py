import sys

input_values: list[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def consecutive_numbers(numbers: list[int], couple_length: int) -> list[list[int]]:
    result: list[list[int]] = []
    numbers_length = len(numbers)
    for index in range(numbers_length):
        consecutive: list[int] = [numbers[index]]
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


numbers: list[int] = []
for value in input_values[1].split(' ; '):
    numbers.append(int(value))

result = consecutive_numbers(numbers, int(input_values[0]))
for consecutive in result:
    consecutive = [str(number) for number in consecutive]
    print(' ; '.join(consecutive))
