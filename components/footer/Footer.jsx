import { Text, TouchableOpacity, View } from "react-native";
import Style from "./Footer.style";

const Footer = ({ selectedTabName, handleTabName, todoList }) => {
  const countByStatus = todoList.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.done++ : acc.inprogress++;
      return acc;
    },
    { all: todoList.length, inprogress: 0, done: 0 }
  );

  const getTextColor = (tabName, handleDeleteTodo) => {
    return {
      fontWeight: "bold",
      color: tabName === selectedTabName ? "#2f76e5" : "#000",
    };
  };
  return (
    <View style={Style.footer}>
      <TouchableOpacity onPress={() => handleTabName("all")}>
        <Text style={getTextColor("all")}>All({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabName("inprogress")}>
        <Text style={getTextColor("inprogress")}>
          In Progress({countByStatus.inprogress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabName("done")}>
        <Text style={getTextColor("done")}>Done({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
