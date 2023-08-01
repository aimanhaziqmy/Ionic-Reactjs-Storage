import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage'

const TODOS_KEY = 'my-todos';

export interface TodoItem {
    task: string;
    created: number;
    status: number;
    id: string;
}

export function useStorage(){
    const [store, setStore] = useState<Storage>();
    const [todos, setTodos] = useState<TodoItem[]>([]);

    //create storage connection
    useEffect(()=> {
        const initStorage = async () => {
            const newStore = new Storage({
                name:"__appdb"
            });
            const store = await newStore.create();
            setStore(store);

            const storedTodos = await store.get(TODOS_KEY) || [];
            console.log('LOADED: ', storedTodos)
            setTodos(storedTodos);
        }
        initStorage();
    },[]);

    const addTodo = async (task: string) => {
        const newTodo = {
            task,
            created: new Date().getTime(),
            status: 0,
            id: new Date().getTime().toString()
        }

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos)
        console.log(todos);
        store?.set(TODOS_KEY, todos);
    }

    const updateTodoStatus = async(id: string, status: number) => {
        const todoToUpdate = todos.filter(todo => todo.id === id)[0];
        if(todoToUpdate){
            todoToUpdate.status = status;
            const idx = todos.indexOf(todoToUpdate);
            const updatedTodos = [...todos.slice(0, idx), todoToUpdate, ...todos.slice(idx+1)];
            setTodos(updatedTodos);
            store?.set(TODOS_KEY, updatedTodos);
        }
    }

    return {
        addTodo,
        todos
    }
}