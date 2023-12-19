import { StyleSheet } from "react-native";

export default style = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  text: {
    fontWeight: "700",
  },
});
