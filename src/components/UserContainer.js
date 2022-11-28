import styled from "styled-components/native";
import { Platform } from "react-native";
const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
  background-color: #ffffff;
  marginLeft: 10;
`;
const SafeContainer = ({ children }) => {
    return (
        <Container style={{ paddingTop: Platform.OS === "android" ? 25 : 0 }}>
            {children}
        </Container>
    );
};

export default SafeContainer;