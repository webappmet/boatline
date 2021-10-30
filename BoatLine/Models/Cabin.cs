using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace BoatLine.Models
{
    [ExcludeFromCodeCoverage]
    public class Cabin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Type { get; set; }
        public double Price { get; set; }
        public int Beds { get; set; }

        // Setting up many to many
        // Ignoring looping Json
        // Source: https://stackoverflow.com/questions/7397207/json-net-error-self-referencing-loop-detected-for-type
        [JsonIgnore] 
        [IgnoreDataMember] 
        public virtual ICollection<Ticket> Tickets { get; set; }

        public Cabin()
        {
            this.Tickets = new HashSet<Ticket>();
        }
        
    }
}