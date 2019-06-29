import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";
import { Icon, Toast, Spinner, Root } from "native-base";
import {
  CenteredItem,
  List,
  ListItem,
  ListSeparator,
  ItemName,
  RefreshButton,
  RefreshText
} from "./Styled";

function DevicesList({
  pairedDevices,
  unpairedDevices,
  onSuccessfulConnection,
  onRefresh
}) {
  const [isConnecting, showSpinner] = useState(false);

  const connectToDevice = device => {
    let isSuccessful = false;
    let message = "";

    showSpinner(true);

    BluetoothSerial.connect(device.id)
      .then(() => {
        isSuccessful = true;
        message = `Conectado a ${device.name}`;

        testConnection();
      })
      .catch(err => (message = "Não foi possível se conectar ao dispositivo"))
      .finally(() => {
        showSpinner(false);
        Toast.show({
          text: message,
          buttonText: "OK",
          duration: 3000
        });

        if (isSuccessful) {
          onSuccessfulConnection();
        }
      });
  };

  const testConnection = () => {
    BluetoothSerial.write("AT").catch(err => console.warn(res));
  };

  const renderDevices = (device, index) => {
    return (
      <ListItem
        key={device.id}
        borderTopWidth={index === 0 ? 1 : 0}
        borderBottomWidth={1}
      >
        <TouchableOpacity
          onPress={() => !isConnecting && connectToDevice(device)}
        >
          <ItemName>{device.name || device.id}</ItemName>
        </TouchableOpacity>
      </ListItem>
    );
  };

  if (
    (!pairedDevices || pairedDevices.length === 0) &&
    (!unpairedDevices || unpairedDevices.length === 0)
  ) {
    return <></>;
  }

  if (isConnecting) {
    return (
      <CenteredItem>
        <Spinner color={"#03dac5"} size={"large"} />
      </CenteredItem>
    );
  }

  return (
    <Root>
      <List
        sections={[
          { title: "Dispositivos pareados", data: pairedDevices },
          { title: "Outros dispositivos", data: unpairedDevices }
        ]}
        renderItem={({ item, index }) => renderDevices(item, index)}
        renderSectionHeader={({ section }) => (
          <ListSeparator>{section.title}</ListSeparator>
        )}
        keyExtractor={(item, index) => index}
      />
      <RefreshButton onPress={() => onRefresh()}>
        <Icon name="refresh" style={{ color: "#FFF" }} />
        <RefreshText>Buscar novamente</RefreshText>
      </RefreshButton>
    </Root>
  );
}

export default DevicesList;
