import { Component, OnInit, NgZone } from '@angular/core';
import { UserDataService } from './user-data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Conectando...';
  datosList: any = [];
  name: string = " ";
  friends: number = 0;
  likes: number = 0;
  posts: number = 0;
  token: any;
  loged: boolean = false;



  constructor(private zone: NgZone, public _datosService: UserDataService){


    _datosService.datosList1.subscribe(d => {
      this.zone.run(() => {

      this.datosList = d;
      this.title = "Facebook App";
      this.name = this.datosList.name;
      this.friends = this.datosList.friends.summary.total_count;
      this.likes = this.datosList.likes.data.length;
      this.posts = this.datosList.posts.data.length;
      });
    });

  }

  ngOnInit(): void{

  }


}

