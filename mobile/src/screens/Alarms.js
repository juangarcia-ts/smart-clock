import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import AlarmsList from "../components/AlarmsList";
import AlarmCreate from "../components/AlarmCreate";

function Alarm() {
  const [alarmsList, setAlarms] = useState([]);
  const [isFetching, showLoading] = useState(false);

  // Life Cycle Methods
  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = () => {
    showLoading(true);

    AsyncStorage.getItem("alarms", (err, result) => {
      setAlarms(JSON.parse(result));
      showLoading(false);
    });
  };

  // Render Methods
  if (isFetching) {
    return <></>;
  }

  return (
    <>
      <AlarmsList alarms={alarmsList} />
      <AlarmCreate onCreate={fetchAlarms} />
    </>
  );
}

export default Alarm;
