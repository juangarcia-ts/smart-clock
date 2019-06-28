import React, { useState, useEffect } from "react";
import { Text } from "native-base";
import BluetoothSerial from "react-native-bluetooth-serial";
import DevicesModal from "./DevicesModal";
import {
  ConnectionWrapper,
  ConnectionStatus,
  ConnectionButton,
  ConnectionText
} from "./Styled";

function BluetoothStatus() {
  const [isConnected, setStatus] = useState(false);
  const [isModalOpen, toggleDevicesModal] = useState(false);

  useEffect(() => {
    BluetoothSerial.isConnected().then(res => setStatus(res));
  }, []);

  return (
    <>
      <ConnectionWrapper>
        <ConnectionStatus isConnected={isConnected} />
        <ConnectionButton onPress={() => toggleDevicesModal(!isModalOpen)}>
          <ConnectionText>{isConnected ? "Conectado" : "Não conectado"}</ConnectionText>
        </ConnectionButton>
      </ConnectionWrapper>
      <DevicesModal isVisible={isModalOpen} toggleFunction={toggleDevicesModal}/>
    </>
  );
}

export default BluetoothStatus;
