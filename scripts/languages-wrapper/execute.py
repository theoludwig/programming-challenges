import os 
import json
from solution import solution

current_directory = os.path.dirname(__file__)
input_path = os.path.join(current_directory, "input.json")
output_path = os.path.join(current_directory, "output.json")

with open(input_path, "r") as file_content:
    input_json = json.load(file_content)

with open(output_path, "w") as file_content:
    json.dump(solution(*input_json), file_content)
