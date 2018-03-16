using System;
using System.Reactive.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class DataHub : Hub
    {

        public Task Hello(string name)
        {
            string HelloWorldFormat = "Hello, {0}";
            return Clients.All.SendAsync("hello", string.Format(HelloWorldFormat, name));
        }

         public IObservable<string> Time()
        {
            return Observable.Create(
                async (IObserver<string> observer) =>
                {
                    while (true)
                    {
                        observer.OnNext(DateTime.UtcNow.ToString());
                        await Task.Delay(1000);
                    }
                });
        }
    }
}