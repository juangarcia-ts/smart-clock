import React from "react";
import { TimePickerAndroid } from "react-native";
import { Icon } from "native-base";
import { AlarmCreateButton } from "./Styled";

function AlarmCreate() {
  const openTimePicker = () => {
    TimePickerAndroid.open({
      is24Hour: true,
      mode: "clock"
    }).then(({ action, hour, minute }) => {
      if (action !== TimePickerAndroid.dismissedAction) {
        console.warn(hour + ":" + minute);
      }
    });
  };

  return (
    <AlarmCreateButton onPress={() => openTimePicker()}>
      <Icon name="add" />
    </AlarmCreateButton>
  );
}

export default AlarmCreate;
