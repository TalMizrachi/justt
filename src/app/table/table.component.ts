import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from '../models/Character';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  charcters: Character[] = []
  searchText: string
  tableHeaders: any[] = [
    { name: 'Id', propName: 'id' },
    { name: 'Name', propName: 'name' },
    { name: 'Status', propName: 'status' },
    { name: 'Gender', propName: 'gender' },
    { name: 'Species', propName: 'species' },
    { name: 'Episodes #', propName: 'episodes' },
    { name: 'Type', propName: 'type' },
  ]

  isSearchRoute: boolean
  placeHolderText: string
  searchResult:Character | null
  constructor(private charactersService: CharactersService, private activatedRoute: ActivatedRoute) {

    this.subscriptions.push(this.activatedRoute.data.subscribe(
      res => {
        this.isSearchRoute = res.isSearch
        this.setPlaceHolder()
      }
    ))

  }


  ngOnInit(): void {
    if (!this.isSearchRoute) {
      this.charactersService.getCharctersByPage(1)
      this.subscriptions.push(this.charactersService.charctersByPage$.subscribe(res => {
        this.charcters = res
      }))
    }
  }

  setPlaceHolder(): string {
    switch (this.isSearchRoute) {
      case true:
        this.placeHolderText = 'Search for character id '
        break;
      case false || undefined:
        this.placeHolderText = 'Browse for characters... '

        break;
    }
    return this.placeHolderText
  }

  searchById(id:string){
    this.subscriptions.push(this.charactersService.getCharcterById(id).subscribe(res=>{
      this.searchResult=res
    }))
  }

  sort(col) {
    col.isActive= !col.isActive
    this.charcters.sort((a, b) => this.compare(a[col.propName],b[col.propName],col.isActive))
}

 compare(a :number | string , b:number |string, isAsc:boolean){
   return (a<b?-1:1) * (isAsc ? 1 :-1)
 }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
