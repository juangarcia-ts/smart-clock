import React from "react";
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import { TimePickerAndroid } from "react-native";
import { Icon } from "native-base";
import { AlarmCreateButton } from "./Styled";

function AlarmCreate(props) {
  const openTimePicker = () => {
    TimePickerAndroid.open({
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
      key: _.uniqueId("alarm-"),
      hour,
      minute: minute.length === 1 ? "0" + minute : minute,
      isSet: false
    };

    AsyncStorage.getItem("alarms", (err, result) => {
      const oldArray = result ? JSON.parse(result) : [];

      AsyncStorage.setItem("alarms", JSON.stringify([...oldArray, newAlarm]), (err, result) => {
        props.onCreate();
      }); 
    });
  };

  return (
    <AlarmCreateButton onPress={() => openTimePicker()}>
      <Icon name="add" />
    </AlarmCreateButton>
  );
}

export default AlarmCreate;
