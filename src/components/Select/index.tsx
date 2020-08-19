import React, { useState, useCallback } from 'react';

import { Container, SelectPicker } from './styles';

interface SelectProps {
  items: Array<{
    label: string;
    value: string;
  }>;
  placeholder: string;
  handleSelect: Function;
  error?: boolean;
}

const Select: React.FC<SelectProps> = ({
  items,
  placeholder,
  handleSelect,
  error,
}) => {
  const [value, setValue] = useState('');
  const [isFilled, setIsFilled] = useState(false);

  const handleValueChange = useCallback((value: string) => {
    handleSelect(value);
    setValue(value);

    if (value !== '') setIsFilled(true);
  }, []);

  return (
    <Container erro={!!error}>
      <SelectPicker
        isFilled={isFilled}
        selectedValue={value}
        onValueChange={(value) => handleValueChange(String(value))}
      >
        <SelectPicker.Item label={placeholder} value="" />
        {items.map((item) => (
          <SelectPicker.Item
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </SelectPicker>
    </Container>
  );
};

export default Select;
