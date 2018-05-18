using System;
using System.Reactive.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using backend.Extensions;
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

        public ChannelReader<string> Time()
        {
            var timeObservable = Observable
                .Interval(TimeSpan.FromSeconds(1))
                .Select((_, x) =>
                {
                    return DateTime.UtcNow.ToString();
                });

            return timeObservable.AsChannelReader();
        }
    }
}