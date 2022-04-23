#include <cstdlib>
#include <iostream>
#include <string>

int main() {
  std::string line;
  std::getline(std::cin, line);
  std::cout << "Hello, " + line + "!\n";
  return EXIT_SUCCESS;
}
