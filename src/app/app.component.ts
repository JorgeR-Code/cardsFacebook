import { Component } from '@angular/core';
import { UserDataService } from './user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cardsFacebook';
  public datosList: any = [];
  friends:number = 0;

    constructor(private RestService: UserDataService){

    }

    ngOnInit(): void{
      this.loadData();

    }

    public loadData(){
      this.RestService.get('https://graph.facebook.com/v12.0/me?fields=id%2Cfriends%2Clikes&access_token=EAAJeXlNNvNEBAIEb8OV5YKQmA4ihzkm4vGr6VBGU0s5XjcEobnbWSDz5qpm8090ZAQFkEQGm9VHKeiJgp7KNXKx3WkInJWZAdvVwwncve5Cg81wdvmbgeuNqBkIqssUpU2ZA1YzvFRSG90GDU2P6hPuHK1TIyOcl0utRD3wZCwcEY8VdSUZBVWsuI2XpJAmkxxKrEZA8HzEAZDZD')
      .subscribe(respuesta =>{
        this.datosList = respuesta;
        this.friends = this.datosList.friends.summary.total_count;
        console.log(this.datosList.friends.summary.total_count);
      })
    }

}
