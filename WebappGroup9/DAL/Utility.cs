using System;
using System.Linq;

namespace WebappGroup9.DAL
{
    public static class Utility
    {
        private static int _digit = 8;
        private static readonly Random Random = new Random();

        public static void UpdateDigit(int digit)
        {
            _digit = digit;
        }
        
        public static string GetRandomHexNumber()
        {
            byte[] buffer = new byte[_digit / 2];
            Random.NextBytes(buffer);
            var result = string.Concat(buffer.Select(x => x.ToString("X2")).ToArray());
            return _digit % 2 == 0 ? result : result + Random.Next(16).ToString("X");
        }
    }
}