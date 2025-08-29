export interface DatosSeguro {
  marca: string;
  year: string;
  plan: string;
}

export interface Presupuesto {
  id: string;
  fecha: Date;
  cotizacion: number;
  datos: DatosSeguro;
  notas?: string;
  favorito?: boolean;
}

export interface ResumenSeguro {
  cotizacion: number;
  datos: DatosSeguro;
}

export type Marca = 'americano' | 'europeo' | 'asiatico';
export type Plan = 'basico' | 'completo';

export interface FiltrosPresupuesto {
  marca?: string;
  plan?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
  favoritos?: boolean;
}
