using System;
using System.Linq;

namespace WebappGroup9.DAL
{
    public static class Utility
    {
        private static int _digits = 8;
        private static readonly Random Random = new Random();

        public static void UpdateDigits(int digits)
        {
            _digits = digits;
        }
        
        public static string GetRandomHexNumber()
        {
            byte[] buffer = new byte[_digits / 2];
            Random.NextBytes(buffer);
            var result = string.Concat(buffer.Select(x => x.ToString("X2")).ToArray());
            return _digits % 2 == 0 ? result : result + Random.Next(16).ToString("X");
        }
    }
}