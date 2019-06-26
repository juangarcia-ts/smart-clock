import styled from "styled-components";
import { View } from "react-native";
import { Content, Header, Button, Text, Fab } from "native-base";

export const CustomHeader = styled(Header).attrs({
  noLeft: true,
  iosBarStyle: "light-content",
  androidStatusBarColor: "#000"
})`
  align-items: center;
  background-color: #000;
`;

export const CustomContent = styled(View)`
  flex: 1;
`;

export const LoadingText = styled(Text)`
  text-align: center;
  margin: 20px 0 10px;
`;

export const BluetoothButton = styled(Button).attrs({
  block: true
})`
  background-color: ${props => (props.isEnabled ? "red" : "green")};
`;

export const AlarmCreateButton = styled(Fab).attrs({
  position: "bottomRight"
})`
  background-color: #5067ff;
`;
