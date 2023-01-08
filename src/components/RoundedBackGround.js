import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { PRIMARY, ANALOGOUS1, } from "./config.js";

const RoundedContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  position: absolute;
  top: 300px;
  align-items:center;
  width: 150%;
  height: 150%;
  padding: 5px;
  margin-top : 30%;
  border-radius: 999px
`;

const RoundedBackGround = ({
    bgColor,
}) => {
    return (
        <View style={{ height: `75%`, width: `75%`, position: 'absolute', alignItems: 'center' }}>
            <RoundedContainer bgColor={bgColor}></RoundedContainer>
        </View>
    )
}

export default RoundedBackGround;