import React, { useState, useEffect } from "react";
import { Root } from "native-base";
import BluetoothSerial from "react-native-bluetooth-serial";
import AsyncStorage from "@react-native-community/async-storage";
import AlarmActions from "../components/AlarmActions";
import AlarmDisplay from "../components/AlarmDisplay";
import BluetoothStatus from "../components/BluetoothStatus";
import LastSync from "../components/LastSync";
import DeactivationModal from "../components/DeactivationModal";

function AlarmScreen() {
  const [isOn, showDeactivation] = useState(false);
  const [hasPinError, showError] = useState(null);
  const [isConnected, setStatus] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [alarm, setAlarmState] = useState(null);
  const [isFetching, showLoading] = useState(false);

  // Life Cycle Methods
  useEffect(() => {
    BluetoothSerial.withDelimiter("\r\n").then(() => {
      BluetoothSerial.on("read", ({ data }) => {
        if (data == "ALARM_ON\r\n" && !isOn) {
          showDeactivation(true);
        } else if (data == "ALARM_OFF\r\n" && isOn) {
          showDeactivation(false);
          showError(false);
        } else if (data == "WRONG_PIN\r\n" && !hasPinError) {
          showError(true);
        }
      });
    });

    BluetoothSerial.isConnected().then(res => {
      setStatus(res);

      fetchAlarms();
    });
  }, []);

  const onConnection = () => {
    setStatus(true);

    if (alarm) {
      syncToArduino(alarm);
    }
  };

  const setAlarm = myAlarm => {
    setAlarmState(myAlarm);

    if (myAlarm && isConnected) {
      syncToArduino(myAlarm);
    }
  };

  const syncToArduino = ({ hour, minute }) => {
    const command = `SET:${hour.toString()}${minute.toString()}`;

    BluetoothSerial.write(command)
      .then(() => setLastSync(new Date()))
      .catch(err => console.warn(res));
  };

  const fetchAlarms = () => {
    showLoading(true);

    AsyncStorage.getItem("alarm", (err, result) => {
      const savedAlarm = JSON.parse(result);

      if (savedAlarm) {
        setAlarm(savedAlarm);
      }

      showLoading(false);
    });
  };

  // Render Methods
  if (isFetching) {
    return <></>;
  }

  return (
    <Root>
      <BluetoothStatus isConnected={isConnected} onConnection={onConnection} />
      <AlarmActions alarm={alarm} onUpdate={setAlarm} />
      <AlarmDisplay data={alarm} />
      <LastSync time={lastSync} />
      <DeactivationModal isVisible={isOn} hasError={hasPinError} />
    </Root>
  );
}

export default AlarmScreen;
