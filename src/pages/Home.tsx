import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { useStorage } from "../hooks/useStorage";

const Home: React.FC = () => {
  const { todos } = useStorage();
  const [ task, setTask] = useState('');
  
  const createTodo = async () => {
    setTask('');
  }

  const updateStatus = async(id: string, status: boolean) => {
    console.log(id, status);
  }

  const deleteTodo = async(id: string) => {
    console.log(id);
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
          <IonInput  placeholder="Anything ?"> </IonInput>
          <IonButton slot="end" onClick={() => createTodo()} fill="clear">Add</IonButton>
        </IonItem>
        
        <IonList>
          {todos.map((todo, key) => (
            <p key={key}>hi</p>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
