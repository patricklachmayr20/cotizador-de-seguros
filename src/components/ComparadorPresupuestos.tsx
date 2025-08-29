import React from 'react';
import styled from '@emotion/styled';
import { primerMayuscula } from '../helpers/helper';
import type { Presupuesto } from '../types';

interface ComparadorProps {
  presupuestos: Presupuesto[];
  onCerrar: () => void;
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ContenidoModal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
`;

const TablaComparacion = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #00838f;
  color: white;
  padding: 1rem;
  text-align: left;
  border: 1px solid #ddd;
`;

const Td = styled.td<{ destacado?: boolean }>`
  padding: 1rem;
  border: 1px solid #ddd;
  background: ${props => (props.destacado ? '#e8f5e8' : 'white')};
  font-weight: ${props => (props.destacado ? 'bold' : 'normal')};
`;

const TituloComparador = styled.h2`
  color: #00838f;
  margin: 0 0 1rem 0;
  padding-right: 2rem;
`;

export const ComparadorPresupuestos: React.FC<ComparadorProps> = ({ presupuestos, onCerrar }) => {
  const precioMinimo = Math.min(...presupuestos.map(p => p.cotizacion));

  return (
    <Modal onClick={onCerrar}>
      <ContenidoModal onClick={e => e.stopPropagation()}>
        <BotonCerrar onClick={onCerrar}>×</BotonCerrar>

        <TituloComparador>⚖️ Comparación de Presupuestos ({presupuestos.length})</TituloComparador>

        <TablaComparacion>
          <thead>
            <tr>
              <Th>Concepto</Th>
              {presupuestos.map((p, index) => (
                <Th key={p.id}>Presupuesto #{index + 1}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>
                <strong>Fecha</strong>
              </Td>
              {presupuestos.map(p => (
                <Td key={p.id}>{p.fecha.toLocaleDateString()}</Td>
              ))}
            </tr>
            <tr>
              <Td>
                <strong>Marca</strong>
              </Td>
              {presupuestos.map(p => (
                <Td key={p.id}>{primerMayuscula(p.datos.marca)}</Td>
              ))}
            </tr>
            <tr>
              <Td>
                <strong>Año</strong>
              </Td>
              {presupuestos.map(p => (
                <Td key={p.id}>{p.datos.year}</Td>
              ))}
            </tr>
            <tr>
              <Td>
                <strong>Plan</strong>
              </Td>
              {presupuestos.map(p => (
                <Td key={p.id}>{primerMayuscula(p.datos.plan)}</Td>
              ))}
            </tr>
            <tr>
              <Td>
                <strong>Cotización</strong>
              </Td>
              {presupuestos.map(p => (
                <Td key={p.id} destacado={p.cotizacion === precioMinimo}>
                  €{p.cotizacion}
                  {p.cotizacion === precioMinimo && ' 🏆'}
                </Td>
              ))}
            </tr>
            <tr>
              <Td>
                <strong>Notas</strong>
              </Td>
              {presupuestos.map(p => (
                <Td key={p.id}>{p.notas || '-'}</Td>
              ))}
            </tr>
            <tr>
              <Td>
                <strong>Favorito</strong>
              </Td>
              {presupuestos.map(p => (
                <Td key={p.id}>{p.favorito ? '⭐ Sí' : 'No'}</Td>
              ))}
            </tr>
          </tbody>
        </TablaComparacion>
      </ContenidoModal>
    </Modal>
  );
};
