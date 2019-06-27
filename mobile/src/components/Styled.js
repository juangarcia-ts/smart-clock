import styled from "styled-components";
import { View } from "react-native";
import { Header, Button, Text, Fab , List, ListItem} from "native-base";

export const CustomHeader = styled(Header).attrs({
  noLeft: true,
  iosBarStyle: "light-content",
  androidStatusBarColor: "#000"
})`
  align-items: center;
  background-color: #000;
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

export const AlarmButton = styled(Fab).attrs({
  position: "bottomRight",
  direction: "up"
})`
  background-color: #5067ff;
`;

export const CustomContainer = styled(View)`
  flex: 1;
  background-color: #212121;
`;

export const AlarmTitle = styled(Text)`
  font-size: 21px;
  color: #FFF;  
`;

export const AlarmInfo = styled(Text)`
  font-size: 18px;
  color: #FFF;  
  opacity: 0.75;
`;

export const SyncWrapper = styled(View)`
  position: absolute;
  top: 25px;
  align-self: center;
`;

export const SyncText = styled(Text)` 
  font-size: 16px;
  color: #FFF;  
  opacity: 0.75;
  align-self: center;
`;

export const SyncTime = styled(Text)`
  font-size: 18px;
  color: #FFF;  
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
  font-weight: ${props => props.hour ? '900' : '300'};
  opacity: ${props => props.hour ? '1' : '0.75'};
  color: #FFF;
  font-size: 124px;  
`;

export const CustomList = styled(List)``;

export const Item = styled(ListItem)``;


