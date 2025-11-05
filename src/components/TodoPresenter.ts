import { IToDoModel } from "../types";
import { IItemView, IViewItemConstructor } from "../components/Item";
import { IForm, IFormConstructor } from "../components/Form"
import { IPage } from "./Page";
import { IPopup } from "../components/Popup"

export class ItemPresenter {
    protected itemTemplate: HTMLTemplateElement;
    protected formTemplate: HTMLTemplateElement;
    protected todoForm: IForm;
    protected todoEditForm: IForm;

    constructor(
        protected model: IToDoModel,
        protected formConstructor: IFormConstructor,
        protected viewPageContainer: IPage,
        protected viewItemConstructor: IViewItemConstructor,
        protected modal: IPopup
    ) {
        this.itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement;
        this.formTemplate = document.querySelector('#todo-form-template') as HTMLTemplateElement;
    }

    init(){
      this.todoForm = new this.formConstructor(this.formTemplate);
      this.todoForm.setHandler(this.handleSubmitForm.bind(this));
      this.todoForm.buttonText = 'Добавить';
      this.todoForm.placeHolder = 'Следущее дело';
      this.viewPageContainer.formContainer = this.todoForm.render();
      this.todoEditForm = new this.formConstructor(this.formTemplate);
      this.todoEditForm.buttonText = 'Изменить';
      this.todoEditForm.placeHolder = 'Новое задание';
    }

    handleSubmitEditForm(data: string, id: string) {
        this.model.editItem(id, data);
        this.renderView();
        this.todoEditForm.clearValue();
        this.modal.close();
    }

    handleEditItem(item: IItemView) {
        const editItem = this.model.getItem(item.id);
        this.todoEditForm.setValue(editItem.name);
        this.modal.content = this.todoEditForm.render();
        this.todoEditForm.setHandler((data: string) => this.handleSubmitEditForm(data, item.id));
        this.modal.open();
    }

    handleCopyItem(item: IItemView) {
        const copyItem = this.model.getItem(item.id)
        this.model.addItem(copyItem.name);
        this.renderView()
        }

    handleDeleteItem(item: IItemView) {
        this.model.removeItem(item.id);
        this.renderView();
    }
    

    handleSubmitForm(data: string) {
        this.model.addItem(data);
        this.renderView();
        this.todoForm.clearValue();
    }

    renderView() {
        const itemList = this.model.items.map((item) => {
            const todoItem = new this.viewItemConstructor(this.itemTemplate);
            todoItem.setCopyHandler(this.handleCopyItem.bind(this))
            todoItem.setDeleteHandler(this.handleDeleteItem.bind(this))
            todoItem.setEditHandler(this.handleEditItem.bind(this))
            const itemElement = todoItem.render(item);
            return itemElement;
        }).reverse();

        this.viewPageContainer.todoContainer = itemList;
    }

}