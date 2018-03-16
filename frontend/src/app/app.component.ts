import { Component, OnInit } from '@angular/core';
import { DataHubService } from './services/data-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';
  helloWorld = '';
  constructor(public datahubservices: DataHubService) {
    this.datahubservices.hello$.subscribe((data)=>{
      console.log(data);
      this.helloWorld = data;
    });
  }

  ngOnInit(): void {
    this.datahubservices.online$.subscribe((isOnline) => {
      if (isOnline) {
        this.datahubservices.Hello("World!!");
      }
    });
  }
}
