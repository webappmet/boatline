namespace webapp_gruppeoppgave.Models
{
    public class Ticket
    {
        // Tor uses this but i think it is for a key that doesn't autoincrement or something i dunno
        // [Key]
        // [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Route { get; set; }
        public string Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}