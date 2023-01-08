import styled from "styled-components/native";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { PRIMARY, ANALOGOUS1, OFFWHITE, ACCENT, STYLE, } from "./config.js";


const Container = styled.View`
  background-color: ${(props) => props.bgColor};
  width: 80%;
  padding: 5px;
  margin-top : 10%;
  border-radius: 20px;
  display : flex;
  flexDirection : row;
  align-items: center;
  justify-content: space-evenly;
`;

const QuizzButtonStackBar = ({
    children,
    additionnalStyle,
    bgColor = OFFWHITE }) => {
    return (
        <View>
            <Container bgColor={bgColor}>
                {children}
            </Container>
        </View>
    )

}

export default QuizzButtonStackBar;