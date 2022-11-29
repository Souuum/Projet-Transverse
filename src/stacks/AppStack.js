import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PRIMARY, COMPLEMENTARY, ANALOGOUS1, ANALOGOUS2, TRIADIC, ACCENT } from "../components/config.js";
import User from "../screens/User.js";
import Quizz from "../screens/Quizz.js";
import Setting from "../screens/Settings.js";


const Tab = createBottomTabNavigator();

const AppStack = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name == "User") {
                        iconName = "ios-person";
                    } else if (route.name === "Setting") {
                        iconName = "ios-settings";
                    } else if (route.name === "Quizz") {
                        iconName = "ios-school";
                    }

                    // Icon returned
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    height: 80,
                    marginHorizontal: 0,
                    marginBottom: 0,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderWidth: 0,
                    backgroundColor: PRIMARY,
                },
                tabBarActiveTintColor: ACCENT,
                tabBarInactiveTintColor: TRIADIC,
                headerShown: false,
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name={"User"} component={User} />
            <Tab.Screen name={"Quizz"} component={Quizz} />
            <Tab.Screen name={"Setting"} component={Setting} />

        </Tab.Navigator>
    );
};

export default AppStack;
