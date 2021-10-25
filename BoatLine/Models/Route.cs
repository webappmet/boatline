using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoatLine.Models
{
    public class Route
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid departure city name")]
        public string Departure { get; set; }
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid destination city name")]
        public string Destination { get; set; }
        
        [RegularExpression(@"^[0-9]{1,2}$", ErrorMessage = "Invalid duration days")]
        public int DurationDays { get; set; }
        
        [RegularExpression(@"^[0-9]{1,2}$", ErrorMessage = "Invalid duration hours")]
        public int DurationHours { get; set; }
    }
}