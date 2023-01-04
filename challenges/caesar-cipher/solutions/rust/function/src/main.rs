use std::io;

pub struct ShiftedLetter {
    pub origin: char,
    pub shifted: char,
}

pub fn shift_alphabet(shift: i32) -> Vec<ShiftedLetter> {
    let mut shift = shift;
    let mut result: Vec<ShiftedLetter> = Vec::new();
    let mut alphabet: Vec<char> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".chars().collect();
    let is_negative_shift = shift < 0;
    if is_negative_shift {
        alphabet.reverse();
        shift = shift.abs();
    }
    for (index, letter) in alphabet.iter().enumerate() {
        let mut shifted_index = (index as i32 + shift) as i32;
        if shifted_index > (alphabet.len() - 1) as i32 {
            shifted_index = (alphabet.len() as i32 - shifted_index).abs();
        }
        let shifted_letter = alphabet[shifted_index as usize];
        result.push(ShiftedLetter {
            origin: *letter,
            shifted: shifted_letter,
        });
    }
    return result;
}

pub fn caesar_cipher(string: &str, shift: i32) -> String {
    if shift == 0 {
        return string.to_string();
    }
    let shifted_alphabet = shift_alphabet(shift);
    let mut result = String::new();
    for letter in string.chars() {
        if letter.is_whitespace() {
            result.push(letter);
        } else {
            let mut found_letter = &shifted_alphabet[0];
            for shifted_letter in shifted_alphabet.iter() {
                if shifted_letter.origin == letter {
                    found_letter = shifted_letter;
                    break;
                }
            }
            result.push(found_letter.shifted);
        }
    }
    return result;
}

fn main() {
    let mut string = String::new();
    io::stdin()
        .read_line(&mut string)
        .expect("Failed to read `stdin` line.");
    let string = string.trim();

    let mut shift = String::new();
    io::stdin()
        .read_line(&mut shift)
        .expect("Failed to read `stdin` line.");
    let shift: i32 = shift
        .trim()
        .parse()
        .expect("Failed to convert `width` as an `i32`.");
    println!("{}", caesar_cipher(&string, shift));
}
