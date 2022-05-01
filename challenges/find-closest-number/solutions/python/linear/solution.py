import sys


def find_closest_number(integers: list[int], value: int) -> int:
    """
    From list of integers, get number closest to a given value
    """
    current = integers[0]
    for number in integers:
        if abs(number - value) < abs(current - value):
            current = number
    return current


numbers: list[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

given_number = numbers[0]
numbers = numbers[2:]
print(find_closest_number(numbers, given_number))
