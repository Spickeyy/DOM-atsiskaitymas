const formatError = (error) => {
    return error.message;
  }
   
  const ApiService = {
    async getTodos() {
      try {
        const response = await fetch('http://localhost:5000/items');
        const items = await response.json();
  
        return items;
      } catch (error) {
        throw formatError(error);
      }
    },

    async createTodo(todoData) {
      try {
        const response = await fetch(`http://localhost:5000/items`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todoData),
        });
  
        if (response.status === 404) {
          throw new Error(`Failed to Create new Todo`)
        }
  
      } catch (error) {
        throw formatError(error);
      }
    },
  
    async deleteTodo({ id, title }) {
      try {
        const response = await fetch(`http://localhost:5000/items/${id}`, {
          method: 'DELETE',
        });
        if (response.status === 404) {
          throw new Error(`Element "${title}" no longer exists.`)
        }
        const deletedItem = await response.json();
  
        return deletedItem;
      } catch (error) {
        throw formatError(error);
      }
    },
  };
  
  export default ApiService;