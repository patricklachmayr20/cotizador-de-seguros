import React from 'react';
import styled from '@emotion/styled';
import { formatearMoneda } from '../utils/exportUtils';
import type { Presupuesto } from '../types';

interface EstadisticasProps {
  presupuestos: Presupuesto[];
}

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const Tarjeta = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #00838f;
`;

const Numero = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #00838f;
  margin-bottom: 0.5rem;
`;

const Etiqueta = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const GraficoBarras = styled.div`
  margin-top: 2rem;
`;

const Barra = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const EtiquetaBarra = styled.div`
  font-weight: 600;
  min-width: 100px;
`;

const ContenedorBarra = styled.div`
  flex: 1;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  margin: 0 1rem;
  overflow: hidden;
`;

const RellenoBarra = styled.div<{ porcentaje: number }>`
  height: 100%;
  width: ${props => props.porcentaje}%;
  background: linear-gradient(90deg, #00838f, #26c6da);
  transition: width 1s ease;
`;

const ValorBarra = styled.div`
  font-weight: bold;
  color: #00838f;
  min-width: 80px;
  text-align: right;
`;

export const EstadisticasAvanzadas: React.FC<EstadisticasProps> = ({ presupuestos }) => {
  if (presupuestos.length === 0) return null;

  // Cálculos estadísticos
  const cotizaciones = presupuestos.map(p => p.cotizacion);
  const promedio = cotizaciones.reduce((a, b) => a + b, 0) / cotizaciones.length;
  const minimo = Math.min(...cotizaciones);
  const maximo = Math.max(...cotizaciones);

  // Distribución por marca
  const porMarca = presupuestos.reduce(
    (acc, p) => {
      acc[p.datos.marca] = (acc[p.datos.marca] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Distribución por plan
  const porPlan = presupuestos.reduce(
    (acc, p) => {
      acc[p.datos.plan] = (acc[p.datos.plan] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalPresupuestos = presupuestos.length;

  return (
    <Container>
      <h3 style={{ color: '#00838F', margin: '0 0 1rem 0' }}>📈 Estadísticas de tus Presupuestos</h3>

      <Grid>
        <Tarjeta>
          <Numero>{totalPresupuestos}</Numero>
          <Etiqueta>Total Cotizaciones</Etiqueta>
        </Tarjeta>
        <Tarjeta>
          <Numero>{formatearMoneda(promedio)}</Numero>
          <Etiqueta>Precio Promedio</Etiqueta>
        </Tarjeta>
        <Tarjeta>
          <Numero>{formatearMoneda(minimo)}</Numero>
          <Etiqueta>Mejor Precio</Etiqueta>
        </Tarjeta>
        <Tarjeta>
          <Numero>{formatearMoneda(maximo)}</Numero>
          <Etiqueta>Precio Más Alto</Etiqueta>
        </Tarjeta>
      </Grid>

      <GraficoBarras>
        <h4 style={{ color: '#00838F', marginBottom: '1rem' }}>Distribución por Marca</h4>
        {Object.entries(porMarca).map(([marca, cantidad]) => {
          const porcentaje = (cantidad / totalPresupuestos) * 100;
          return (
            <Barra key={marca}>
              <EtiquetaBarra>{marca.charAt(0).toUpperCase() + marca.slice(1)}</EtiquetaBarra>
              <ContenedorBarra>
                <RellenoBarra porcentaje={porcentaje} />
              </ContenedorBarra>
              <ValorBarra>
                {cantidad} ({porcentaje.toFixed(1)}%)
              </ValorBarra>
            </Barra>
          );
        })}
      </GraficoBarras>

      <GraficoBarras>
        <h4 style={{ color: '#00838F', marginBottom: '1rem' }}>Distribución por Plan</h4>
        {Object.entries(porPlan).map(([plan, cantidad]) => {
          const porcentaje = (cantidad / totalPresupuestos) * 100;
          return (
            <Barra key={plan}>
              <EtiquetaBarra>{plan.charAt(0).toUpperCase() + plan.slice(1)}</EtiquetaBarra>
              <ContenedorBarra>
                <RellenoBarra porcentaje={porcentaje} />
              </ContenedorBarra>
              <ValorBarra>
                {cantidad} ({porcentaje.toFixed(1)}%)
              </ValorBarra>
            </Barra>
          );
        })}
      </GraficoBarras>
    </Container>
  );
};
