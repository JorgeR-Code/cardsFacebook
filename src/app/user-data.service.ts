import { Injectable } from '@angular/core';



declare var FB: any;


@Injectable({
  providedIn: 'root'
})


export class UserDataService {



  datosList: any = [];

  public obtenerDatos(){
            FB.api(
              '/me',
              'GET',
              {"fields":"id,name,likes,posts,friends"},(responseA:any)=>{
                this.datosList = responseA;
                return this.datosList;

              }
            );
  }

  constructor() {



  }


}
