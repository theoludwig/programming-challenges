use std::io;

pub fn capitalize(string: &str) -> String {
    let mut character = string.chars();
    match character.next() {
        None => String::new(),
        Some(value) => value.to_uppercase().collect::<String>() + character.as_str(),
    }
}

pub fn camel_case(string: &str) -> String {
    let mut result: Vec<String> = Vec::new();
    let words: Vec<&str> = string.trim().split_whitespace().collect();
    for (index, word) in words.iter().enumerate() {
        let is_first_word = index == 0;
        if is_first_word {
            result.push(word.to_string());
        } else {
            let word = capitalize(&word);
            result.push(word);
        }
    }
    return result.join("");
}

fn main() {
    let mut string = String::new();
    io::stdin()
        .read_line(&mut string)
        .expect("Failed to read `stdin` line.");
    println!("{}", camel_case(&string));
}
