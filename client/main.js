import ApiService from './api-service.js';
import TodoTableComponent from './components/concrete/film-table-component.js';
import ContainerComponent from './components/wrappers/container-component.js';
import HeaderComponent from './components/concrete/header-component.js';
import TodoFormComponent from './components/concrete/film-form-component.js';
import FlexComponent from './components/wrappers/flex-component.js';

const rootHtmlElement = document.querySelector('#root');

if (rootHtmlElement === null) throw new Error('Error: #root element  was not found in HTML file.');

let todoTableComponent;
let todoFormComponent;

const onCreateTodo = async ({ title, done }) => {
    try {
      await ApiService.createTodo({ title, done });
    } catch (error) {
      alert(error);
    } finally {
      const todos = await ApiService.getTodos();
      todoTableComponent.renderTodos(todos);
    }
  }

const onDeleteTodo = async ({ id, title }) => {
  try {
    await ApiService.deleteTodo({ id, title });
  } catch (error) {
    alert(error);
  } finally {
    const todos = await ApiService.getTodos();
    todoTableComponent.renderTodos(todos);
  }
}


ApiService.getTodos()
  .then((todos) => {
    todoTableComponent = new TodoTableComponent({ todos, onDeleteTodo });
    const headerComponent = new HeaderComponent({
      text: 'Filmų sąrašas',
      className: 'text-center my-4 fw-bold',
    });
    todoFormComponent = new TodoFormComponent({ onSubmit: onCreateTodo });
    const flexComponent = new FlexComponent({
      children: [
        todoTableComponent.htmlElement,
        todoFormComponent.htmlElement,
      ]
    });

    const container = new ContainerComponent({
      children: [
        headerComponent.htmlElement,
        flexComponent.htmlElement,
      ],
    });

    rootHtmlElement.append(
      container.htmlElement,
    );
  })
  .catch((err) => {
    console.error(err);
  });