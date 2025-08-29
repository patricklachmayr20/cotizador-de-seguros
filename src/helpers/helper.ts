import type { Marca, Plan } from '../types';

export const obtenerDiferenciaYear = (year: number): number => {
  return new Date().getFullYear() - year;
};

export const calcularMarca = (marca: Marca): number => {
  const incrementos: Record<Marca, number> = {
    europeo: 1.3,
    americano: 1.15,
    asiatico: 1.05,
  };

  return incrementos[marca] || 1;
};

export const obtenerPlan = (plan: Plan): number => {
  return plan === 'basico' ? 1.2 : 1.5;
};

export const primerMayuscula = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

// Constantes para opciones
export const MARCAS_OPTIONS = [
  { value: 'americano', label: 'Americano' },
  { value: 'europeo', label: 'Europeo' },
  { value: 'asiatico', label: 'Asiático' },
] as const;

export const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => ({
  value: year.toString(),
  label: year.toString(),
}));

export const PLAN_OPTIONS = [
  { value: 'basico', label: 'Básico' },
  { value: 'completo', label: 'Completo' },
] as const;
