import React, { useState, useCallback } from 'react';
import { Picker } from '@react-native-community/picker';

import { Container } from './styles';

interface SelectProps {
  items: Array<{
    label: string;
    value: string;
  }>;
  placeholder: string;
  handleSelect: Function;
}

const Select: React.FC<SelectProps> = ({
  items,
  placeholder,
  handleSelect,
}) => {
  const [value, setValue] = useState('');

  const handleValueChange = useCallback((value: string) => {
    handleSelect(value);
    setValue(value);
  }, []);

  return (
    <Container>
      <Picker
        style={{
          color: '#929292',
          fontSize: 24,
        }}
        selectedValue={value}
        onValueChange={(value) => handleValueChange(String(value))}
      >
        <Picker.Item label={placeholder} value="" />
        {items.map((item) => (
          <Picker.Item key={item.label} label={item.label} value={item.value} />
        ))}
      </Picker>
    </Container>
  );
};

export default Select;
