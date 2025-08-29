import React from 'react';
import styled from '@emotion/styled';

interface ResultadoProps {
  cotizacion: number;
  onReset?: () => void;
  textoBoton?: string;
  mostrarDetalles?: boolean;
  mostrarBotones?: boolean; // Nueva prop para controlar botones
}

const Container = styled.div`
  margin-top: 2rem;
`;

const Mensaje = styled.div`
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  color: #1976d2;
  font-weight: 500;
  border: 2px dashed #64b5f6;
`;

const ResultadoCotizacion = styled.div`
  text-align: center;
  padding: 2.5rem;
  border: 2px solid #26c6da;
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  animation: slideInScale 0.6s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd54f, #ff8a65, #a1c4fd, #26c6da);
    background-size: 300% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes slideInScale {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes shimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const TextoCotizacion = styled.div`
  color: #00838f;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Precio = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #00695c;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const SubTexto = styled.div`
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #26c6da, transparent);
  margin: 1.5rem 0;
`;

const DetallesAdicionales = styled.div`
  background: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
  text-align: left;
`;

const BotonesResultado = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const BotonResultado = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props =>
    props.variant === 'secondary'
      ? `
    background: #e0e0e0;
    color: #333;
    &:hover { background: #d0d0d0; transform: translateY(-1px); }
  `
      : `
    background: linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%);
    color: white;
    &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3); }
  `}
`;

export const Resultado: React.FC<ResultadoProps> = ({
  cotizacion,
  onReset,
  textoBoton = 'Nueva Cotización',
  mostrarDetalles = true,
  mostrarBotones = true,
}) => {
  if (cotizacion === 0) {
    return (
      <Container>
        <Mensaje>
          🎯 Completa el formulario para obtener tu cotización personalizada
          <br />
          <small style={{ marginTop: '0.5rem', display: 'block', opacity: 0.8 }}>
            Todos los presupuestos se guardan automáticamente en tu historial
          </small>
        </Mensaje>
      </Container>
    );
  }

  const pagoMensual = (cotizacion / 12).toFixed(2);
  const ahorroEstimado = (cotizacion * 0.15).toFixed(2);

  return (
    <Container>
      <ResultadoCotizacion>
        <TextoCotizacion>🎯 Tu cotización está lista</TextoCotizacion>
        <Divider />
        <Precio>€{cotizacion}</Precio>
        <SubTexto>Prima anual estimada</SubTexto>

        {mostrarDetalles && (
          <DetallesAdicionales>
            💡 <strong>Información útil:</strong>
            <br />• Pago mensual aproximado: <strong>€{pagoMensual}</strong>
            <br />• Ahorro estimado vs. competencia: <strong>€{ahorroEstimado}</strong>
            <br />
            • Cotización válida por 30 días
            <br />• Guardado automático en tu historial ✅
          </DetallesAdicionales>
        )}

        {mostrarBotones && (
          <BotonesResultado>
            {onReset && (
              <BotonResultado variant="secondary" onClick={onReset}>
                🔄 {textoBoton}
              </BotonResultado>
            )}
            <BotonResultado onClick={() => window.print()}>🖨️ Imprimir</BotonResultado>
          </BotonesResultado>
        )}
      </ResultadoCotizacion>
    </Container>
  );
};
