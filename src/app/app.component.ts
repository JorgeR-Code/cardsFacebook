import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';


declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'cardsFacebook';
  datosList: any = [];
  friends: number = 0;
  likes: number = 0;
  posts: number = 0;
  token: any;
  loged: boolean = false;


  constructor(public _datosService: UserDataService){


  }

conectarServicio(){

  this.datosList = this._datosService.obtenerDatos();
  this.friends = this.datosList.friends.summary.total_count;
  this.likes = this.datosList.likes.data.length;
  this.posts = this.datosList.posts.data.length;
  console.log(this.datosList);

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
              console.log(this.posts);

            }
          );
}
    ngOnInit(): void{


      (window as any).fbAsyncInit = function() {

        FB.init({
          appId      : '666709170961617',
          cookie     : true,
          xfbml      : true,
          version    : 'v12.0'
        });
        FB.AppEvents.logPageView();

        FB.getLoginStatus((response: any) => {
          if (response.status === 'connected') {

            FB.api(
              '/me',
              'GET',
              {"fields":"id,name,likes,posts,friends"},(responseA: any) => {
                this.datosList = responseA;
                this.friends = this.datosList.friends.summary.total_count;
                this.likes = this.datosList.likes.data.length;
                this.posts = this.datosList.posts.data.length;
                console.log(this.posts);

              }
            );
            // this.conectarServicio();
            console.log('connected');

        } else {

          console.log('no connected');
          this.login();

        }

      });
      };

      (function(d, s, id){
        let js:any = null;
        let fjs:any = null;
        fjs = d.getElementsByTagName(s)[0];

         if (d.getElementById(id)) {return;}
         js = d.createElement(s) as HTMLScriptElement; js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    }



    //  public submitLogin(){

    //   FB.api(
    //     '/me',
    //     'GET',
    //     {"fields":"id,name,likes,posts,friends"},(responseA: any) => {
    //       this.datosList = responseA;
    //       this.friends = this.datosList.friends.summary.total_count;
    //       this.likes = this.datosList.likes.data.length;
    //       this.posts = this.datosList.posts.data.length;
    //       console.log(this.posts);

    //     }
    //   );
    //  }


}
