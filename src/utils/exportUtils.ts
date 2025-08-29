import { primerMayuscula } from '../helpers/helper';
import type { Presupuesto } from '../types';

export const formatearFecha = (fecha: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(fecha);
};

export const formatearMoneda = (cantidad: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cantidad);
};

export const generarReportePresupuestos = (presupuestos: Presupuesto[]): string => {
  const fechaActual = formatearFecha(new Date());

  let reporte = `REPORTE DE PRESUPUESTOS DE SEGUROS\n`;
  reporte += `Generado el: ${fechaActual}\n`;
  reporte += `Total de presupuestos: ${presupuestos.length}\n\n`;

  if (presupuestos.length > 0) {
    const promedio = presupuestos.reduce((sum, p) => sum + p.cotizacion, 0) / presupuestos.length;
    const minimo = Math.min(...presupuestos.map(p => p.cotizacion));
    const maximo = Math.max(...presupuestos.map(p => p.cotizacion));

    reporte += `ESTADÍSTICAS:\n`;
    reporte += `- Cotización promedio: ${formatearMoneda(promedio)}\n`;
    reporte += `- Cotización mínima: ${formatearMoneda(minimo)}\n`;
    reporte += `- Cotización máxima: ${formatearMoneda(maximo)}\n\n`;

    reporte += `DETALLE DE PRESUPUESTOS:\n`;
    presupuestos.forEach((p, index) => {
      reporte += `\n${index + 1}. ${formatearFecha(p.fecha)}\n`;
      reporte += `   Marca: ${primerMayuscula(p.datos.marca)}\n`;
      reporte += `   Año: ${p.datos.year}\n`;
      reporte += `   Plan: ${primerMayuscula(p.datos.plan)}\n`;
      reporte += `   Cotización: ${formatearMoneda(p.cotizacion)}\n`;
      if (p.notas) reporte += `   Notas: ${p.notas}\n`;
      if (p.favorito) reporte += `   ⭐ Favorito\n`;
    });
  }

  return reporte;
};
