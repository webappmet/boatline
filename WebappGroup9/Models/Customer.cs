using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebappGroup9.Models
{
    public class Customer
    {
        public int Id { get; set; }
        
        public string Reference { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid Firstname")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid Lastname")]
        public string LastName { get; set; }

        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,50}", ErrorMessage = "Invalid Street Address")]
        public string StreetAddress { get; set; }
        
        public virtual PostalCode PostalCode { get; set; }

        [RegularExpression(@"^(?:[+]?(?:00)?47)?[0-9]{8}$", ErrorMessage = "Invalid Phone number")]
        public string Phone { get; set; }
        
        [RegularExpression(@"^[a-zA-Z0-9_\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        
        public virtual Payment Payment { get; set; }
        public virtual List<Ticket> Tickets { get; set; }
    }
}