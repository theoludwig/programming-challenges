import sys

numbers: list[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

numbers = numbers[1:]
sorted_numbers = sorted(numbers, key=int)
for number in sorted_numbers:
    print(number)
