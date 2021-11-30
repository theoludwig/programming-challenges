using System;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            string line = Console.ReadLine();
            string result = "";
            for (int index = 0; index < line.Length; index++)
            {
                int numberOfAppearances = 0;
                char valueToSearch = line[index];
                int iteration = index;
                while (iteration < line.Length && line[iteration] == valueToSearch)
                {
                    numberOfAppearances += 1;
                    iteration++;
                }
                result = result + numberOfAppearances.ToString() + line[index];
                index += numberOfAppearances - 1;
            }
            Console.WriteLine(result);
        }
    }
}
