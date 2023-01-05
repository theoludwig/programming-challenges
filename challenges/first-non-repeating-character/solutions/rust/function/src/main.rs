use std::{collections::HashMap, io};

#[derive(Debug, Copy, Clone)]
pub struct CharacterOccurence {
    pub total: usize,
    pub first_index: usize,
    pub value: char,
}

pub fn first_non_repeating_character(string: &str) -> String {
    let mut characters_occurences: HashMap<char, CharacterOccurence> = HashMap::new();
    for (index, character) in string.chars().enumerate() {
        match characters_occurences.get(&character) {
            Some(value) => {
                characters_occurences.insert(
                    character,
                    CharacterOccurence {
                        total: value.total + 1,
                        ..value.clone()
                    },
                );
            }
            None => {
                characters_occurences.insert(
                    character,
                    CharacterOccurence {
                        total: 1,
                        first_index: index,
                        value: character,
                    },
                );
            }
        }
    }
    let mut result: Option<CharacterOccurence> = Option::None;
    for (_, character_occurence) in &characters_occurences {
        if character_occurence.total == 1 {
            match result {
                Some(ref mut result) => {
                    if character_occurence.first_index < result.first_index {
                        *result = *character_occurence;
                    }
                }
                None => {
                    result = Some(*character_occurence);
                }
            }
        }
    }
    match result {
        Some(result) => result.value.to_string(),
        None => "".to_string(),
    }
}

fn main() {
    let mut string = String::new();
    io::stdin()
        .read_line(&mut string)
        .expect("Failed to read `stdin` line.");
    let string = string.trim();
    println!("{}", first_non_repeating_character(&string));
}
