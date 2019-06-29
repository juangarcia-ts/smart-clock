import React from "react";
import { SyncWrapper, SyncText, SyncTime } from "./Styled";

function LastSync({ time }) {
  return (
    <SyncWrapper>
      <SyncText>Última sincronização:</SyncText>
      <SyncTime>{time || "--:--:--"}</SyncTime>
    </SyncWrapper>
  );
}

export default LastSync;
