import { IItem } from "../types"

export interface IItemView {
  id: string;
  name: string;
  render(item: IItem): HTMLElement;
  setCopyHandler(handleCopyItem: (item: IItemView) => void): void;
  setDeleteHandler(handleDeleteItem: (item: IItemView) => void): void;
  setEditHandler(handleEditItem: (item: IItemView) => void): void;
}

export interface IViewItemConstructor {
  new (template: HTMLTemplateElement): IItemView
}

export class Item implements IItemView {
  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected _id: string = '';
  protected copyButton: HTMLButtonElement;
  protected deleteButton: HTMLButtonElement;
  protected editButton: HTMLButtonElement;
  protected handleCopyItem: (item: IItemView) => void = () => {};
  protected handleDeleteItem: (item: IItemView) => void = () => {};
  protected handleEditItem: (item: IItemView) => void = () => {};

  constructor(template: HTMLTemplateElement) {
    // non-null assertions использованы, предполагая, что шаблон корректен
    this.itemElement = template.content.querySelector('.todo-item')!.cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector('.todo-item__text') as HTMLElement;
    this.copyButton = this.itemElement.querySelector('.todo-item__copy') as HTMLButtonElement;
    this.deleteButton = this.itemElement.querySelector('.todo-item__del') as HTMLButtonElement;
    this.editButton = this.itemElement.querySelector('.todo-item__edit') as HTMLButtonElement;
  }

  set id(value: string) {
    this._id = value;
    this.itemElement.dataset.id = value;
  }

  get id(): string {
    return this._id || '';
  }

  set name(value: string) {
    this.title.textContent = value;
  }

  get name(): string {
    return this.title.textContent || '';
  }

  setCopyHandler(handleCopyItem: (item: IItemView) => void): void {
    this.handleCopyItem = handleCopyItem;
    this.copyButton.addEventListener('click', () => {
      this.handleCopyItem(this);
    });
  }

  setDeleteHandler(handleDeleteItem: (item: IItemView) => void): void {
    this.handleDeleteItem = handleDeleteItem;
    this.deleteButton.addEventListener('click', () => {
      this.handleDeleteItem(this);
    });
  }

  setEditHandler(handleEditItem: (item: IItemView) => void): void {
    this.handleEditItem = handleEditItem;
    this.editButton.addEventListener('click', () => {
      this.handleEditItem(this);
    });
  }

  render(item: IItem): HTMLElement {
    this.name = item.name;
    this.id = item.id;
    return this.itemElement;
  }
}
