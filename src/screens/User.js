import { useEffect, useState, useCallback, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text } from "react-native";
import AzeretText from "../components/FredokaText";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Title from "../components/Title";
import NavLink from "../components/NavLink";
import UserContainer from "../components/UserContainer";
import { TRIADIC, COMPLEMENTARY, ANALOGOUS1, ANALOGOUS2 } from "../components/config.js";

import { useAuth, signOut } from "../contexts/Auth";
import Tile from "../components/Tile";
import { host } from "../config/host";
import { View } from "react-native";



const User = ({ navigation }) => {
    const { authData, signOut } = useAuth();

    const [nbQuestionAnswered, setNbQuestionAnswered] = useState(null);
    const [tileNbQuestionAnswered, setTileNbQuestionAnswered] = useState(null);


    useEffect(() => {
        async function prepare() {
            try {
                await fetch(`http://${host}:3000/users_questions_history/user/${authData.id}/count`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        if (json === null || typeof (json) == undefined || json.length == 0) {
                            authData.questionAnswered = null;
                        } else {
                            console.log(json);
                            console.log(json[0][0].n)
                            const nbQuestionAnswered = json[0][0].n;
                            authData.nbQuestionAnswered = json;

                            setNbQuestionAnswered(nbQuestionAnswered);
                            const s = nbQuestionAnswered === null || nbQuestionAnswered == 0 ? " Vous n'avez répondu à aucune question, Commencez votre quizz !"
                                : `${nbQuestionAnswered} questions répondues, encore ${25 - nbQuestionAnswered} pour avoir une idée de ce qui te correspond`;
                            setTileNbQuestionAnswered(s);
                        }
                    });
            } catch (e) {
                console.warn(e);
            }
        }
        prepare();

        if (tileNbQuestionAnswered != null) {
            CreateTile(tileNbQuestionAnswered);
        }
        console.log(tileNbQuestionAnswered);
        return () => {

        }
    }, [])

    const CreateTile = (props) => {
        if (props == null || typeof (props) == undefined) return null
        else return (
            <Tile bgColor={props.bgColor}>
                <AzeretText>{props.data}</AzeretText>
            </Tile>
        )

    }

    return (
        <UserContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 0 }}>
                {"Bonjour " + authData.firstname}
            </Title>
            <CreateTile data={tileNbQuestionAnswered}></CreateTile>
            <CreateTile bgColor={ANALOGOUS2} data={"test"}></CreateTile>
            <CreateTile bgColor={COMPLEMENTARY} data={"prout"}></CreateTile>
            <CreateTile bgColor={TRIADIC} data={"test"}></CreateTile>

        </UserContainer >
    )
}

export default User;