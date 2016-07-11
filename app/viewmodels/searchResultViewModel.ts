import { ItemViewModel } from '../viewmodels/itemViewModel'
import { Hero } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'

export class SearchResultViewModel {
    constructor(public item: ItemViewModel, public hero: Hero, public type: string){
    }
}