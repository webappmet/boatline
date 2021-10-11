using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebappGroup9.Models
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [RegularExpression(@"^[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4}$", ErrorMessage = "Invalid CardNumber")]
        public string CardNumber { get; set; }

        [RegularExpression(@"^\d{3}$", ErrorMessage = "Invalid CSC")]
        public string CSC { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{5,40}$", ErrorMessage = "Invalid CardHolderName")]
        public string CardHolderName { get; set; }

        [RegularExpression(@"^(0[1-9]|1[0-2])$", ErrorMessage = "Invalid ExpirationMonth")]
        public string ExpirationMonth { get; set; }
        
        [RegularExpression(@"^(0?[1-9]|[1-9][0-9])$", ErrorMessage = "Invalid ExpirationYear")]
        public string ExpirationYear { get; set; }

        public override string ToString()
        {
            return CardHolderName + " " + CardNumber + " " + CSC + " " + ExpirationMonth + " " + ExpirationYear;
        }
    }
}