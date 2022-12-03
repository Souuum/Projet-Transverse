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
import { host } from "../config/host"
import { useAuth } from "../contexts/Auth";
import QuizzSwiper from "../components/QuizzSwiper";
import QuizzButtonStackBar from "../components/QuizzButtonStackBar";
import QuizzButton from "../components/QuizzButton";
import { COLD, GRINNING, HEARTEYES, VOMIT } from "../components/config";
import RoundedBackGround from "../components/RoundedBackGround";


const Quizz = ({ navigation }) => {
    const { authData } = useAuth();
    const [questions, setQuestions] = useState(null);
    const [cards, setCards] = useState(null);

    useEffect(() => {
        async function prepare() {
            try {
                const res = await fetch(`http://${host}:3000/users_questions_history/user/${authData.id}/not-answered`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json().then((json) => {
                    const _cards = json;
                    setCards(_cards[0]);
                    console.log(_cards[0]);
                });

            } catch (e) {
                console.warn(e);
            }
        }
        prepare()
        console.log(cards);


        return () => {

        }
    }, [])

    if (!cards) {
        return null;
    }

    const CreateQuizzSwiper = (cards) => {
        if (cards == null || typeof (props) == undefined) {
            return null
        }
        else {
            return (
                <QuizzSwiper
                    cards={cards}

                />
            )
        }
    }

    return (
        <SafeContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 30 }}>
                {"Quizz"}
            </Title>
            <CreateQuizzSwiper cards={cards}></CreateQuizzSwiper>
            <QuizzButtonStackBar>
                <QuizzButton img={VOMIT}></QuizzButton>
                <QuizzButton img={COLD}></QuizzButton>
                <QuizzButton img={GRINNING}></QuizzButton>
                <QuizzButton img={HEARTEYES}></QuizzButton>
            </QuizzButtonStackBar>
        </SafeContainer>
    )
}

export default Quizz;