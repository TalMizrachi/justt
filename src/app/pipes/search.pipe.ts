import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/Character';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(characters: Character[], searchText: string) {
    if(!searchText) return characters;
    return characters.filter(ch => ch.name.toLowerCase().indexOf(searchText) !== -1);
  }

}
