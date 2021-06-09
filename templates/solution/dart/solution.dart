import 'dart:io';

String readLineSync() {
  String? string = stdin.readLineSync();
  return string == null ? '' : string;
}

void main() {
  String input = readLineSync();
  print('Hello, $input!');
}
