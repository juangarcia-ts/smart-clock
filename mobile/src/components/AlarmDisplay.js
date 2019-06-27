import React from "react";
import { Text } from "native-base";
import {
  AlarmWrapper,
  TimeWrapper,
  TimeText,
  AlarmTitle,
  AlarmInfo
} from "./Styled";

function AlarmDisplay({ data, remainingTime }) {
  if (!data) {
    return (
      <AlarmWrapper>
        <AlarmTitle>Não há nenhum alarme cadastrado</AlarmTitle>
        <AlarmInfo>Clique no botão abaixo para adicionar</AlarmInfo>
      </AlarmWrapper>
    );
  }

  return (
    <AlarmWrapper>
      <AlarmTitle>Próximo alarme</AlarmTitle>
      <TimeWrapper>
        <TimeText hour>{data.hour}:</TimeText>
        <TimeText>{data.minute < 10 ? `0${data.minute}` : data.minute}</TimeText>
      </TimeWrapper>
      <AlarmInfo>Restam {remainingTime} até o alarme</AlarmInfo>
    </AlarmWrapper>
  );
}

export default AlarmDisplay;
