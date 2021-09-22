using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebappGroup9.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public string LastName { get; set; }

        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,50}")]
        public string Address { get; set; }

        [RegularExpression(@"^[0-9]{8}$")] // TODO Just to get started, needs more work
        public string Phone { get; set; }

        // Ha customer som hoved tabell, bestilling sterkt avhengig av customer, pizza avhengig av bestilling
        public virtual List<Ticket> Tickets { get; set; }
    }
}