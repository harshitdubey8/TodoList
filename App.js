import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Todo from "./Components/Todo";
import TodoModal from "./Components/TodoModal";
import axios from "./features/axios";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("/todos");
      setTodos(data);
    } catch (error) {
      Alert.alert("no Internet", error.response.data, [{ text: "Ok" }]);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const saveTodo = async () => {
    try {
      const { data } = await axios.post("/todos/add", { todo });
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error) {
      Alert.alert("Network Error!", error.response.data, [{ text: "OK" }]);
    }
    setTodo("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated
        translucent
        backgroundColor="rgba(0,0,0,0.1)"
        barStyle="light-content"
      />
      <TodoModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        todo={todo}
        setTodo={setTodo}
        saveTodo={saveTodo}
      />

      <View style={styles.headerStyle}>
        <Text style={styles.heading}>TodoList 🐤</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.heading}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.todos}
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Todo data={item} todoChangeHandler={setTodos} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerStyle: {
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    height: 70,
    backgroundColor: "#04d1ca",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    alignItems: "center",
    flexDirection: "row",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#fff",
  },
  todos: {
    width: "95%",
    marginVertical: 10,
  },
  addButton: {
    padding: 7,
  },
});
