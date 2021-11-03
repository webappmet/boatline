using System;

namespace BoatLine.DAL.DbLogger
{
    public class LogModel
    {
        public Guid Id { get; set; }
        public DateTime Time { get; set; }
        public string Content { get; set; }
    }
}