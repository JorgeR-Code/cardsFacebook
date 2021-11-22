import { EventEmitter, Injectable } from '@angular/core';



declare var FB: any;


@Injectable({
  providedIn: 'root'
})


export class UserDataService {





  datosList1 = datosList;

  constructor() {

    (window as any).fbAsyncInit = function() {

      FB.init({
        appId      : '666709170961617',
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
      FB.AppEvents.logPageView();

      FB.getLoginStatus((response: any) => {

          if (response.status === 'connected'){
            // setInterval(()=>{
            FB.api(
              '/me',
              'GET',
              {"fields":"id,name,likes,posts,friends"},(responseA: any):void =>{

                    pasaDatos(responseA);

              }
            );

          // },5000);
          } else {

            FB.login(() =>{
              FB.api(
                '/me',
                'GET',
                {"fields":"id,name,likes,posts,friends"},(responseA: any):void =>{

                  pasaDatos(responseA);

                }
              );
            });
            console.log('no connected');
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



}


const datosList= new EventEmitter<number>();

function pasaDatos (responseA: any){

  datosList.emit(responseA);
}


