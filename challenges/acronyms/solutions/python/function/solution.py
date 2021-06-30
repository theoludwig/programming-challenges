from typing import List
import sys

input_values: List[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def get_acronym(sentence: str) -> str:
    words = sentence.replace('"', '').split(' ')
    acronym = ''
    for word in words:
        acronym += word[0].capitalize()
    return acronym


print(get_acronym(input_values[0]))
