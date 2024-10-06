import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [Name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/todos');
        setTodos(response.data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTodo) {
            await axios.put(`http://localhost:5000/todos/${editingTodo}`, { Name, description });
            setEditingTodo(null);
        } else {
            await axios.post('http://localhost:5000/todos', { Name, description });
        }
        setName('');
        setDescription('');
        fetchTodos();
    };

    const handleEdit = (todo) => {
        setName(todo.title);
        setDescription(todo.description);
        setEditingTodo(todo._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <h1>Logs</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={Name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    required 
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description" 
                    required 
                />
                <button type="submit">{editingTodo ? 'Update' : 'Add'} Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <h3>{todo.Name}</h3>
                        <p>{todo.description}</p>
                        <button onClick={() => handleEdit(todo)}>Edit</button>
                        <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
