width = int(input())
height = int(input())
text = input()

characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "?"]

# "ABCDEFGHIJKLMNOPQRSTUVWXYZ?" Represented in ASCII art.
# key = character ; value = character represented in ASCII art line by line
characters_ascii: dict[str, list[str]] = {}

for character in characters:
    characters_ascii[character] = []

for y in range(height):
    row = input()
    row_ascii = ""
    character_index = 0
    character_ascii_index = 0
    for x, character in enumerate(row):
        if character_ascii_index == width - 1:
            row_ascii += character
            characters_ascii[characters[character_index]].append(row_ascii)
            character_index += 1
            row_ascii = ""
            character_ascii_index = 0
        else:
            row_ascii += character
            character_ascii_index += 1


def text_to_text_ascii(text: str) -> str:
    characters_needed: list[list[str]] = []
    for _, character in enumerate(text):
        character = character.upper()
        if character not in characters_ascii:
            character = "?"
        characters_needed.append(characters_ascii[character])

    text_ascii = ""
    for y in range(height):
        for x in range(len(characters_needed)):
            text_ascii += characters_needed[x][y]
        text_ascii += "\n"
    return text_ascii


print(text_to_text_ascii(text))
