
import React, { useCallback, useEffect, useState, useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../stacks/AuthStack";
import AppStack from "../stacks/AppStack";

import UserAuthContext from "../contexts/Auth";

import * as SplashScreen from "expo-splash-screen";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import { AzeretMono_300Light } from "@expo-google-fonts/azeret-mono";
import * as Font from "expo-font";

const Router = () => {
    const { authData } = useContext(UserAuthContext);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    Roboto: Roboto_400Regular,
                    FredokaOne: FredokaOne_400Regular,
                    AzeretMono: AzeretMono_300Light
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            {(authData) ?
                (
                    <AppStack />
                ) : (
                    <AuthStack />
                )}
        </NavigationContainer>
    );
};

export default Router;