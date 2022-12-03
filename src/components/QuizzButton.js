import styled from "styled-components/native";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { PRIMARY, ANALOGOUS1, ACCENT, STYLE, } from "./config.js";

const ButtonContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-family: "AzeretMono";
  font-size: 16px;
`;

const Emoji = styled.Image`
width: 100%;
`;

const styles = StyleSheet.create({
    ...STYLE,
});

const QuizzButton = ({
    children,
    handlePress,
    img,
    bgColor = PRIMARY,
    additionnalStyle,
}) => {
    return (
        <View style={additionnalStyle}>
            <TouchableOpacity onPress={handlePress}>
                <ButtonContainer >
                    <Image style={styles.smallIcon} source={img} />
                </ButtonContainer>
            </TouchableOpacity>
        </View>
    );
};



export default QuizzButton;