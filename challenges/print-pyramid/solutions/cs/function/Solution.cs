using System;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            string pyramidType = Console.ReadLine();
            int pyramidHeight = int.Parse(Console.ReadLine());
            PrintPyramid(pyramidType, pyramidHeight);
        }

        public static void PrintPyramid(string type, int height)
        {
            int step = type == "normal" ? 1 : height;
            while ((type == "normal" && step <= height) || (type == "reverse" && step != 0))
            {
                int numberOfStars = (step * 2) - 1;
                int totalNumberOfLocations = (height * 2) - 1;
                int totalNumberOfSpaces = totalNumberOfLocations - numberOfStars;
                int numberOfSpacesOnEachSide = totalNumberOfSpaces / 2;
                PrintCharacter(' ', numberOfSpacesOnEachSide);
                PrintCharacter('*', numberOfStars);
                PrintCharacter(' ', numberOfSpacesOnEachSide);
                Console.Write('\n');
                step = type == "normal" ? step + 1 : step - 1;
            }
        }

        public static void PrintCharacter(char character, int numberOfTimes)
        {
            for (int iteration = 0; iteration < numberOfTimes; iteration++)
            {
                Console.Write(character);
            }
        }
    }
}
