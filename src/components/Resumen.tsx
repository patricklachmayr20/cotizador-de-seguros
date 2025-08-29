import React from 'react';
import styled from '@emotion/styled';
import { primerMayuscula } from '../helpers/helper';
import type { DatosSeguro } from '../types';

interface ResumenProps {
  datos: DatosSeguro;
}

const ContenedorResumen = styled.div`
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #00838f 0%, #26c6da 100%);
  color: #fff;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 131, 143, 0.3);
  animation: fadeInUp 0.5s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Titulo = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Lista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
`;

const Item = styled.li`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: 500;
`;

export const Resumen: React.FC<ResumenProps> = ({ datos }) => {
  const { marca, year, plan } = datos;

  if (!marca || !year || !plan) return null;

  return (
    <ContenedorResumen>
      <Titulo>Resumen de Cotización</Titulo>
      <Lista>
        <Item>🚗 Marca: {primerMayuscula(marca)}</Item>
        <Item>📅 Año del Auto: {year}</Item>
        <Item>📋 Plan: {primerMayuscula(plan)}</Item>
      </Lista>
    </ContenedorResumen>
  );
};
