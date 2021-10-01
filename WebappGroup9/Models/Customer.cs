using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebappGroup9.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid Firstname")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$", ErrorMessage = "Invalid Lastname")]
        public string LastName { get; set; }

        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,50}", ErrorMessage = "Invalid Street Adress")]
        public string StreetAddress { get; set; }
        
        public virtual PostalCode PostalCode { get; set; }

        [RegularExpression(@"^[0-9]{8}$", ErrorMessage = "Invalid Phone")] // TODO Just to get started, needs more work
        public string Phone { get; set; }
        
        [RegularExpression(@"^[a-zA-Z0-9_\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        // Ha customer som hoved tabell, bestilling sterkt avhengig av customer, pizza avhengig av bestilling
        public virtual List<Ticket> Tickets { get; set; }
    }
}