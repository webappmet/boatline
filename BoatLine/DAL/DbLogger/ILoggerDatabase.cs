using System.Threading.Tasks;

namespace BoatLine.DAL.DbLogger
{
    public interface ILoggerDatabase
    {
        Task Save(LogModel model);
    }
}