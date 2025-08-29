import { useState, useEffect, useCallback } from 'react';
import type { Presupuesto, FiltrosPresupuesto } from '../types';

const STORAGE_KEY = 'cotizador-presupuestos';
const MAX_PRESUPUESTOS = 50;

export const usePresupuestosStorage = () => {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar desde localStorage
  const cargarPresupuestos = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('Cargando desde localStorage:', stored); // Debug

      if (stored) {
        const parsed = JSON.parse(stored);
        const presupuestosConFechas = parsed.map((p: any) => ({
          ...p,
          fecha: new Date(p.fecha),
        }));
        console.log('Presupuestos cargados:', presupuestosConFechas); // Debug
        setPresupuestos(presupuestosConFechas);
      } else {
        console.log('No hay presupuestos guardados'); // Debug
        setPresupuestos([]);
      }
    } catch (error) {
      console.error('Error al cargar presupuestos:', error);
      setPresupuestos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para guardar en localStorage
  const guardarPresupuestos = useCallback((nuevosPresupuestos: Presupuesto[]) => {
    try {
      console.log('Guardando presupuestos:', nuevosPresupuestos); // Debug
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosPresupuestos));
      console.log('Guardado exitoso en localStorage'); // Debug
    } catch (error) {
      console.error('Error al guardar presupuestos:', error);
    }
  }, []);

  // Cargar presupuestos al inicializar
  useEffect(() => {
    cargarPresupuestos();
  }, [cargarPresupuestos]);

  // Agregar nuevo presupuesto
  const agregarPresupuesto = useCallback(
    (cotizacion: number, datos: any, notas?: string) => {
      const nuevoPresupuesto: Presupuesto = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        fecha: new Date(),
        cotizacion,
        datos,
        notas,
        favorito: false,
      };

      console.log('Agregando nuevo presupuesto:', nuevoPresupuesto); // Debug

      setPresupuestos(prev => {
        const nuevos = [nuevoPresupuesto, ...prev].slice(0, MAX_PRESUPUESTOS);
        guardarPresupuestos(nuevos);
        return nuevos;
      });

      return nuevoPresupuesto.id;
    },
    [guardarPresupuestos]
  );

  // Eliminar presupuesto
  const eliminarPresupuesto = useCallback(
    (id: string) => {
      console.log('Eliminando presupuesto:', id); // Debug
      setPresupuestos(prev => {
        const filtrados = prev.filter(p => p.id !== id);
        guardarPresupuestos(filtrados);
        return filtrados;
      });
    },
    [guardarPresupuestos]
  );

  // Toggle favorito
  const toggleFavorito = useCallback(
    (id: string) => {
      console.log('Toggle favorito:', id); // Debug
      setPresupuestos(prev => {
        const actualizados = prev.map(p => (p.id === id ? { ...p, favorito: !p.favorito } : p));
        guardarPresupuestos(actualizados);
        return actualizados;
      });
    },
    [guardarPresupuestos]
  );

  // Actualizar notas
  const actualizarNotas = useCallback(
    (id: string, notas: string) => {
      setPresupuestos(prev => {
        const actualizados = prev.map(p => (p.id === id ? { ...p, notas } : p));
        guardarPresupuestos(actualizados);
        return actualizados;
      });
    },
    [guardarPresupuestos]
  );

  // Filtrar presupuestos
  const filtrarPresupuestos = useCallback(
    (filtros: FiltrosPresupuesto) => {
      return presupuestos.filter(presupuesto => {
        if (filtros.marca && presupuesto.datos.marca !== filtros.marca) return false;
        if (filtros.plan && presupuesto.datos.plan !== filtros.plan) return false;
        if (filtros.favoritos && !presupuesto.favorito) return false;
        if (filtros.fechaDesde && presupuesto.fecha < filtros.fechaDesde) return false;
        if (filtros.fechaHasta && presupuesto.fecha > filtros.fechaHasta) return false;
        return true;
      });
    },
    [presupuestos]
  );

  // Limpiar historial
  const limpiarHistorial = useCallback(() => {
    console.log('Limpiando historial completo'); // Debug
    setPresupuestos([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Exportar CSV
  const exportarCSV = useCallback(() => {
    const headers = ['Fecha', 'Marca', 'Año', 'Plan', 'Cotización', 'Notas', 'Favorito'];
    const rows = presupuestos.map(p => [
      p.fecha.toLocaleDateString(),
      p.datos.marca,
      p.datos.year,
      p.datos.plan,
      p.cotizacion.toString(),
      p.notas || '',
      p.favorito ? 'Sí' : 'No',
    ]);

    const csvContent = [headers, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `presupuestos-seguros-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [presupuestos]);

  // Recargar desde localStorage (útil para debug)
  const recargarPresupuestos = useCallback(() => {
    console.log('Recargando presupuestos desde localStorage...'); // Debug
    cargarPresupuestos();
  }, [cargarPresupuestos]);

  return {
    presupuestos,
    loading,
    agregarPresupuesto,
    eliminarPresupuesto,
    toggleFavorito,
    actualizarNotas,
    filtrarPresupuestos,
    limpiarHistorial,
    exportarCSV,
    recargarPresupuestos, // Para debug
  };
};
