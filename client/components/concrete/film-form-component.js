class TodoFormComponent {
    htmlElement;
  
    constructor({ onSubmit }) {
      this.htmlElement = document.createElement('form');
      this.htmlElement.className = 'todo-form shadow p-4'
      this.htmlElement.innerHTML = `
      <h2 class="h2 text-center mb-4 fw-normal">Pridėk filmą!</h2>
      <div class="mb-3">
        <label for="todo-title" class="form-label">Filmas</label>
        <input type="text" class="form-control" id="todo-title" name="title">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="todo-done" name="done">
        <label class="form-check-label" for="todo-done">Pažiūrėtas :)</label>
      </div>
      <button type="submit" class="btn btn-primary w-80">Pridėti</button>`;
  
      this.htmlElement.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const done = formData.get('done') === 'on';

        onSubmit({ title, done });
        event.target.reset();
      });
    }
  }
  
  export default TodoFormComponent;