import "./styles/styles.css";
import { todos } from "../src/utils/constants";
import { Item } from "../src/components/Item";
import { Form } from "../src/components/Form";
import { ToDoModel } from "../src/components/ToDoModel";
import { Page } from "../src/components/Page";
import { ItemPresenter } from "../src/components/TodoPresenter"
import { Popup } from "./components/Popup";

const contentElement = document.querySelector(".content") as HTMLElement;

const popupElement = document.querySelector('.popup') as HTMLElement;

const itemContainer = new Page(contentElement);

const todoArray = new ToDoModel();
todoArray.items = todos;

const modal = new Popup(popupElement)

const itemPresenter = new ItemPresenter(todoArray, Form, itemContainer, Item, modal);

itemPresenter.init();
itemPresenter.renderView(); 
