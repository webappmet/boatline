using System.Collections.Generic;

namespace webapp_gruppeoppgave.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        
        // Ha customer som hoved tabell, bestilling sterkt avhengig av customer, pizza avhengig av bestilling
        public virtual List<Ticket> Tickets { get; set; }
    }
}