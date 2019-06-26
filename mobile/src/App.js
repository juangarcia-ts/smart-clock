import React from "react";
import { Root, Container, Content, Title } from "native-base";
import { CustomHeader, CustomContent } from "./components/Styled";
import Home from "./screens/Home";

function App() {
  return (
    <Root>
      <Container>
        <CustomHeader>
          <Title>S.M.A.R.T Clock</Title>
        </CustomHeader>
        <CustomContent>
          <Home />
        </CustomContent>
      </Container>
    </Root>
  );
}

export default App;
