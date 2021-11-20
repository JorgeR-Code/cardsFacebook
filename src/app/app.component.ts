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
  likes: number = 0;
  posts: number = 0;

    constructor(private RestService: UserDataService){

    }

    ngOnInit(): void{
      this.loadData();

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
