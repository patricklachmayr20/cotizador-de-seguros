# 🛡️ Cotizador de Seguros - Insurance Quote Calculator

> **Una aplicación web moderna y elegante para calcular cotizaciones de seguros de vehículos con gestión completa de historial y comparación de presupuestos.**

## 🎯 Descripción

**Cotizador de Seguros** es una aplicación web desarrollada con **React + TypeScript** que permite a los usuarios:

- ✅ **Calcular cotizaciones** de seguros de vehículos de forma rápida e intuitiva
- ✅ **Gestionar historial** completo de todos los presupuestos realizados
- ✅ **Comparar múltiples cotizaciones** lado a lado para tomar mejores decisiones
- ✅ **Exportar datos** en formato CSV para análisis externos
- ✅ **Interfaz moderna** con animaciones suaves y diseño responsive

---

## ✨ Características Principales

### 🚗 Cotización Inteligente
- **Cálculo automático** basado en marca, año y tipo de plan
- **Algoritmo de precios** que considera depreciación por antigüedad
- **Diferentes tipos de cobertura**: Básica y Completa
- **Soporte multi-marca**: Americanos, Europeos y Asiáticos

### 📊 Gestión de Historial
- **Guardado automático** de todas las cotizaciones
- **Persistencia local** - Los datos se mantienen entre sesiones
- **Filtros avanzados** por marca, plan, fechas y favoritos
- **Sistema de favoritos** para marcar las mejores cotizaciones
- **Límite inteligente** de 50 presupuestos para optimizar rendimiento

### ⚖️ Comparador Avanzado
- **Selección múltiple** de presupuestos para comparar
- **Vista lado a lado** con tabla comparativa detallada
- **Destacado automático** del mejor precio
- **Modal responsive** que funciona en todos los dispositivos

### 📱 Experiencia de Usuario
- **Diseño moderno** con gradientes y efectos visuales
- **Animaciones suaves** que mejoran la interacción
- **Totalmente responsive** - Funciona en móviles, tablets y desktop
- **Modo edición** para recalcular presupuestos existentes
- **Sistema de notificaciones** para feedback inmediato

### 🔧 Funcionalidades Técnicas
- **Exportación a CSV** con todos los datos del historial
- **Función de impresión** con formato profesional
- **Estadísticas en tiempo real** (promedio, mínimo, máximo)
- **Sistema de debug** integrado para desarrollo
- **Manejo de errores** robusto y user-friendly

---

## 🚀 Demo en Vivo

🔗 **[Ver Demo](https://cotizador-seguros-web.vercel.app)**

---

## ⚡ Inicio Rápido

### Prerrequisitos
- **Node.js** 18.0 o superior
- **npm** o **yarn**

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/cmurestudillos/cotizador-de-seguros.git
cd cotizador-de-seguros
```

2. **Instala las dependencias**
```bash
npm install
# o
yarn install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abre tu navegador** en `http://localhost:3000`

---

## 🏗️ Tecnologías Utilizadas

### Frontend
- **[React 18](https://reactjs.org/)** - Librería de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Vite](https://vitejs.dev/)** - Build tool ultra rápido
- **[Emotion](https://emotion.sh/)** - CSS-in-JS para estilos

### Funcionalidades
- **LocalStorage API** - Persistencia de datos
- **CSS Grid & Flexbox** - Layout responsive
- **CSS Animations** - Transiciones suaves
- **Modern ES6+** - JavaScript moderno

### Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo automático
- **Git Hooks** - Pre-commit validation

---

## 📁 Estructura del Proyecto

```
src/
├── components/                      # Componentes React
│   ├── ui/                          # Componentes base reutilizables
│   │   ├── Button.tsx
│   │   ├── Select.tsx
│   │   └── RadioGroup.tsx
│   ├── Header.tsx                   # Header con gradientes animados
│   ├── Formulario.tsx               # Formulario principal con validación
│   ├── Resumen.tsx                  # Resumen visual de la cotización
│   ├── Resultado.tsx                # Resultado con opciones de acción
│   ├── HistorialPresupuestos.tsx    # Gestión completa de historial
│   ├── ComparadorPresupuestos.tsx   # Modal de comparación
│   └── Spinner/                     # Componente de loading
├── hooks/                           # Custom hooks
│   ├── useInsuranceCalculator.ts    # Lógica de cálculo
│   └── usePresupuestosStorage.ts    # Gestión de almacenamiento
├── types/                           # Definiciones TypeScript
│   └── presupuesto.ts
├── helpers/                         # Funciones utilitarias
│   └── helper.ts                    # Cálculos y constantes
├── utils/                           # Utilidades generales
│   └── exportUtils.ts               # Funciones de exportación
├── styles/                          # Estilos globales
│   └── modern.css                   # CSS moderno con variables
└── App.tsx                          # Componente raíz
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

### 🐛 Reportar Bugs
1. Crea un [nuevo issue](https://github.com/cmurestudillos/cotizador-de-seguros/issues)
2. Describe el problema detalladamente
3. Incluye pasos para reproducir el error

### ✨ Nuevas Características
1. **Fork** el proyecto
2. Crea una **branch** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: Amazing new feature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### 📋 Roadmap
- [ ] **Modo offline** con Service Workers
- [ ] **Tema oscuro** automático
- [ ] **Multi-idioma** (ES/EN)
- [ ] **API integration** para cotizaciones reales
- [ ] **PDF export** de cotizaciones
- [ ] **Gráficos avanzados** con Chart.js
- [ ] **Base de datos** real (Firebase/Supabase)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

```
MIT License

Copyright (c) 2025 [Carlos Mur]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software")...
```

---

## 🙏 Agradecimientos

- **React Team** por la increíble librería
- **Vite** por el build tool más rápido
- **Emotion** por CSS-in-JS sin complicaciones
- **TypeScript** por hacer JavaScript más seguro
- **Comunidad Open Source** por la inspiración constante

---

## ⭐ ¿Te gusta el proyecto?

Si este proyecto te ha sido útil, considera darle una ⭐ en GitHub y compartirlo con otros desarrolladores.

**¡Tu apoyo significa mucho para seguir creando herramientas útiles!** 🚀

---

## 🔗 Enlaces Útiles

- [📚 Documentación de React](https://reactjs.org/docs)
- [📖 Guía de TypeScript](https://www.typescriptlang.org/docs)
- [⚡ Documentación de Vite](https://vitejs.dev/guide)
- [🎨 Emotion Documentation](https://emotion.sh/docs/introduction)
