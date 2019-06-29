import React, { useState, useEffect } from "react";
import DevicesModal from "./DevicesModal";
import {
  ConnectionWrapper,
  ConnectionStatus,
  ConnectionButton,
  ConnectionText
} from "./Styled";

function BluetoothStatus({ isConnected }) {
  const [isModalOpen, toggleDevicesModal] = useState(false);

  return (
    <>
      <ConnectionWrapper>
        <ConnectionStatus isConnected={isConnected} />
        <ConnectionButton onPress={() => toggleDevicesModal(!isModalOpen)}>
          <ConnectionText>
            {isConnected ? "Conectado" : "Não conectado"}
          </ConnectionText>
        </ConnectionButton>
      </ConnectionWrapper>
      <DevicesModal
        isVisible={isModalOpen}
        toggleFunction={toggleDevicesModal}
      />
    </>
  );
}

export default BluetoothStatus;
