import React, { useCallback, useState } from 'react';

import {
  Container,
  FormAffiliation,
  FormAffiliationTitle,
  FormAffiliationContent,
} from './styles';
import { Picker } from 'react-native';
import Header from '../../components/Header';
import { Form } from '@unform/mobile';

const Register: React.FC = () => {
  const [affiliation, setAffilitation] = useState('');

  const handleSubmit = useCallback(() => {
    console.log('submit');
  }, []);

  return (
    <Container>
      <Header title="Cadastro de Responsável" />

      <Form onSubmit={handleSubmit}>
        <FormAffiliation>
          <FormAffiliationTitle>Você é...</FormAffiliationTitle>
          <FormAffiliationContent>
            <Picker
              selectedValue={affiliation}
              onValueChange={(value) => setAffilitation(value)}
            >
              <Picker.Item label="Selecione sua filiação" value="'" />
              <Picker.Item label="Pai" value="pai" />
              <Picker.Item label="Mãe" value="mae" />
              <Picker.Item label="Outro" value="outro" />
              <Picker.Item label="O próprio aluno" value="aluno" />
            </Picker>
          </FormAffiliationContent>
        </FormAffiliation>
      </Form>
    </Container>
  );
};

export default Register;
