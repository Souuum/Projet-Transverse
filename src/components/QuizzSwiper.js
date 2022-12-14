import { View, Text } from "react-native";
import styled from "styled-components/native";
import { PRIMARY, ANALOGOUS1, COMPLEMENTARY, ANALOGOUS2, TRIADIC, OFFWHITE } from "./config.js";
import { useState } from "react";
import Swiper from "react-native-deck-swiper";
import FredokaText from "./FredokaText.js";
import { forwardRef } from "react";
import { refresh } from "../screens/Quizz.js";


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
                onSwipedAll={() => { onSwiped() }}
                zIndex={1}
            />
        </SwipeContainer>

    )
});

export default QuizzSwiper;
