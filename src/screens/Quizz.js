import { forwardRef, createRef, useRef, useEffect, useState, useCallback, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text } from "react-native";
import FredokaText from "../components/FredokaText";
import AzeretText from "../components/AzeretText";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Title from "../components/Title";
import NavLink from "../components/NavLink";
import SafeContainer from "../components/SafeContainer";
import { host } from "../config/host"
import { useAuth } from "../contexts/Auth";
// import QuizzSwiper from "../components/QuizzSwiper";
import Swiper from "react-native-deck-swiper";

import QuizzButtonStackBar from "../components/QuizzButtonStackBar";
import QuizzButton from "../components/QuizzButton";
import { COLD, GRINNING, HEARTEYES, VOMIT, PRIMARY, ANALOGOUS1, COMPLEMENTARY, ANALOGOUS2, TRIADIC, OFFWHITE } from "../components/config";
import RoundedBackGround from "../components/RoundedBackGround";
import Icon from "react-native-vector-icons/Ionicons";
import { swipedAll } from "../components/QuizzSwiper";


const CardContainer = styled.View`
background-color: ${(props) => props.bgColor};
padding: 15px 25px;
width: 80%;
height: 50%;
border-radius: 20px;
display: flex;
flexDirection: column;
justifyContent: space-between;

`;

const SwipeContainer = styled.View`
background-color: ${(props) => props.bgColor};
width: 82%;
height: 60%;
border-radius: 20px;
`;








const Quizz = ({ navigation }) => {

    const { authData } = useAuth();
    const [cards, setCards] = useState(null);

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
                setSwipedAll(swipedAll(swipeRef));
            });

        } catch (e) {
            console.warn(e);
        }
    }

    const [_refresh, setRefresh] = useState(false);
    const [_swipedAll, setSwipedAll] = useState(true);
    const [index, setIndex] = useState(0);



    useEffect(() => {

        prepare()
        console.log(cards);


        return () => {

        }
    }, [_refresh])


    useEffect(() => {
        console.log("refreshing...");
        prepare();

        return () => {

        }
    }, [_swipedAll]);

    if (!cards) {
        return null;
    }

    const Card = (props) => {
        // console.log(props.card);
        return (
            <CardContainer bgColor={PRIMARY}>
                <FredokaText textColor={OFFWHITE}>{props.card.description}</FredokaText>
            </CardContainer>)

    };




    const QuizzSwiper = forwardRef((data, ref) => {

        const _data = Object.keys(data.cards).map(key => ({ [key]: data.cards[key] }));
        // console.log(_data[0].cards);
        const [index, setIndex] = useState(0);
        const onSwiped = () => {
            setIndex(index + 1);
            console.log('swipped');
            console.log(index);
            console.log(ref.current.state);
        };


        return (
            <SwipeContainer>
                <Swiper
                    ref={ref}
                    backgroundColor={'transparent'}
                    cards={_data[0].cards}
                    cardIndex={index}
                    renderCard={(card) =>
                        <Card card={card}></Card>
                    }
                    infinite={false}
                    stackSize={3}
                    stackSeparation={14}
                    onSwiped={onSwiped}
                    onSwipedAll={() => { refresh() }}
                    zIndex={1}
                />
            </SwipeContainer>

        )
    });







    const CreateQuizzSwiper = forwardRef((cards, ref) => {

        if (cards == null || typeof (props) == undefined) {
            return null
        }
        else {
            return (
                <QuizzSwiper
                    ref={ref}
                    cards={cards}
                    onSwipedAllCards={() => { refresh() }}
                />
            )
        }
    });

    const swipeRef = createRef();

    const refresh = () => {
        console.log("refreshing...")
        prepare();
    }






    const buttonChoice = (value) => {
        console.log('prout');
        console.log(value)
        console.log(swipeRef.current.state.firstCardIndex);

        console.log(cards[swipeRef.current.state.firstCardIndex]);

        async function send(data) {
            try {
                const res = await fetch(`http://${host}:3000/users_questions_history/addrecord`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            } catch (e) {
                console.warn(e);
            }
        }
        if (cards[swipeRef.current.state.firstCardIndex]) {
            send({
                iduser: authData.id,
                idcard: cards[swipeRef.current.state.firstCardIndex].id,
                score: value
            });
            //Animation handling
            var swipei = Math.floor(Math.random() * 4);

            switch (swipei) {
                case 1:
                    swipeRef.current.swipeLeft();
                    break;
                case 2:
                    swipeRef.current.swipeRight();
                    break;
                case 3:
                    swipeRef.current.swipeTop();
                    break;
                default:
                    swipeRef.current.swipeBottom();
                    break;
            }
        }

    }

    return (
        <SafeContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 30 }}>
                {"Quizz"}
            </Title>

            <CreateQuizzSwiper
                ref={swipeRef}
                cards={cards}
            >
            </CreateQuizzSwiper>
            <QuizzButtonStackBar>
                <QuizzButton
                    img={VOMIT}
                    handlePress={() => { buttonChoice(0) }} />
                <QuizzButton
                    img={COLD}
                    handlePress={() => { buttonChoice(4) }} />
                <QuizzButton
                    img={GRINNING}
                    handlePress={() => { buttonChoice(8) }} />
                <QuizzButton
                    img={HEARTEYES}
                    handlePress={() => { buttonChoice(10) }} />
            </QuizzButtonStackBar>
        </SafeContainer>
    )
}

export default Quizz;
