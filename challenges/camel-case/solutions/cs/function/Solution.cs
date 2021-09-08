using System;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            string[] words = Console.ReadLine().ToLower().Trim().Split(" ");
            string result = words[0];
            for (int index = 1; index < words.Length; index++)
            {
                var word = words[index];
                result += word[0].ToString().ToUpper() + word.Substring(1);
            }
            Console.WriteLine(result);
        }
    }
}
