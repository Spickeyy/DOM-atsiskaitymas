class FilmsTableComponent {
    htmlElement;
    tbodyHtmlElement;
  
    onDeleteTodo;
  
    constructor({ todos, onDeleteTodo }) {
      this.htmlElement = document.createElement('table');
      this.htmlElement.className = 'table table-striped shadow';
      this.htmlElement.innerHTML = `
      <thead class="bg-dark text-white">
        <tr>
          <th>Id</th>
          <th>Filmo pavadinimas</th>
          <th>Pažiūrėtas?</th>
          <th>Pasirinkimai</th>
        </tr>
      </thead>
      <tbody></tbody>`;
      this.onDeleteTodo = onDeleteTodo;
      this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
      this.renderTodos(todos);
    }
  
    createRowHtmlElement = ({ id, title, done }) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${done ? 'Taip' : 'Ne'}</td>
        <td class="d-flex justify-content-end">
          <button class="btn btn-danger btn-sm">⌫</button>
        </td>`;
  
      const delButton = tr.querySelector('.btn-danger');
      delButton.addEventListener('click', () => this.onDeleteTodo({ id, title }));
  
      return tr;
    }
  
    renderTodos = (todos) => {
      this.tbodyHtmlElement.innerHTML = null;
      const rowsHtmlElements = todos.map(this.createRowHtmlElement);
      this.tbodyHtmlElement.append(...rowsHtmlElements);
    }
  }
  
  export default FilmsTableComponent;