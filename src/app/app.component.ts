import { Component } from '@angular/core';
import { UserDataService } from './user-data.service';


declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cardsFacebook';
  public datosList: any = [];
  friends:number = 0;
  likes: number = 0;
  posts: number = 0;

    constructor(private RestService: UserDataService){

    }

    ngOnInit(): void{
      this.loadData();

      (window as any).fbAsyncInit = function() {
        FB.init({
          appId      : '666709170961617',
          cookie     : true,
          xfbml      : true,
          version    : 'v12.0'
        });
        FB.AppEvents.logPageView();
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
    submitLogin(){
      console.log("submit login to facebook");
      // FB.login();
      FB.login((response:any)=>
          {
            console.log('submitLogin',response);
            if (response.authResponse)
            {
              console.log('Ahuevoooooo');
            }
             else
             {
             console.log('User login failed');
           }
        });

    }
    public loadData(){
      this.RestService.get('https://graph.facebook.com/v12.0/me?fields=id%2Cfriends%2Clikes%2Cposts&access_token=EAAJeXlNNvNEBAMu691J1VzK8HCwfdiEn9nWxOW3Y7rFS9xeg3lb9vlKMsmxDAlF5QgoFJV42KQEZCCoyD53coNCWUZAoeUEPLRlZCAQnmYkvM2Vo5Ia0AvRUIc8vqZAw9pEdkf34vZBqP8b9b2LJpZAADeZAwSUH1NBnnVEnZAd6Hx6KXwqpG7l1HZCQwnkqdlBOOIrtPzwr18UDulWpZA0UT6Cd1PolZC5cZBQPQQY80159F8V237wgryKu')
      .subscribe(respuesta =>{
        this.datosList = respuesta;
        this.friends = this.datosList.friends.summary.total_count;
        this.likes = this.datosList.likes.data.length;
        this.posts = this.datosList.posts.data.length;
        console.log(this.datosList.posts.data.length);
      })
    }

}
