import styled from "styled-components";
import { View, TouchableWithoutFeedback } from "react-native";
import {
  Header,
  Content,
  Button,
  Text,
  Fab,
  List,
  ListItem
} from "native-base";

export const CustomList = styled(List)``;

export const Item = styled(ListItem)``;

export const CustomHeader = styled(Header).attrs({
  noLeft: true,
  iosBarStyle: "light-content",
  androidStatusBarColor: "#000"
})`
  align-items: center;
  background-color: #000;
`;

export const CustomContent = styled(Content).attrs({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "#212121"
  }
})``;

export const LoadingText = styled(Text)`
  text-align: center;
  margin: 20px 0 10px;
`;

export const ConnectionWrapper = styled(View)`
  position: absolute;
  top: 25px;
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

export const ConnectionStatus = styled(View)`
  border-radius: 50px;
  background-color: ${props => (props.isConnected ? "#006233" : "#bf0000")};
  height: 12px;
  width: 12px;
  margin-right: 10px;
`;

export const ConnectionButton = styled(TouchableWithoutFeedback)`
  align-self: center;
`;

export const ConnectionText = styled(Text)`
  font-size: 16px;
  color: #fff;
  opacity: 0.75;
  align-self: center;
`;

export const AlarmButton = styled(Fab).attrs({
  position: "bottomRight",
  direction: "up",
  large: true
})`
  background-color: #03dac5;
`;

export const AlarmTitle = styled(Text)`
  font-size: 21px;
  color: #fff;
`;

export const AlarmInfo = styled(Text)`
  font-size: 18px;
  color: #fff;
  opacity: 0.75;
`;

export const SyncWrapper = styled(View)`
  position: absolute;
  bottom: 25px;
  align-self: center;
`;

export const SyncText = styled(Text)`
  font-size: 16px;
  color: #fff;
  opacity: 0.75;
  align-self: center;
`;

export const SyncTime = styled(Text)`
  font-size: 18px;
  color: #fff;
  opacity: 0.75;
  align-self: center;
`;

export const AlarmWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TimeWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const TimeText = styled(Text)`
  font-weight: ${props => (props.hour ? "900" : "300")};
  opacity: ${props => (props.hour ? "1" : "0.75")};
  color: #fff;
  font-size: 124px;
`;

export const ModalWrapper = styled(View)`
  background-color: #212121;
  flex: 1;
  justify-content: center;
`;

export const EnableButtonWrapper = styled(View)`
  align-self: center;
  flex: 1;
  justify-content: center;
`;

export const BluetoothButton = styled(Button)`
  background-color: ${props => (props.isEnabled ? "#03dac5" : "transparent")};
  border-radius: 300px;
  padding: 0px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
  border: 3px solid #03dac5;
`;

export const CloseButton = styled(Button).attrs({
  rounded: true
})`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #03dac5;
`;
