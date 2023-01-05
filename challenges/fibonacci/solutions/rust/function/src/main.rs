use std::io;

pub fn fibonacci(number: u32) -> u32 {
    if number == 0 || number == 1 {
        return number;
    }
    return fibonacci(number - 1) + fibonacci(number - 2);
}

fn main() {
    let mut number = String::new();
    io::stdin()
        .read_line(&mut number)
        .expect("Failed to read `stdin` line.");
    let number: u32 = number
        .trim()
        .parse()
        .expect("Failed to convert `number` as an `u32`.");
    println!("{}", fibonacci(number));
}
