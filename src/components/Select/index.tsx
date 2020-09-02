import React, { useState, useCallback, useEffect } from "react";

import { Container, SelectPicker } from "./styles";

interface SelectProps {
  items: Array<{
    label: string;
    value: string;
  }>;
  placeholder: string;
  handleSelect: Function;
  error?: boolean;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  items,
  placeholder,
  handleSelect,
  error,
  defaultValue,
}) => {
  const [value, setValue] = useState(() => {
    if (defaultValue && defaultValue.length > 0) return defaultValue;
  });
  const [isFilled, setIsFilled] = useState(false);

  const handleValueChange = useCallback((value: string) => {
    handleSelect(value);
    setValue(value);

    if (value !== "") setIsFilled(true);
  }, []);

  useEffect(() => {
    setValue(defaultValue);
    setIsFilled(true);
  }, [defaultValue]);

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
