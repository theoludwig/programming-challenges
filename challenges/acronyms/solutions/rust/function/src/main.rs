use std::io;

pub fn get_acronym(sentence: &str) -> String {
    let words = sentence.replace("\"", "");
    let words = words.split_whitespace();
    let mut acronym = String::new();
    for word in words {
        if let Some(character) = word.to_uppercase().chars().next() {
            acronym.push(character);
        }
    }
    acronym
}

fn main() {
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read `stdin` line.");
    println!("{}", get_acronym(&input));
}
