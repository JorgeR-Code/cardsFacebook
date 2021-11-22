import { Component, OnInit, NgZone } from '@angular/core';
import { UserDataService } from './user-data.service';


declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'cardsFacebook';
  datosList: any = [];
  friends: number = 0;
  likes: number = 0;
  posts: number = 0;
  comments: number = 10;
  token: any;
  loged: boolean = false;



  constructor(private zone: NgZone, public _datosService: UserDataService){


    _datosService.datosList1.subscribe(d => {
      this.zone.run(() => {
      this.datosList = d;
      this.friends = this.datosList.friends.summary.total_count;
      this.likes = this.datosList.likes.data.length;
      this.posts = this.datosList.posts.data.length;
      console.log(this.friends);

      });
    });

  }








login() {
    FB.login((response:any) =>{
        this.loged = true;
        this.token = response;
    }, {});
}
me() {

      FB.api(
            '/me',
            'GET',
            {"fields":"id,name,likes,posts,friends"},(responseA: any) => {
              this.datosList = responseA;
              this.friends = this.datosList.friends.summary.total_count;
              this.likes = this.datosList.likes.data.length;
              this.posts = this.datosList.posts.data.length;
              console.log(this.friends);

            }
          );
}
    ngOnInit(): void{

    }


}

