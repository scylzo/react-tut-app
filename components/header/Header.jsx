import { Image, Text } from "react-native";
import logo from "../../assets/logo.png";
import Style from "./Header.style";
const Header = () => {
  return (
    <>
      <Image source={logo} style={Style.image} resizeMode="contain" />
      <Text style={Style.text}> Tu as probablement des trucs à faire</Text>
    </>
  );
};

export default Header;
