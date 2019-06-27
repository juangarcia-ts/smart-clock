import React, { useState, useEffect } from "react";
import { AppState } from "react-native";
import { Text } from "native-base";
import BluetoothSerial from "react-native-bluetooth-serial";
import DevicesList from "../components/DevicesList";
import { CustomContainer, BluetoothButton, LoadingText } from "../components/Styled";

function BluetoothScreen() {
  const [isFetching, showLoading] = useState(false);
  const [isBTEnabled, setBTStatus] = useState(null);
  const [pairedDevices, setPairedDevices] = useState([]);
  const [unpairedDevices, setUnpairedDevices] = useState([]);

  // Life Cycle Methods
  useEffect(() => {    
    BluetoothSerial.on("bluetoothEnabled", fetchDevices);
    BluetoothSerial.on("bluetoothDisabled", clearDevices);
    AppState.addEventListener('change', handleAppStateChange);

    BluetoothSerial.isEnabled().then(isEnabled => {
      if (isEnabled) {
        fetchDevices();
      }

      setBTStatus(isEnabled);
    });
  }, []);

  // Helper Methods
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      fetchDevices();
    }
  };
  
  const clearDevices = () => {
    setPairedDevices([]);
    setUnpairedDevices([]);
  };

  const toggleBluetooth = () => {
    let promise = [];

    if (isBTEnabled) {
      promise.push(BluetoothSerial.disable());
    } else {
      promise.push(BluetoothSerial.enable());
    }

    Promise.all(promise).then(() => setBTStatus(!isBTEnabled));
  };

  const fetchDevices = () => {
    BluetoothSerial.list().then(devicesList => setPairedDevices(devicesList));

    showLoading(true);

    BluetoothSerial.discoverUnpairedDevices()
      .then(devicesList => setUnpairedDevices(devicesList))
      .catch(err =>
        Toast.show({
          text: "Não foi possível localizar os dispositivos",
          buttonText: "OK",
          duration: 3000
        })
      )
      .finally(() => showLoading(false));
  };

  // Render Methods
  if (isBTEnabled == null) {
    return <Text />;
  }

  return (
    <CustomContainer>
      <BluetoothButton
        isEnabled={isBTEnabled}
        onPress={() => toggleBluetooth()}
      >
        <Text>{isBTEnabled ? "Desabilitar" : "Habilitar"} Bluetooth</Text>
      </BluetoothButton>
      <DevicesList
        devices={pairedDevices}
        separatorText={"Dispositivos pareados"}
      />
      <DevicesList
        devices={unpairedDevices}
        separatorText={"Outros dispositivos"}
      />
      {isFetching && <LoadingText>Buscando dispositivos...</LoadingText>}
    </CustomContainer>
  );
}

export default BluetoothScreen;
