import { useEffect, useState, useCallback, useContext } from "react";
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
import { RED, ICON, STYLE } from "../components/config.js";
import { host } from "../config/host"
import { useAuth } from "../contexts/Auth";

const Quizz = ({ navigation }) => {
    const { authData } = useAuth();
    const [questions, setQuestion] = useState(null);

    useEffect(() => {
        async function prepare() {
            try {
                await fetch(`http://${host}:3000/users_questions_history/user/${authData.id}/not-answered`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        if (json === null || typeof (json) == undefined || json.length == 0) {
                            authData.questions = null;
                        } else {
                            console.log(json);
                            console.log(json[0])
                            authData.questions = json;
                        }
                    });
            } catch (e) {
                console.warn(e);
            }
        }
        prepare();

        return () => {

        }
    }, [])


    return (
        <SafeContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 30 }}>
                {"Quizz"}
            </Title>
        </SafeContainer>
    )
}

export default Quizz;