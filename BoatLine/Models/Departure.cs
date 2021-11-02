using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace BoatLine.Models
{
    [ExcludeFromCodeCoverage]
    public class Departure
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [AllowNull]
        public virtual Route Route { get; set; }

        //[RegularExpression(@"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", ErrorMessage = "Invalid date")]
        public string Date { get; set; }
        
        //[RegularExpression(@"^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$", ErrorMessage = "Invalid time")]
        public string Time { get; set; }
    }
}