import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import SPACING from "./src/config/SPACING";
import colors from "./src/config/colors";
import HomeScreen from "./src/screens/HomeScreen";
import MajeureScreen from "./src/screens/MajeureScreen";

import LoginScreen from "./src/screens/LoginScreen";
// import RegisterScreen from "./src/screens/RegisterScreen";

const App = () => {
  return (
    <View
      style={{
        paddingHorizontal: SPACING * 2,
        flex: 1,
        backgroundColor: colors.black,
      }}
    >
      {/* <HomeScreen /> */}

      <MajeureScreen />
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
