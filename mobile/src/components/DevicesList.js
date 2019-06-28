import React, { useState } from "react";
import BluetoothSerial from "react-native-bluetooth-serial";
import {
  Text,
  Toast,
  List,
  ListItem,
  Left,
  Body,
  Button,
  Icon,
  Spinner,
  Separator
} from "native-base";

function DevicesList({ devices, separatorText }) {
  const [isConnecting, showSpinner] = useState(false);

  const connectToDevice = device => {
    let message = "";

    showSpinner(true);

    BluetoothSerial.connect(device.id)
      .then(() => (message = `Conectado a ${device.name}`))
      .catch(err => (message = "Não foi possível se conectar ao dispositivo"))
      .finally(() => {
        showSpinner(false);
        Toast.show({
          text: message,
          buttonText: "OK",
          duration: 3000
        });
      });
  };

  const renderDevices = () => {
    return devices.map(device => {
      return (
        <ListItem
          key={device.id}
          icon
          onPress={() => !isConnecting && connectToDevice(device)}
        >
          <Left>
            <Button>
              <Icon name="bluetooth" />
            </Button>
          </Left>
          <Body>
            <Text>{device.name || device.id}</Text>
          </Body>
        </ListItem>
      );
    });
  };

  console.warn(devices);

  if (!devices || devices.length === 0) {
    //return <></>;
    devices = [{ id: 1, name: "HC-06" }];
  }

  return (
    <>
      <List>
        <Separator bordered>
          <Text>{separatorText}</Text>
        </Separator>
        {renderDevices()}
      </List>
      {isConnecting && <Spinner />}
    </>
  );
}

export default DevicesList;
