export class ItemAttribute {
    constructor(public rawAttribute: string, public attribute: string){

    }
}

export class ProfileItem {
    constructor(public name: string, public slot: string){
    }
}

export class SlotItem {
    constructor(public slotValue: string, public slotName: string){
        
    }
}