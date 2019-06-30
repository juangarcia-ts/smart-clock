import React from "react";
import { format } from "date-fns";
import { SyncWrapper, SyncText, SyncTime } from "./Styled";

function LastSync({ time }) {
  return (
    <SyncWrapper>
      <SyncText>Última sincronização:</SyncText>
      <SyncTime>
        {time ? format(time, "D/MM/YYYY HH:mm") : "Desconhecido"}
      </SyncTime>
    </SyncWrapper>
  );
}

export default LastSync;
