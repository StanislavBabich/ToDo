export interface IForm {
  buttonText: string;
  placeHolder: string;
  // более точная сигнатура для обработчика (рекомендую заменить в проекте)
  setHandler(handleFormSubmit: (value: string) => void): void;
  render(): HTMLElement;
  setValue(data: string): void;
  getValue(): string;
  clearValue(): void;
}

export interface IFormConstructor {
  new(formTemplate: HTMLTemplateElement): IForm;
}

export class Form implements IForm {
  protected formElement: HTMLFormElement;
  protected inputField: HTMLInputElement;
  protected handleFormSubmit?: (value: string) => void;
  protected submitButton: HTMLButtonElement;

  constructor(formTemplate: HTMLTemplateElement) {
    this.formElement = formTemplate.content.querySelector('.todos__form')!.cloneNode(true) as HTMLFormElement;
    this.inputField = this.formElement.querySelector('.todo-form__input') as HTMLInputElement;
    this.submitButton = this.formElement.querySelector('.todo-form__submit-btn') as HTMLButtonElement;

    // сброс/инициализация состояния кнопки
    this.updateButtonState();

    // обновляем состояние кнопки при вводе
    this.inputField.addEventListener('input', () => this.updateButtonState());

    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const value = this.inputField.value.trim();
      // если поле пустое — ничего не делаем
      if (!value) return;
      // если обработчик не установлен — тоже ничего не делаем
      if (typeof this.handleFormSubmit !== 'function') return;
      this.handleFormSubmit(value);
    });
  }

  setHandler(handleFormSubmit: (value: string) => void) {
    this.handleFormSubmit = handleFormSubmit;
  }

  render() {
    return this.formElement;
  }

  setValue(data: string) {
    this.inputField.value = data;
    this.updateButtonState();
  }

  getValue() {
    return this.inputField.value;
  }

  clearValue() {
    this.formElement.reset();
    this.updateButtonState();
  }

  set buttonText(data: string) {
    this.submitButton.textContent = data;
  }

  set placeHolder(data: string) {
    this.inputField.placeholder = data;
  }

  protected updateButtonState() {
    const isEmpty = this.inputField.value.trim() === '';
    this.submitButton.disabled = isEmpty;
  }
}
