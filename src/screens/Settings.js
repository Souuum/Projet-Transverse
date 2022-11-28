import { useState, useCallback, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text } from "react-native";
import FredokaText from "../components/FredokaText";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Title from "../components/Title";
import NavLink from "../components/NavLink";
import SafeContainer from "../components/SafeContainer";
import { ANALOGOUS2, STYLE } from "../components/config.js";
import { useAuth, signOut } from "../contexts/Auth";
import { View } from "react-native";

const Settings = ({ navigation }) => {

    const { signOut } = useAuth();

    const handleSignout = useCallback(async () => {
        signOut();
    }, []);

    return (
        <SafeContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 30 }}>
                {"Setting"}
            </Title>
            <Button bgColor={ANALOGOUS2} handlePress={() => handleSignout()}>{""}</Button>


        </SafeContainer>
    )
}

export default Settings;