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
        private readonly Dictionary<string, object> _sessionStorage = new();

        public object this[string name]
        {
            get => _sessionStorage[name];
            set => _sessionStorage[name] = value;
        }

        void ISession.Set(string key, byte[] value)
        {
            _sessionStorage[key] = value;
        }

        bool ISession.TryGetValue(string key, out byte[] value)
        {
            if (_sessionStorage[key] != null)
            {
                value = Encoding.ASCII.GetBytes(_sessionStorage[key].ToString());
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