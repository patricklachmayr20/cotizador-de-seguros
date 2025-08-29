import React from 'react';
import styled from '@emotion/styled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const StyledButton = styled.button<{ variant: string; loading: boolean }>`
  background-color: ${props => (props.variant === 'primary' ? '#00838F' : '#e0e0e0')};
  color: ${props => (props.variant === 'primary' ? '#fff' : '#333')};
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-top: 2rem;
  cursor: ${props => (props.loading ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.loading ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background-color: ${props => (props.variant === 'primary' ? '#26C6DA' : '#d0d0d0')};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}) => (
  <StyledButton variant={variant} loading={loading} disabled={disabled || loading} {...props}>
    {loading && <LoadingSpinner />}
    {children}
  </StyledButton>
);
