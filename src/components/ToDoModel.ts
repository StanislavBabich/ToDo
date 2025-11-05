import { IItem, IToDoModel } from "../types";

export class ToDoModel implements IToDoModel {
    protected _items: IItem[]
    constructor () {
        this._items = [];
    }

    set items(data: IItem[]) {
        this._items = data;
    }
    
    get items() {
        return this._items
    }

    addItem (data: string) {
        const uniqueId: number = Math.max(...this._items.map(item => Number(item.id))) + 1;
        const newItem: IItem = {id: String(uniqueId),name: data};
        this._items.push(newItem)
        return newItem
    }

    removeItem (id: string) {
        this._items = this._items.filter(item => item.id !== id);

    }

    editItem(id: string, name: string) {
    const editedItem = this._items.find(item => item.id === id);
    if (!editedItem) return;
    editedItem.name = name;
  }

    getItem (id: string) {
        return this._items.find(item => item.id ===id)
    }
}