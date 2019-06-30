import React, { useState } from "react";
import { Modal } from "react-native";
import { Item, Icon } from "native-base";
import BluetoothSerial from "react-native-bluetooth-serial";
import {
  ButtonText,
  DeactivateWrapper,
  DeactivateTitle,
  DeactivateButton,
  DeactivateInput
} from "./Styled";

function DeactivationModal({ isVisible, hasError }) {
  const [pin, setPIN] = useState("");

  const submitPIN = () => {
    const command = `PIN:${pin.toString()}`;

    BluetoothSerial.write(command);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <DeactivateWrapper>
        <DeactivateTitle>Alarme ativo</DeactivateTitle>
        <Item error={hasError}>
          <DeactivateInput
            placeholder="Insira o PIN exibido no alarme"
            value={pin}
            onChangeText={text => setPIN(text)}
          />
          {hasError && <Icon name="close-circle" />}
        </Item>
        <DeactivateButton onPress={() => submitPIN()}>
          <ButtonText>Verificar PIN</ButtonText>
        </DeactivateButton>
      </DeactivateWrapper>
    </Modal>
  );
}

export default DeactivationModal;
