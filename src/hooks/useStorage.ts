import { useEffect, useState } from "react";
import { Storage, Drivers } from '@ionic/storage'
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
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
                name:"__appdb",
                driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
            });
            await newStore.defineDriver(CordovaSQLiteDriver);
    
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
        const toUpdate = [...todos];
        const todoToUpdate = toUpdate.filter(todo => todo.id === id)[0];
        todoToUpdate.status = status;
        setTodos(toUpdate);
        return store?.set(TODOS_KEY, toUpdate);
    }

    const removeTodo = async(id: string) => {
        const toUpdate = todos.filter(todo => todo.id !== id);
        setTodos(toUpdate);
        return store?.set(TODOS_KEY, toUpdate);
    }
    return {
        addTodo,
        todos,
        updateTodoStatus,
        removeTodo
    }
}