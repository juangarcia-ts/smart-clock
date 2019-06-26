import React from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { Body, Switch, Right } from "native-base";
import { CustomList, Item, AlarmInfo } from "./Styled";

function AlarmsList({ alarms }) {
  const renderAlarm = item => {
    return (
      <Item>
        <Body>
          <AlarmInfo>
            {item.hour}:{item.minute}
          </AlarmInfo>
        </Body>
        <Right>
          <Switch value={false}/>
        </Right>
      </Item>
    );
  };

  if (!alarms || alarms.length === 0) {
    return <></>;
  }

  return <CustomList dataArray={alarms} renderRow={renderAlarm} />;
}

export default AlarmsList;
