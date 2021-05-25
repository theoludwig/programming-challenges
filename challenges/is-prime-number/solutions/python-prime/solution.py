from typing import List


def divider_list(number: int) -> List[int]:
    number_list: List[int] = []
    for index in range(1, number + 1):
        if number % index == 0:
            number_list.append(index)
    return number_list


def solution(number: int) -> bool:
    return len(divider_list(number)) == 2
