use std::io;

fn main() {
    let mut string = String::new();
    io::stdin()
        .read_line(&mut string)
        .expect("Failed to read `stdin` line.");
    let string = string.trim().replace(" ", "").to_lowercase();
    let mut reverse: Vec<char> = string.chars().collect();
    reverse.reverse();
    let reverse: String = reverse.into_iter().collect();
    let is_palindrome = reverse == string;
    println!("{is_palindrome}");
}
