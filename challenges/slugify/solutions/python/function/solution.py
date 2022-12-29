string = input()


def is_alphanumeric(character: str) -> bool:
    is_lowercase_letter = ord(character) >= ord('a') and ord(character) <= ord('z')
    is_upper_letter = ord(character) >= ord('A') and ord(character) <= ord('Z')
    is_digit = ord(character) >= ord('0') and ord(character) <= ord('9')
    return is_upper_letter or is_lowercase_letter or is_digit


string = string.strip(' ').strip('-')
answer = ""
current = ""

for character in string:
    if character == ' ' or (character == '-' and len(current) > 0):
        answer += current
        answer += '-'
        current = ""
    elif is_alphanumeric(character):
        current += character

answer += current

print(answer)
