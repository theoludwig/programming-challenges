use std::io;

fn main() {
    let mut string = String::new();
    io::stdin()
        .read_line(&mut string)
        .expect("Failed to read `stdin` line.");
    let string = string.trim().trim_matches('-');
    let mut answer = String::new();
    let mut current = String::new();
    for (_, character) in string.chars().enumerate() {
        if character.is_whitespace() || (character == '-' && current.chars().count() > 0) {
            answer.push_str(&current);
            answer.push('-');
            current.clear();
        } else if character.is_alphanumeric() {
            current.push(character);
        }
    }
    answer.push_str(&current);
    println!("{answer}");
}
