import React, { useState, useEffect } from "react";
import BluetoothSerial from "react-native-bluetooth-serial";
import AsyncStorage from "@react-native-community/async-storage";
import AlarmActions from "../components/AlarmActions";
import AlarmDisplay from "../components/AlarmDisplay";
import BluetoothStatus from "../components/BluetoothStatus";
import LastSync from "../components/LastSync";

function AlarmScreen() {
  const [isConnected, setStatus] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [alarm, setAlarmState] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isFetching, showLoading] = useState(false);

  // Life Cycle Methods
  useEffect(() => {
    BluetoothSerial.isConnected().then(res => {
      setStatus(res);

      fetchAlarms();
    });
  }, []);

  useEffect(() => {
    if (alarm) {
      calculateRemainingTime(alarm);
    }
  }, [alarm]);

  const setAlarm = alarm => {
    setAlarmState(alarm);

    if (isConnected) {
      syncToArduino();
    }
  };

  const fetchAlarms = () => {
    showLoading(true);

    AsyncStorage.getItem("alarm", (err, result) => {
      const savedAlarm = JSON.parse(result);

      if (savedAlarm) {
        setAlarm(savedAlarm);

        calculateRemainingTime(savedAlarm);
        setTimeout(() => calculateRemainingTime(savedAlarm), 60000);
      }

      showLoading(false);
    });
  };

  const syncToArduino = alarm => {
    BluetoothSerial.write("AT")
      .then(() => setLastSync(new Date()))
      .catch(err => console.warn(res));
  };

  const calculateRemainingTime = savedAlarm => {
    const convertToHHMM = secs => {
      function z(n) {
        return (n < 10 ? "0" : "") + n;
      }
      var sign = secs < 0 ? "-" : "";
      secs = Math.abs(secs);
      return sign + z((secs / 3600) | 0) + ":" + z(((secs % 3600) / 60) | 0);
    };

    const alarmDate = new Date();
    alarmDate.setHours(savedAlarm.hour);
    alarmDate.setMinutes(savedAlarm.minute);

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let secondsDifference = (alarmDate - now) / 1000;

    if (secondsDifference < 0) {
      secondsDifference = 24 * 60 * 60 + secondsDifference;
    }

    const timeBetween = convertToHHMM(secondsDifference);

    setRemainingTime(timeBetween);
  };

  // Render Methods
  if (isFetching) {
    return <></>;
  }

  return (
    <>
      <BluetoothStatus isConnected={isConnected} />
      <AlarmActions alarm={alarm} onUpdate={setAlarm} />
      <AlarmDisplay data={alarm} remainingTime={remainingTime} />
      <LastSync time={lastSync} />
    </>
  );
}

export default AlarmScreen;
