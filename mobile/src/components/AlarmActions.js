import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { TimePickerAndroid } from "react-native";
import { Icon, Button, Toast } from "native-base";
import { AlarmButton } from "./Styled";

function AlarmActions({ alarm, onUpdate }) {
  const [isActive, toggleButtons] = useState(false);

  const openTimePicker = () => {
    const now = new Date();
    TimePickerAndroid.open({
      hour: alarm ? alarm.hour : now.getHours(),
      minute: alarm ? alarm.minute : now.getMinutes() + 1,
      is24Hour: true,
      mode: "clock"
    }).then(({ action, hour, minute }) => {
      if (action !== TimePickerAndroid.dismissedAction) {
        createAlarm(hour, minute);
      }
    });
  };

  const createAlarm = (hour, minute) => {
    const newAlarm = {
      hour,
      minute
    };

    AsyncStorage.setItem("alarm", JSON.stringify(newAlarm));
    onUpdate(newAlarm);
    toggleButtons(false);
    showRemainingTime(newAlarm);
  };

  const removeAlarm = () => {
    AsyncStorage.setItem("alarm", JSON.stringify(null));
    onUpdate(null);
    toggleButtons(false);
  };

  const showRemainingTime = savedAlarm => {
    const convertToHHMM = secs => {
      function z(n) {
        return (n < 10 ? "0" : "") + n;
      }
      var sign = secs < 0 ? "-" : "";
      secs = Math.abs(secs);
      return sign + z((secs / 3600) | 0) + ":" + z(((secs % 3600) / 60) | 0);
    };

    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const alarmDate = new Date();
    alarmDate.setHours(savedAlarm ? savedAlarm.hour : alarm.hour);
    alarmDate.setMinutes(savedAlarm ? savedAlarm.minute : alarm.minute);
    alarmDate.setSeconds(0);
    alarmDate.setMilliseconds(0);

    let secondsDifference = (alarmDate - now) / 1000;

    if (secondsDifference < 0) {
      secondsDifference = 24 * 60 * 60 + secondsDifference;
    }

    const timeBetween = convertToHHMM(secondsDifference);

    Toast.show({
      text: `Restam ${timeBetween} até o alarme`,
      buttonText: "OK",
      duration: 3000
    });
  };

  return (
    <AlarmButton active={isActive} onPress={() => toggleButtons(!isActive)}>
      <Icon name="alarm" style={{ color: "#212121", fontSize: 36 }} />
      {alarm && (
        <Button
          style={{ backgroundColor: "#03DAC5" }}
          onPress={() => removeAlarm()}
        >
          <Icon name="trash" style={{ color: "#212121", fontSize: 32 }} />
        </Button>
      )}
      <Button
        style={{ backgroundColor: "#03DAC5" }}
        onPress={() => openTimePicker()}
      >
        <Icon
          name={alarm ? "create" : "add"}
          style={{ color: "#212121", fontSize: 32 }}
        />
      </Button>
    </AlarmButton>
  );
}

export default AlarmActions;
