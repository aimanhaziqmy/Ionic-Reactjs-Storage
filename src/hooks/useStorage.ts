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
            setTodos(storedTodos);
        }
        initStorage();
    },[])

    return {
        todos
    }
}