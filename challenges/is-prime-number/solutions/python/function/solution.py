import sys

input_values: list[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def divider_list(number: int) -> list[int]:
    number_list: list[int] = []
    for index in range(1, number + 1):
        if number % index == 0:
            number_list.append(index)
    return number_list


def solution(number: int) -> bool:
    return len(divider_list(number)) == 2


is_prime_number = solution(int(input_values[0]))
if is_prime_number:
    print('true')
else:
    print('false')
