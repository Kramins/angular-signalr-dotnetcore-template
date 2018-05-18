import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import signalR = require('@aspnet/signalr');

@Injectable()
export class DataHubService {

  private hub: HubConnection;
  private onlineSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private helloSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private timeSubject: BehaviorSubject<string> = new BehaviorSubject('');

  online$ = this.onlineSubject.asObservable();
  hello$ = this.helloSubject.asObservable();
  time$ = this.timeSubject.asObservable();

  constructor() {
    this.hub = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/api/data')
      .build();

    this.hub.on('hello', (data) => {
      this.helloSubject.next(data);
    });

    this.hub.start().then((val) => {
      this.onlineSubject.next(true);
    });

    this.online$.subscribe((isOnline) => {
      if (isOnline) {
        this.hub.stream('time')
          .subscribe({
            next: (data: string) => this.timeSubject.next(data),
            error: (error) => { console.error(error) },
            complete: () => { console.info("Hub Completed") }
          });
      }
    });
  }

  Hello(name: string): void {
    this.hub.invoke('Hello', name);
  }

}
