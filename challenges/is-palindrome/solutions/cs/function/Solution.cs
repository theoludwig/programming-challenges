using System;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            string line = Console.ReadLine();
            line = line.ToLower().Replace(" ", "");
            string reverse = "";
            for (int index = line.Length - 1; index >= 0; index--)
            {
                reverse += line[index];
            }
            if (line == reverse)
            {
                Console.WriteLine("true");
            }
            else
            {
                Console.WriteLine("false");
            }
        }
    }
}
