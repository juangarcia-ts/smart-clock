import React, { useState } from "react";
import {
  Root,
  Container,
  Content,
  Title,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Icon
} from "native-base";
import { View } from "react-native";
import { CustomHeader } from "./components/Styled";
import BluetoothScreen from "./screens/BluetoothScreen";
import AlarmScreen from "./screens/AlarmScreen";

function App() {
  const [currentTab, setTab] = useState(0);
  const tabs = [
    { icon: "clock", name: "Alarmes" },
    { icon: "bluetooth", name: "Conexão" }
  ];

  const renderHeading = index => {
    const tab = tabs[index];

    return (
      <TabHeading style={{backgroundColor: '#000'}}> 
        <Icon name={tab.icon} />
        <Text>{tab.name}</Text>
      </TabHeading>
    );
  };

  return (
    <Root>
      <Container>
        <CustomHeader>
          <Title>S.M.A.R.T Clock</Title>
        </CustomHeader>
        <Tabs
          initialPage={currentTab}
          tabBarPosition="bottom"
          onChangeTab={({ i }) => setTab(i)}
        >
          <Tab heading={renderHeading(0)}>
            <AlarmScreen />
          </Tab>
          <Tab heading={renderHeading(1)}>
            <BluetoothScreen />
          </Tab>
        </Tabs>
      </Container>
    </Root>
  );
}

export default App;
