import { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import check from "../../assets/check.png";
import Style from "./TodoCard.style";

const TodoCard = ({ todo, handleCardStatus, handleDeleteTodo }) => {
  return (
    <TouchableOpacity
      style={Style.card}
      onLongPress={() => handleDeleteTodo(todo)}
      onPress={() => handleCardStatus(todo)}
    >
      <Text
        style={[
          Style.text,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}{" "}
      </Text>
      {todo.isCompleted && <Image source={check} style={Style.check} />}
    </TouchableOpacity>
  );
};

export default TodoCard;
