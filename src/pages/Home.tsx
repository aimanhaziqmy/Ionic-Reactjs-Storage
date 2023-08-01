import React, { useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { useStorage } from "../hooks/useStorage";
import {checkmarkDoneOutline, arrowUndoOutline, trashOutline} from 'ionicons/icons';

const Home: React.FC = () => {
  const { todos, addTodo, updateTodoStatus, removeTodo } = useStorage();
  const [ task, setTask] = useState('');
  const ionList = useRef(null as any);
  
  const createTodo = async () => {
    await addTodo(task);
    setTask('');
  }

  const updateStatus = async(id: string, status: number) => {
    await updateTodoStatus(id, status);
    ionList.current.closeSlidingItems();
  }

  const deleteTodo = async(id: string) => {
    await removeTodo(id);
    ionList.current.closeSlidingItems();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonInput value={task} onIonChange={(e) => setTask(e.detail.value!)} placeholder="Anything ?"> </IonInput>
          <IonButton slot="end" onClick={() => createTodo()} fill="clear">Add</IonButton>
        </IonItem>
        
        <IonList ref={ionList}>
          {todos.map((todo, key) => (
            <IonItemSliding key={key}>
              <IonItem className={todo.status === 1 ? 'done':''}>
                <IonLabel>{todo.task} <p>{todo.status}</p></IonLabel>
              </IonItem>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption color="secondary" onClick={() => updateStatus(todo.id, 0)}>
                  <IonIcon icon={arrowUndoOutline} />
                </IonItemOption>
                <IonItemOption color="secondary" onClick={() => updateStatus(todo.id, 1)}>
                  <IonIcon icon={checkmarkDoneOutline} />
                </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
