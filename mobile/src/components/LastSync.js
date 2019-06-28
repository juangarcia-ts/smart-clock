import React from "react";
import { SyncWrapper, SyncText, SyncTime } from "./Styled";

function LastSync({ time }) {
  return (
    <SyncWrapper>
      <SyncText>Última sincronização:</SyncText>
      <SyncTime>00:00:00</SyncTime>
    </SyncWrapper>
  );
}

export default LastSync;