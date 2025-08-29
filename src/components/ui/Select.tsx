import React from 'react';
import styled from '@emotion/styled';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly Option[];
  placeholder?: string;
  required?: boolean;
}

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00838f;
    box-shadow: 0 0 0 2px rgba(0, 131, 143, 0.1);
  }
`;

export const Select: React.FC<SelectProps> = ({ options, placeholder = '-- Seleccione --', ...props }) => (
  <StyledSelect {...props}>
    <option value="">{placeholder}</option>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </StyledSelect>
);
