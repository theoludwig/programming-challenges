use std::io;

/// From list of `integers`, get number closest to a given `value`.
pub fn find_closest_number(integers: &[i32], value: i32) -> i32 {
    let mut current = integers[0];
    for integer in integers {
        if (integer - value).abs() < (current - value).abs() {
            current = *integer;
        }
    }
    return current.clone();
}

fn main() {
    let mut given_number = String::new();
    io::stdin()
        .read_line(&mut given_number)
        .expect("Failed to read `stdin` line.");
    let given_number: i32 = given_number
        .trim()
        .parse()
        .expect("Failed to convert `given_number` as an `i32`.");

    let mut length = String::new();
    io::stdin()
        .read_line(&mut length)
        .expect("Failed to read `stdin` line.");
    let length: usize = length
        .trim()
        .parse()
        .expect("Failed to convert `length` as an `usize`.");

    let mut integers: Vec<i32> = Vec::new();
    for _ in 0..length {
        let mut integer = String::new();
        io::stdin()
            .read_line(&mut integer)
            .expect("Failed to read `stdin` line.");
        let integer: i32 = integer
            .trim()
            .parse()
            .expect("Failed to convert `integer` as an `i32`.");
        integers.push(integer);
    }
    println!("{}", find_closest_number(&integers, given_number));
}
