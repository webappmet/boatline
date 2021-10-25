using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BoatLineTest
{
    public class MockHttpSession : ISession
    {
        readonly Dictionary<string, object> sessionStorage = new Dictionary<string, object>();

        public object this[string name]
        {
            get => sessionStorage[name];
            set => sessionStorage[name] = value;
        }

        void ISession.Set(string key, byte[] value)
        {
            sessionStorage[key] = value;
        }

        bool ISession.TryGetValue(string key, out byte[] value)
        {
            if (sessionStorage[key] != null)
            {
                value = Encoding.ASCII.GetBytes(sessionStorage[key].ToString());
                return true;
            }

            value = null;
            return false;
        }

        // The underlying methods are not necessary for mocking 

        IEnumerable<string> ISession.Keys => throw new NotImplementedException();

        string ISession.Id => throw new NotImplementedException();

        bool ISession.IsAvailable => throw new NotImplementedException();

        void ISession.Clear()
        {
            throw new NotImplementedException();
        }

        void ISession.Remove(string key)
        {
            throw new NotImplementedException();
        }

        Task ISession.CommitAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        Task ISession.LoadAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}