use std::io;

fn main() {
    let mut length = String::new();
    io::stdin()
        .read_line(&mut length)
        .expect("Failed to read `stdin` line.");
    let length: usize = length
        .trim()
        .parse()
        .expect("Failed to convert `length` as an `usize`.");
    for number in 1..=length {
        let is_divisible_by_3 = number % 3 == 0;
        let is_divisible_by_5 = number % 5 == 0;
        if is_divisible_by_3 && is_divisible_by_5 {
            println!("FizzBuzz");
        } else if is_divisible_by_3 {
            println!("Fizz");
        } else if is_divisible_by_5 {
            println!("Buzz");
        } else {
            println!("{number}");
        }
    }
}
