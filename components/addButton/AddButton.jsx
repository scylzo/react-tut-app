import { TouchableOpacity } from "react-native";
import Style from "./AddButton.style";
import { Text } from "react-native";
const AddButton = ({ showDialog }) => {
  return (
    <TouchableOpacity style={Style.button} onPress={showDialog}>
      <Text style={Style.text}>+ New Todo</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
