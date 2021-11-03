using System;
using System.Threading.Tasks;

namespace BoatLine.DAL.DbLogger
{
    public class Logger
    {
        private readonly ILoggerDatabase _db;
        
        public Logger(ILoggerDatabase database)
        {
            _db = database;
        }

        public Task Log(string content)
        {
            var item = new LogModel
            {
                Time = DateTime.UtcNow,
                Content = content
            };

            return _db.Save(item);
        }
    }
}