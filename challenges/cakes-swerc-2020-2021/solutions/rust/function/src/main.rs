use std::io;

fn main() {
    let mut number_of_ingredients = String::new();
    io::stdin()
        .read_line(&mut number_of_ingredients)
        .expect("Failed to read `stdin` line.");
    let number_of_ingredients: usize = number_of_ingredients
        .trim()
        .parse()
        .expect("Failed to convert `number_of_ingredients` as an `usize`.");

    let mut maximum_number_of_cake_possible: Option<u32> = None;

    for _ in 0..number_of_ingredients {
        let mut line = String::new();
        io::stdin()
            .read_line(&mut line)
            .expect("Failed to read `stdin` line.");
        let line_integers: Vec<&str> = line.trim().split_whitespace().collect();
        let quantity_per_cake: u32 = line_integers
            .get(0)
            .expect("Couldn't get `quantity_per_cake`.")
            .parse()
            .expect("Failed to convert `quantity_per_cake` as an `u32`.");
        let quantity_available: u32 = line_integers
            .get(1)
            .expect("Couldn't get `quantity_available`.")
            .parse()
            .expect("Failed to convert `quantity_available` as an `u32`.");

        let cake_possible = quantity_available / quantity_per_cake;
        if let Some(value) = maximum_number_of_cake_possible {
            if cake_possible < value {
                maximum_number_of_cake_possible = Some(cake_possible);
            }
        } else {
            maximum_number_of_cake_possible = Some(cake_possible);
        }
    }
    if let Some(value) = maximum_number_of_cake_possible {
        println!("{value}");
    } else {
        println!("0");
    }
}
