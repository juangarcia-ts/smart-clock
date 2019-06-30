import React, { useState, useEffect } from "react";
import DevicesModal from "./DevicesModal";
import BluetoothSerial from "react-native-bluetooth-serial";
import {
  ConnectionWrapper,
  ConnectionStatus,
  ConnectionButton,
  ConnectionText
} from "./Styled";

function BluetoothStatus({ isConnected, onConnection }) {
  const [isModalOpen, toggleDevicesModal] = useState(false);

  const openModal = async () => {
    BluetoothSerial.disconnect().finally(() => toggleDevicesModal(true));
  };

  return (
    <>
      <ConnectionWrapper>
        <ConnectionStatus isConnected={isConnected} />
        <ConnectionButton onPress={() => openModal()}>
          <ConnectionText>
            {isConnected ? "Conectado" : "Não conectado"}
          </ConnectionText>
        </ConnectionButton>
      </ConnectionWrapper>
      <DevicesModal
        isVisible={isModalOpen}
        toggleFunction={toggleDevicesModal}
        onConnection={onConnection}
      />
    </>
  );
}

export default BluetoothStatus;
