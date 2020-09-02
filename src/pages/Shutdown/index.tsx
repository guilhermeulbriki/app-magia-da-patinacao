import React, { useCallback, useState } from "react";

import {
  Container,
  Content,
  ReasonContent,
  ReasonTitle,
  Reason,
} from "./styles";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/api";
import { Alert } from "react-native";

const Shutdown: React.FC = () => {
  const [textReason, setTextReason] = useState("");
  const { sponsor, signOut } = useAuth();

  const handleShutdown = useCallback(async () => {
    await api.post("shutdowns", {
      reason: textReason,
      sponsor_name: sponsor.name,
    });

    Alert.alert(
      "Você se desligou do clube",
      "O seu desligamento foi efetuado com sucesso"
    );

    signOut();
  }, [textReason, sponsor, signOut]);

  return (
    <Container>
      <Header title="Desligamento do clube" />

      <Content>
        <ReasonContent>
          <ReasonTitle>
            Uma pena que está se desligando do clube, poderia nos informar o
            motivo?
          </ReasonTitle>

          <Reason
            multiline={true}
            numberOfLines={10}
            textAlignVertical="top"
            placeholder="Informe o motivo de seu desligamento"
            value={textReason}
            onChangeText={(value) => setTextReason(value)}
          />
        </ReasonContent>

        <Button onPress={handleShutdown} color="secondary">
          Excluir conta
        </Button>
      </Content>
    </Container>
  );
};

export default Shutdown;
