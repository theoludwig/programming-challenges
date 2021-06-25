from typing import List, TypedDict
import sys

input_values: List[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


class ShiftedLetter(TypedDict):
    origin: str
    shifted: str


def shift_alphabet(shift: int) -> List[ShiftedLetter]:
    result: List[ShiftedLetter] = []
    alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ')
    is_negative_shift = shift < 0
    if is_negative_shift:
        alphabet.reverse()
        shift = abs(shift)
    for index in range(len(alphabet)):
        letter = alphabet[index]
        shifted_index = index + shift
        if shifted_index > len(alphabet) - 1:
            shifted_index = abs(len(alphabet) - shifted_index)
        result.append({
            'origin': letter,
            'shifted': alphabet[shifted_index]
        })
    return result


def caesar_cipher(string: str, shift: int) -> str:
    if shift == 0:
        return string
    shifted_alphabet = shift_alphabet(shift)
    result = ''
    for letter in string:
        if letter == ' ':
            result += ' '
        else:
            found_letter: ShiftedLetter = shifted_alphabet[0]
            for index in range(len(shifted_alphabet)):
                shifted_letter = shifted_alphabet[index]
                if shifted_letter['origin'] == letter:
                    found_letter = shifted_letter
            result += found_letter['shifted']
    return result


print(caesar_cipher(input_values[0], int(input_values[1])))
