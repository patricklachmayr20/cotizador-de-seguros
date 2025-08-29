import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MARCAS_OPTIONS, YEAR_OPTIONS, PLAN_OPTIONS } from '../helpers/helper';
import type { DatosSeguro } from '../types';

interface FormularioProps {
  onSubmit: (datos: DatosSeguro, notas?: string) => void;
  loading?: boolean;
  datosIniciales?: DatosSeguro;
  modoEdicion?: boolean;
}

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  min-width: 120px;
  font-size: 0.95rem;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #00838f;
    box-shadow: 0 0 0 3px rgba(0, 131, 143, 0.1);
  }

  &:hover {
    border-color: #26c6da;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f9fa;
    color: #00838f;
  }
`;

const RadioInput = styled.input`
  margin: 0;
  cursor: pointer;
  accent-color: #00838f;
  width: 18px;
  height: 18px;
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00838f;
    box-shadow: 0 0 0 3px rgba(0, 131, 143, 0.1);
  }

  &:hover {
    border-color: #26c6da;
  }

  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

const Boton = styled.button<{ variant?: 'primary' | 'secondary'; loading?: boolean }>`
  background: ${props =>
    props.variant === 'secondary'
      ? 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)'
      : 'linear-gradient(135deg, #00838F 0%, #26C6DA 100%)'};
  color: ${props => (props.variant === 'secondary' ? '#333' : '#fff')};
  font-size: 16px;
  width: 100%;
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-top: 1rem;
  cursor: ${props => (props.loading ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.loading ? 0.7 : 1)};
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 131, 143, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Efecto shimmer al hacer hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const BotonesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: ${props => (props.modoEdicion ? '1fr 1fr' : '1fr')};
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

const Error = styled.div`
  background: linear-gradient(135deg, #f44336 0%, #e91e63 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const SeccionAdicional = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #00838f;
`;

const TituloSeccion = styled.h3`
  margin: 0 0 1rem 0;
  color: #00838f;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Formulario: React.FC<FormularioProps> = ({
  onSubmit,
  loading = false,
  datosIniciales,
  modoEdicion = false,
}) => {
  const [datos, setDatos] = useState<DatosSeguro>({
    marca: '',
    year: '',
    plan: '',
  });
  const [notas, setNotas] = useState('');
  const [error, setError] = useState(false);

  // Cargar datos iniciales si es modo edición
  useEffect(() => {
    if (datosIniciales && modoEdicion) {
      setDatos(datosIniciales);
    }
  }, [datosIniciales, modoEdicion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'notas') {
      setNotas(e.target.value);
    } else {
      setDatos(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }

    if (error) setError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!datos.marca || !datos.year || !datos.plan) {
      setError(true);
      return;
    }

    onSubmit(datos, notas.trim() || undefined);
  };

  const limpiarFormulario = () => {
    setDatos({ marca: '', year: '', plan: '' });
    setNotas('');
    setError(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <Error>⚠️ Todos los campos obligatorios deben ser completados</Error>}

      <Campo>
        <Label htmlFor="marca">🚗 Marca del Vehículo</Label>
        <Select id="marca" name="marca" value={datos.marca} onChange={handleChange} required>
          <option value="">-- Seleccione la marca --</option>
          {MARCAS_OPTIONS.map(opcion => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </Select>
      </Campo>

      <Campo>
        <Label htmlFor="year">📅 Año del Vehículo</Label>
        <Select id="year" name="year" value={datos.year} onChange={handleChange} required>
          <option value="">-- Seleccione el año --</option>
          {YEAR_OPTIONS.map(opcion => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </Select>
      </Campo>

      <Campo>
        <Label>📋 Tipo de Plan</Label>
        <RadioContainer>
          {PLAN_OPTIONS.map(opcion => (
            <RadioLabel key={opcion.value}>
              <RadioInput
                type="radio"
                name="plan"
                value={opcion.value}
                checked={datos.plan === opcion.value}
                onChange={handleChange}
              />
              {opcion.label}
            </RadioLabel>
          ))}
        </RadioContainer>
      </Campo>

      <SeccionAdicional>
        <TituloSeccion>📝 Información Adicional</TituloSeccion>
        <Campo>
          <Label htmlFor="notas">Notas (Opcional)</Label>
          <TextArea
            id="notas"
            name="notas"
            value={notas}
            onChange={handleChange}
            placeholder="Ej: Vehículo familiar, uso urbano, conductor experimentado..."
            rows={3}
          />
        </Campo>
      </SeccionAdicional>

      <BotonesContainer modoEdicion={modoEdicion}>
        <Boton type="submit" disabled={loading}>
          {loading && <LoadingSpinner />}
          {loading
            ? modoEdicion
              ? 'Recalculando...'
              : 'Cotizando...'
            : modoEdicion
              ? '🔄 Recalcular'
              : '💰 Cotizar Seguro'}
        </Boton>

        {(datos.marca || datos.year || datos.plan || notas) && (
          <Boton type="button" variant="secondary" onClick={limpiarFormulario} disabled={loading}>
            🧹 Limpiar Formulario
          </Boton>
        )}
      </BotonesContainer>
    </FormContainer>
  );
};
