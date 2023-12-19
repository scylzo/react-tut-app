import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import Dialog from "react-native-dialog";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Style from "./App.style";
import TodoCard from "./components/todoCard/TodoCard";
import { Alert, ScrollView, View } from "react-native";
import AddButton from "./components/addButton/AddButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstRender = true;
let isLoadUpdate = false;
export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [dialogText, setDialogText] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  const saveTodoList = async () => {
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (error) {
      alert("Erreur" + error);
    }
  };

  const loadTodoList = async () => {
    try {
      const result = await AsyncStorage.getItem("@todoList");
      if (result !== null) {
        isLoadUpdate = true;
        setTodoList(JSON.parse(result));
      }
    } catch (error) {
      alert("Erreur" + error);
    }
  };

  const handleTabName = (tabName) => {
    setSelectedTabName(tabName);
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: uuid(),
      isCompleted: false,
      title: dialogText,
    };

    setTodoList([newTodo, ...todoList]);
    setDialogVisible(false);
  };

  const handleFilterList = () => {
    switch (selectedTabName) {
      case "all": {
        return todoList;
      }
      case "inprogress": {
        return todoList.filter((todo) => todo.isCompleted === false);
      }
      case "done": {
        return todoList.filter((todo) => todo.isCompleted === true);
      }
    }
  };

  const handleDeleteTodo = (todo) => {
    Alert.alert("Suppression", "Voulez vous supprimer cette tâche ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((t) => t.id !== todo.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  };

  const handleCardStatus = (todo) => {
    const newTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const todoIndex = todoList.findIndex((todo) => todo.id === newTodo.id);
    const updatedTodoList = [...todoList];
    updatedTodoList[todoIndex] = newTodo;
    setTodoList(updatedTodoList);
  };

  const renderTodoList = () => {
    return handleFilterList().map((todo) => (
      <View style={Style.cardItem} key={todo.id}>
        <TodoCard
          handleDeleteTodo={handleDeleteTodo}
          todo={todo}
          handleCardStatus={handleCardStatus}
        />
      </View>
    ));
  };
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={Style.appContainer}>
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderTodoList()}
          </ScrollView>
          <AddButton showDialog={showDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <Footer
        selectedTabName={selectedTabName}
        handleTabName={handleTabName}
        todoList={todoList}
      />
      <Dialog.Container
        visible={dialogVisible}
        onBackdropPress={() => setDialogVisible(false)}
      >
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>
          Choisi un nom pour la nouvelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setDialogText} />
        <Dialog.Button
          label="Créer"
          onPress={handleAddTodo}
          disabled={dialogText.trim().length === 0}
        />
      </Dialog.Container>
    </>
  );
}
