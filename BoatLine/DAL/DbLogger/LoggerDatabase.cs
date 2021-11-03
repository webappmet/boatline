using System.Threading.Tasks;

namespace BoatLine.DAL.DbLogger
{
    public class LoggerDatabase : ILoggerDatabase
    {
        private readonly BoatLineDb _context;

        public LoggerDatabase(BoatLineDb context)
        {
            _context = context;
        }

        public async Task Save(LogModel model)
        {
            _context.DbLogger.Add(model);

            await _context.SaveChangesAsync();
        }
    }
}