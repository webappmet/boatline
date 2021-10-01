using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebappGroup9.Models
{
    public class PostalCode
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [RegularExpression(@"^[0-9]{4}$", ErrorMessage = "Invalid postal code")]
        public string Code { get; set; }
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{1,20}$", ErrorMessage = "Invalid city name")]
        public string Name { get; set; }
    }
}