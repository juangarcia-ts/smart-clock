import React, { useState } from "react";
import { Container, Title, TabHeading, Icon } from "native-base";
import { CustomHeader, CustomContent } from "./components/Styled";
import AlarmScreen from "./screens/AlarmScreen";

function App() {
  //console.disableYellowBox = true;
  const [currentTab, setTab] = useState(0);
  const tabs = [
    { icon: "clock", name: "Alarmes" },
    { icon: "bluetooth", name: "Conexão" }
  ];

  const renderHeading = index => {
    const tab = tabs[index];

    return (
      <TabHeading style={{ backgroundColor: "#000" }}>
        <Icon name={tab.icon} />
        <Text>{tab.name}</Text>
      </TabHeading>
    );
  };

  return (
    <Container>
      <CustomHeader>
        <Title>S.M.A.R.T Clock</Title>
      </CustomHeader>
      <CustomContent>
        <AlarmScreen />
      </CustomContent>
    </Container>
  );
}

export default App;
