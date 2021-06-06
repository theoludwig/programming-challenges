from typing import List
import sys

input = []
for value in sys.stdin:
    input.append(value.rstrip('\n'))


def divider_list(number: int) -> List[int]:
    number_list: List[int] = []
    for index in range(1, number + 1):
        if number % index == 0:
            number_list.append(index)
    return number_list


def solution(number: int) -> bool:
    return len(divider_list(number)) == 2


is_prime_number = solution(int(input[0]))
if is_prime_number:
    print('true')
else:
    print('false')
