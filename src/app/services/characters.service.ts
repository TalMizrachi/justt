import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Character, Characters } from '../models/Character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  charctersByPage$:BehaviorSubject<Character[]>
  constructor(private http:HttpClient) {
    this.charctersByPage$= new BehaviorSubject<Character[]>([])
  }

  getCharctersByPage(page :number){
    let params = new HttpParams().set("page",page.toString())
    return this.http.get<Characters[]>(environment.BASE_URL+"/character",{params:params}).pipe(
      map((res:any)=>res.results)
    ).subscribe(res=>{
      this.charctersByPage$.next(res)
    })
  }

  getCharcterById(id :string){
    return this.http.get<Character>(environment.BASE_URL+"/character/"+id)
  }
}
