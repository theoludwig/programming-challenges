using System;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            string line = Console.ReadLine();
            string[] words = line.Replace("\"", "").Split(' ');
            string result = "";
            foreach (string word in words)
            {
                result += word[0].ToString().ToUpper();
            }
            Console.WriteLine(result);
        }
    }
}
