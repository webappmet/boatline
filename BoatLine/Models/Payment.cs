using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace BoatLine.Models
{
    [ExcludeFromCodeCoverage]
    public class Payment
    {
        [Key]
        public int Id { get; set; }
        
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
        
        // Setting up many to many
        // Ignoring looping Json
        // Source: https://stackoverflow.com/questions/7397207/json-net-error-self-referencing-loop-detected-for-type
        [JsonIgnore] 
        [IgnoreDataMember] 
        public virtual ICollection<Customer> Customers { get; set; }

        public Payment()
        {
            this.Customers = new HashSet<Customer>();
        }
        
    }
}