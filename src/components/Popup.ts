export interface IPopup {
  content: HTMLElement | null;
  open(): void;
  close(): void;
}

export class Popup implements IPopup {
  protected closeButton: HTMLButtonElement;
  protected _contentContainer: HTMLElement;

  constructor(protected container: HTMLElement) {
    const closeBtn = container.querySelector('.popup__close');
    const contentEl = container.querySelector('.popup__content');

    // проверки на null + уточнение типа
    if (!closeBtn || !(closeBtn instanceof HTMLButtonElement)) {
      throw new Error('Popup: button .popup__close not found or has wrong type');
    }
    if (!contentEl || !(contentEl instanceof HTMLElement)) {
      throw new Error('Popup: element .popup__content not found');
    }

    this.closeButton = closeBtn;
    this._contentContainer = contentEl;

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._contentContainer.addEventListener('click', (event: Event) => event.stopPropagation());
  }

  // геттер нужен, потому что интерфейс требует чтения свойства
  get content(): HTMLElement | null {
    // возвращаем первый дочерний элемент (если нужен другой семантический вариант — поменяйте)
    return (this._contentContainer.firstElementChild as HTMLElement) || null;
  }

  set content(value: HTMLElement | null) {
    if (value) {
      // вставляем переданный элемент
      this._contentContainer.replaceChildren(value);
    } else {
      // очищаем контейнер, если передан null
      this._contentContainer.innerHTML = '';
    }
  }

  open() {
    // название класса без точки
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
    this.content = null;
  }
}
