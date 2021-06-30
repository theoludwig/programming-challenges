from typing import List
import sys

matches_roman_arabic = [
    {'arabic': 1000, 'roman': 'M'},
    {'arabic': 900, 'roman': 'CM'},
    {'arabic': 500, 'roman': 'D'},
    {'arabic': 400, 'roman': 'CD'},
    {'arabic': 100, 'roman': 'C'},
    {'arabic': 90, 'roman': 'XC'},
    {'arabic': 50, 'roman': 'L'},
    {'arabic': 40, 'roman': 'XL'},
    {'arabic': 10, 'roman': 'X'},
    {'arabic': 9, 'roman': 'IX'},
    {'arabic': 5, 'roman': 'V'},
    {'arabic': 4, 'roman': 'IV'},
    {'arabic': 1, 'roman': 'I'}
]


def convert_arabic_to_roman(arabic_number: int) -> str:
    roman_number: str = ''
    for match in matches_roman_arabic:
        while arabic_number >= match['arabic']:
            roman_number = roman_number + match['roman']
            arabic_number = arabic_number - match['arabic']
    return roman_number


def convert_roman_to_arabic(roman_number: str) -> int:
    arabic_number: int = 0
    for match in matches_roman_arabic:
        while True:
            try:
                if roman_number.index(match['roman']) == 0:
                    arabic_number = arabic_number + match['arabic']
                    roman_number = roman_number.replace(match['roman'], '', 1)
                else:
                    break
            except ValueError:
                break
    return arabic_number


input_values: List[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))

convert_type = input_values[0]
if convert_type == 'arabic to roman':
    print(convert_arabic_to_roman(int(input_values[1])))
else:
    print(convert_roman_to_arabic(input_values[1]))
