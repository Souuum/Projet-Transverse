import styled from "styled-components/native";
import { PRIMARY, ANALOGOUS1, ANALOGOUS2 } from "./config.js";

const NavLinkContainer = styled.Text`
  color: ${PRIMARY};
  font-family: "AzeretMono";
  font-size: 16px;
`;
const NavLink = ({ children, handlePress }) => {
  return <NavLinkContainer onPress={handlePress}>{children}</NavLinkContainer>;
};

export default NavLink;
