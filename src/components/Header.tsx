import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface HeaderProps {
  titulo: string;
  subtitulo?: string;
  showAnimation?: boolean;
}

// Animaciones
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Componentes estilizados
const ContenedorHeader = styled.header<{ showAnimation: boolean }>`
  background: linear-gradient(135deg, #26c6da 0%, #00838f 50%, #006064 100%);
  padding: 2rem 1rem;
  color: #ffffff;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 131, 143, 0.3);
  animation: ${props => (props.showAnimation ? fadeInDown : 'none')} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${shimmer} 3s infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ffd54f, #ff8a65, #a1c4fd);
    animation: ${shimmer} 2s infinite;
  }
`;

const IconoSeguro = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const TextoHeader = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  margin: 0;
  font-family:
    'Segoe UI',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
  line-height: 1.2;

  background: linear-gradient(45deg, #ffffff, #e1f5fe);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shimmer} 4s infinite;
`;

const Subtitulo = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Badge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PatternBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background-image:
    radial-gradient(circle at 25px 25px, white 2px, transparent 0),
    radial-gradient(circle at 75px 75px, white 2px, transparent 0);
  background-size: 100px 100px;
  animation: ${float} 6s ease-in-out infinite reverse;
`;

// Componente principal
export const Header: React.FC<HeaderProps> = ({
  titulo,
  subtitulo = 'Obtén la mejor cotización para tu vehículo',
  showAnimation = true,
}) => {
  return (
    <ContenedorHeader showAnimation={showAnimation}>
      <PatternBackground />
      <IconoSeguro>🛡️</IconoSeguro>
      <TextoHeader>{titulo}</TextoHeader>
      <Subtitulo>{subtitulo}</Subtitulo>
      <Badge>Rápido • Seguro • Confiable</Badge>
    </ContenedorHeader>
  );
};

// Versión alternativa más simple (opcional)
export const SimpleHeader: React.FC<Pick<HeaderProps, 'titulo'>> = ({ titulo }) => (
  <ContenedorHeader showAnimation={false}>
    <TextoHeader>{titulo}</TextoHeader>
  </ContenedorHeader>
);

export default Header;
