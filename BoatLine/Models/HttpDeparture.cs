using System.ComponentModel.DataAnnotations;

namespace BoatLine.Models
{
    public class HttpDeparture
    {
        [RegularExpression(@"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", ErrorMessage = "Invalid date")]
        public string Date { get; set; }
        
        [RegularExpression(@"^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$", ErrorMessage = "Invalid time")]
        public string Time { get; set; }
    }
}