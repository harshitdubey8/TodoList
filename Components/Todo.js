import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import axios from "../features/axios";
import TodoModal from "./TodoModal";

const Todo = ({ data, todoChangeHandler }) => {
  const [todo, setTodo] = useState(data.name);
  const [isModalVisible, setIsModalVisible] = useState("");

  const updateTodo = async () => {
    try {
      const {
        data: updatedTodo,
      } = await axios.patch(`/todos/update/${data._id}`, { todo });
      todoChangeHandler((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo._id === updatedTodo._id ? updatedTodo : prevTodo
        )
      );
    } catch (error) {
      Alert.alert("update Error", "sometjhing went wrong !", [{ text: "Ok" }]);
    }
    setIsModalVisible(false);
  };

  const deleteTodo = async () => {
    try {
      const deletedTodo = await axios.delete(`/todos/delete/${data._id}`);
      todoChangeHandler((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== deletedTodo.data._id)
      );
    } catch (error) {
      Alert.alert("Delete Error", "Something went Wrong!", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.todoTitle}>{data.name}</Text>
      <View
        style={{
          flex: 0.7,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          color="#04d1ca"
          title="Update"
          onPress={() => setIsModalVisible(true)}
        />
        <Button color="#dc3545" title="delete" onPress={deleteTodo} />
      </View>
      <TodoModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        todo={todo}
        setTodo={setTodo}
        saveTodo={updateTodo}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    height: 60,
    borderRadius: 25,
    alignItems: "center",
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    marginBottom: 18,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  todoTitle: {
    flex: 1,
  },
});
