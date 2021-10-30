using System.Diagnostics.CodeAnalysis;

namespace BoatLine.Models.Auth
{
    [ExcludeFromCodeCoverage]
    public class DbAdmin
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] Password { get; set; }
        public byte[] Salt { get; set; }
    }
}