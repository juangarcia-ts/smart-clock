import React, { useState, useEffect } from "react";
import { View, Animated, Modal, BackHandler } from "react-native";
import { Text, Icon, Button } from "native-base";
import BluetoothSerial from "react-native-bluetooth-serial";
import DevicesList from "./DevicesList";
import {
  EnableButtonWrapper,
  ConnectionWrapper,
  ConnectionStatus,
  ModalWrapper,
  DevicesWrapper,
  BluetoothButton,
  LoadingText,
  CloseButton,
  AlarmInfo
} from "./Styled";

function DevicesModal({ isVisible, toggleFunction, onConnection }) {
  const [isFetching, showLoading] = useState(false);
  const [isBTEnabled, setBTStatus] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    BluetoothSerial.isEnabled().then(isEnabled => {
      setBTStatus(isEnabled);

      if (isEnabled) {
        fetchDevices();
      }
    });
  }, []);

  const clearDevices = () => {
    setDevices([]);
  };

  const toggleBluetooth = () => {
    setBTStatus(true);

    BluetoothSerial.enable().then(() => {
      fetchDevices();
    });
  };

  const onSuccessfulConnection = () => {
    toggleFunction(false);
    onConnection();
  };

  const fetchDevices = () => {
    showLoading(true);

    BluetoothSerial.discoverUnpairedDevices()
      .then(devicesList => setDevices(devicesList))
      .catch(err =>
        Toast.show({
          text: "Não foi possível localizar os dispositivos",
          buttonText: "OK",
          duration: 3000
        })
      )
      .finally(() => showLoading(false));
  };

  if (isBTEnabled === null) {
    return <></>;
  }

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <ModalWrapper>
        <CloseButton onPress={() => toggleFunction(false)}>
          <Icon name="close" style={{ color: "#212121" }} />
        </CloseButton>
        {isBTEnabled && !isFetching ? (
          <DevicesWrapper>
            <DevicesList
              devices={devices}
              onSuccessfulConnection={onSuccessfulConnection}
              onRefresh={fetchDevices}
            />
          </DevicesWrapper>
        ) : (
          <EnableButtonWrapper>
            <BluetoothButton
              isEnabled={isBTEnabled}
              onPress={() => toggleBluetooth()}
            >
              <Icon
                name="bluetooth"
                style={{
                  fontSize: 72,
                  margin: 0,
                  color: isBTEnabled ? "#212121" : "#03dac5"
                }}
              />
            </BluetoothButton>
            <AlarmInfo>
              {isFetching
                ? "Buscando dispositivos..."
                : "Ative o Bluetooth antes de continuar"}
            </AlarmInfo>
          </EnableButtonWrapper>
        )}
      </ModalWrapper>
    </Modal>
  );
}

export default DevicesModal;
