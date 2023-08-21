use std::{collections::HashMap, io};

fn main() {
    let mut width = String::new();
    io::stdin()
        .read_line(&mut width)
        .expect("Failed to read `stdin` line.");
    let width: usize = width
        .trim()
        .parse()
        .expect("Failed to convert `width` as an `usize`.");

    let mut height = String::new();
    io::stdin()
        .read_line(&mut height)
        .expect("Failed to read `stdin` line.");
    let height: usize = height
        .trim()
        .parse()
        .expect("Failed to convert `height` as an `usize`.");

    let mut text = String::new();
    io::stdin()
        .read_line(&mut text)
        .expect("Failed to read `stdin` line.");
    let text = text.trim();

    let characters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '?',
    ];

    // "ABCDEFGHIJKLMNOPQRSTUVWXYZ?" Represented in ASCII art.
    // key = character ; value = character represented in ASCII art line by line
    let mut characters_ascii: HashMap<char, Vec<String>> = HashMap::new();

    for character in characters {
        let value = vec![];
        characters_ascii.insert(character, value);
    }

    for _ in 0..height {
        let mut row = String::new();
        io::stdin()
            .read_line(&mut row)
            .expect("Failed to read `stdin` line.");
        let mut character_index: usize = 0;
        let mut character_ascii_index: usize = 0;
        let mut row_ascii = String::new();
        for (_, character) in row.char_indices() {
            let is_last = character_ascii_index == width - 1;
            if is_last {
                row_ascii.push(character);
                let row_ascii_value = row_ascii.clone();
                row_ascii.clear();
                characters_ascii
                    .get_mut(&characters[character_index])
                    .expect(
                        "Failed to get `characters[character_index]` key from `characters_ascii`.",
                    )
                    .push(row_ascii_value);
                character_index += 1;
                character_ascii_index = 0;
            } else {
                row_ascii.push(character);
                character_ascii_index += 1;
            }
        }
    }

    let mut characters_needed: Vec<Vec<String>> = vec![];
    for (_, character) in text.char_indices() {
        let mut character = character.to_uppercase();
        let mut character = character
            .next()
            .expect("Failed to get `character.next()` value from `character.to_uppercase()`.");
        if !characters_ascii.contains_key(&character) {
            character = '?';
        }
        characters_needed.push(
            characters_ascii
                .get(&character)
                .expect(
                    "Failed to get `characters_ascii.get(&character)` key from `characters_ascii`.",
                )
                .clone(),
        );
    }

    let mut text_ascii = String::new();
    for column in 0..height {
        for row in 0..characters_needed.len() {
            text_ascii.push_str(&characters_needed[row][column]);
        }
        text_ascii.push('\n');
    }
    println!("{}", text_ascii);
}
