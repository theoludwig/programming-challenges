import sys

input_values: list[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def fibonacci(number: int) -> int:
    return number if number < 2 else fibonacci(number-1) + fibonacci(number-2)


print(fibonacci(int(input_values[0])))
