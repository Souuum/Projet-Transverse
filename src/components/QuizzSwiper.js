import { View, Text } from "react-native";
import styled from "styled-components/native";
import { PRIMARY, ANALOGOUS1, COMPLEMENTARY, ANALOGOUS2, TRIADIC } from "./config.js";
import { useState } from "react";
import Swiper from "react-native-deck-swiper";
import FredokaText from "./FredokaText.js";


const CardContainer = styled.View`
background-color: ${(props) => props.bgColor};
padding: 15px 25px;
width: 30%;
height: 60%;
border-radius: 20px;
display: flex;
flexDirection: column;
justifyContent: space-between;

`;



const Card = (props) => {
    console.log(props.card);
    return (
        <CardContainer bgColor={TRIADIC}>
            <FredokaText>{props.card.description}</FredokaText>
        </CardContainer>)

};

const QuizzSwiper = (data) => {
    const d = [{ "id": 3, "category": "Data", "description": "Les stats t'intéresse", "poids": 12 }, { "id": 1, "category": "Système embarqué", "description": "Tu aimes programmer sur des micros-controlleurs", "poids": 10 }, { "id": 2, "category": "IT", "description": "Tu t'intéresse au côté graphique des interfaces", "poids": 10 }];
    console.log(data.cards);
    const _data = Object.keys(data.cards).map(key => ({ [key]: data.cards[key] }));
    console.log(_data[0].cards);
    const [index, setIndex] = useState(0);
    const onSwiped = () => {
        setIndex(index + 1);
    };

    return (
        <Swiper
            cards={_data[0].cards}
            cardIndex={index}
            renderCard={(card) =>
                <Card card={card}></Card>
            }
            onSwiper={onSwiped}
        />
    )
}

export default QuizzSwiper;