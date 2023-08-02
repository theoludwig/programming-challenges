use std::io;

fn main() {
    let mut pyramid_type = String::new();
    io::stdin()
        .read_line(&mut pyramid_type)
        .expect("Failed to read `stdin` line.");
    pyramid_type = pyramid_type.trim().to_string();
    let mut height = String::new();
    io::stdin()
        .read_line(&mut height)
        .expect("Failed to read `stdin` line.");
    let height: usize = height
        .trim()
        .parse()
        .expect("Failed to convert `height` as an `usize`.");

    let mut step = if pyramid_type == "normal" { 1 } else { height };
    while (pyramid_type == "normal" && step <= height) || (pyramid_type == "reverse" && step != 0) {
        let number_of_stars = (step * 2) - 1;
        let total_number_of_locations = (height * 2) - 1;
        let total_number_of_spaces = total_number_of_locations - number_of_stars;
        let number_of_spaces_on_each_side = total_number_of_spaces / 2;
        println!(
            "{}{}{}",
            " ".repeat(number_of_spaces_on_each_side),
            "*".repeat(number_of_stars),
            " ".repeat(number_of_spaces_on_each_side)
        );
        if pyramid_type == "normal" {
            step = step + 1;
        } else {
            step = step - 1;
        }
    }
}
