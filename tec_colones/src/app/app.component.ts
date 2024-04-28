import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'tec_colones';

  constructor(private data: DatabaseService){
    console.log(data.database);
  }
}
