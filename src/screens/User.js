import { useEffect, useState, useCallback, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text, Dimensions } from "react-native";
import AzeretText from "../components/FredokaText";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Title from "../components/Title";
import NavLink from "../components/NavLink";
import UserContainer from "../components/UserContainer";
import { TRIADIC, COMPLEMENTARY, ANALOGOUS1, ANALOGOUS2, ACCENT, OFFWHITE, PRIMARY } from "../components/config.js";
import { useAuth, signOut } from "../contexts/Auth";
import Tile from "../components/Tile";
import { host } from "../config/host";
import { View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";

const User = ({ navigation }) => {
    const screenWidth = Dimensions.get("window").width;
    const isFocused = useIsFocused();
    const { authData, signOut } = useAuth();
    const [nbQuestionAnswered, setNbQuestionAnswered] = useState(null);
    const [tileNbQuestionAnswered, setTileNbQuestionAnswered] = useState(null);
    const [results, setResults] = useState(null);
    const [progressData, setProgressData] = useState(null);

    const data = {
        labels: ["Cyber", "Software", "Data"],
        data: [0.6, 0.9, 0.2]
    };
    const chartConfig = {
        backgroundGradientFrom: PRIMARY,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: PRIMARY,
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(255, 199, 150, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        propsForLabels: {
            fontSize: "6",
        }
    };

    useEffect(() => {
        async function getResults() {
            try {
                await fetch(`http://${host}:3000/users/${authData.id}/results`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        if (json === null || typeof (json) == undefined || json.length == 0) {
                            authData.results = null;
                        } else {
                            const _results = json[0];
                            const _label = []
                            const _data = []
                            _results.forEach(r => {
                                _label.push(r.category)
                                _data.push(r.results / 100)
                            });
                            console.log(_label);
                            const _progress = {
                                labels: _label,
                                data: _data,
                                colors: [
                                    "#FFC759",
                                    "#F8B77E",
                                    "#ECA669",
                                    "#D8B79B"
                                ],
                            }
                            setResults(_results);
                            setProgressData(_progress);
                            console.log(_results);
                        }
                    })
            } catch (e) {
                console.warn(e);
            }
        }
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
                            // console.log(json);
                            // console.log(json[0][0].n)
                            // console.log('nb questions answered');
                            const nbQuestionAnswered = json[0][0].n;
                            authData.nbQuestionAnswered = json;

                            setNbQuestionAnswered(nbQuestionAnswered);
                            const s = nbQuestionAnswered === null || nbQuestionAnswered == 0 ? " Vous n'avez répondu à aucune question, Commencez votre quizz !"
                                : nbQuestionAnswered < 25 ? `${nbQuestionAnswered} questions répondues, encore ${25 - nbQuestionAnswered} pour avoir une idée de ce qui te correspond`
                                    : `${nbQuestionAnswered} questions répondues, le graphique en dessous te donne une idée des majeures qui te correspondent le plus `;
                            setTileNbQuestionAnswered(s);
                        }
                    });
            } catch (e) {
                console.warn(e);
            }
        }
        prepare();
        getResults();
        const r = "Voici votre graphe de tendance";


        if (tileNbQuestionAnswered != null) {
            console.log('IM IN');
            CreateTile(tileNbQuestionAnswered);
        }
        console.log(tileNbQuestionAnswered);
        return () => {

        }
    }, [isFocused])

    const CreateTile = (props) => {
        if (props == null || typeof (props) == undefined) return null
        else return (
            <Tile bgColor={props.bgColor}>
                <AzeretText textColor={props.textColor}>{props.data}</AzeretText>
            </Tile>
        )

    }

    if (nbQuestionAnswered < 25 || progressData == null) {
        return (<UserContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 0 }}>
                {"Bonjour " + authData.firstname}
            </Title>
            <CreateTile data={tileNbQuestionAnswered} textColor={OFFWHITE}></CreateTile>

            {/* <CreateTile bgColor={ANALOGOUS2} data={"Example 1"}></CreateTile>
            <CreateTile bgColor={ACCENT} data={"Example 2"}></CreateTile>
            <CreateTile bgColor={TRIADIC} data={"Example 3"}></CreateTile> */}

        </UserContainer >
        )
    }

    return (
        <UserContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 0 }}>
                {"Bonjour " + authData.firstname}
            </Title>
            <CreateTile data={tileNbQuestionAnswered} textColor={OFFWHITE}></CreateTile>
            <ProgressChart
                data={progressData}
                width={screenWidth * 0.9}
                height={220}
                strokeWidth={16}
                radius={32}
                withCustomBarColorFromData={true}
                chartConfig={chartConfig}
                style={{
                    marginTop: 10,
                    borderRadius: 16
                }}
                hideLegend={false}
            >

            </ProgressChart>
            {/* <CreateTile bgColor={ANALOGOUS2} data={"Example 1"}></CreateTile>
            <CreateTile bgColor={ACCENT} data={"Example 2"}></CreateTile>
            <CreateTile bgColor={TRIADIC} data={"Example 3"}></CreateTile> */}

        </UserContainer >
    )
}

export default User;