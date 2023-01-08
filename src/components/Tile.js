import { View } from "react-native";
import styled from "styled-components/native";
import { PRIMARY, ANALOGOUS1, COMPLEMENTARY, ANALOGOUS2 } from "./config.js";
import { useState } from "react";


const TileContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  padding: 15px 25px;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flexDirection: column;
  justifyContent: space-between;

`;

const TileText = styled.Text`
  color: white;
  display: flex;
  font-family: "AzeretMono";
  font-size: 16px;
`;


const Tile = ({ content, children, bgColor = PRIMARY, additionnalStyle, TouchEvent }) => {
  const [isActive, setIsActive] = useState(false);
  const showTileContent = () => {
    setIsActive(current => !current);
  }

  return (
    <View style={{ height: isActive ? `75%` : `20%`, width: `95%`, marginTop: 10 }} onTouchEnd={showTileContent}>
      <TileContainer bgColor={bgColor}>
        {children}
      </TileContainer>
    </View>
  );
};

export default Tile;