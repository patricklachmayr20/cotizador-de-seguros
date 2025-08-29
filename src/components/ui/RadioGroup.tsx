import React from 'react';
import styled from '@emotion/styled';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: readonly RadioOption[];
}

const RadioContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  gap: 0.5rem;

  &:hover {
    color: #00838f;
  }
`;

const RadioInput = styled.input`
  margin: 0;
  cursor: pointer;
  accent-color: #00838f;
`;

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, value, onChange, options }) => (
  <RadioContainer>
    {options.map(option => (
      <RadioLabel key={option.value}>
        <RadioInput
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        />
        {option.label}
      </RadioLabel>
    ))}
  </RadioContainer>
);
