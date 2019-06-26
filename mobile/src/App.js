import React, { useState } from "react";
import {
  Root,
  Container,
  Title,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Icon
} from "native-base";
import { CustomHeader } from "./components/Styled";
import BluetoothConnection from "./screens/BluetoothConnection";
import Alarms from "./screens/Alarms";

function App() {
  const [currentTab, setTab] = useState(0);
  const tabs = [    
    { icon: "clock", name: "Alarmes" },
    { icon: "bluetooth", name: "Conexão" }
  ];

  const renderHeading = index => {
    const tab = tabs[index];

    return (
      <TabHeading>
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
            <Alarms />
          </Tab>
          <Tab heading={renderHeading(1)}>
            <BluetoothConnection />
          </Tab>
        </Tabs>
      </Container>
    </Root>
  );
}

export default App;
