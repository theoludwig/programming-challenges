use std::io;

fn is_prime_number(number: u32) -> bool {
    for iteration in 2..number {
        if number % iteration == 0 {
            return false;
        }
    }
    return true;
}

fn main() {
    let mut number = String::new();
    io::stdin()
        .read_line(&mut number)
        .expect("Failed to read `stdin` line.");
    let number: u32 = number.trim().parse().expect("Please type a number!");
    println!("{}", is_prime_number(number));
}
