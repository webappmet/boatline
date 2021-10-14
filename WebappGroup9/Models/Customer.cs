using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebappGroup9.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Reference { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid Firstname")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid Lastname")]
        public string LastName { get; set; }

        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,50}", ErrorMessage = "Invalid Street Address")]
        public string StreetAddress { get; set; }
        
        public virtual PostalCode PostalCode { get; set; }

        [RegularExpression(@"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$", ErrorMessage = "Invalid Phone number")]
        public string Phone { get; set; }
        
        [RegularExpression(@"^[a-zA-Z0-9_\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        
        public virtual List<Ticket> Tickets { get; set; }
        
        // Setting up many to many
        public virtual ICollection<Payment> Payments { get; set; }
        
        public Customer()
        {
            this.Payments = new HashSet<Payment>();
        }
    }
}