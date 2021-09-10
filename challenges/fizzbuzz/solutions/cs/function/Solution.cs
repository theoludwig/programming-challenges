using System;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            int total = int.Parse(Console.ReadLine());
            for (int number = 1; number <= total; number++)
            {
                bool isDivisibleBy3 = number % 3 == 0;
                bool isDivisibleBy5 = number % 5 == 0;
                if (isDivisibleBy3 && isDivisibleBy5)
                {
                    Console.WriteLine("FizzBuzz");
                }
                else if (isDivisibleBy3)
                {
                    Console.WriteLine("Fizz");
                }
                else if (isDivisibleBy5)
                {
                    Console.WriteLine("Buzz");
                }
                else
                {
                    Console.WriteLine(number);
                }
            }
        }
    }
}
