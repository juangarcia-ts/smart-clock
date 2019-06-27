import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { TimePickerAndroid } from "react-native";
import { Icon, Button } from "native-base";
import { AlarmButton } from "./Styled";

function AlarmActions({ alarm, onUpdate }) {
  const [isActive, toggleButtons] = useState(false);

  const openTimePicker = () => {
    TimePickerAndroid.open({
      hour: alarm && alarm.hour,
      minute: alarm && alarm.minute,
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
  };

  const removeAlarm = () => {
    AsyncStorage.setItem("alarm", JSON.stringify(null));
    onUpdate(null);
    toggleButtons(false);
  };

  return (
    <AlarmButton active={isActive} onPress={() => toggleButtons(!isActive)}>
      <Icon name="clock" />
      <Button
        style={{ backgroundColor: "#34A34F" }}
        onPress={() => openTimePicker()}
      >
        <Icon name={alarm ? "create" : "add"} />
      </Button>
      {alarm && (
        <Button
          style={{ backgroundColor: "red" }}
          onPress={() => removeAlarm()}
        >
          <Icon name="trash" />
        </Button>
      )}
    </AlarmButton>
  );
}

export default AlarmActions;
