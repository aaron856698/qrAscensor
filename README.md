# Sistema de Gestión de Códigos QR por Unidad

Una aplicación móvil elegante y profesional para gestionar códigos QR por unidad de edificio, desarrollada con React, Vite y Framer Motion.

## 🚀 Características

- **Login seguro**: Autenticación local con credenciales predefinidas
- **Dashboard organizado**: Unidades organizadas por House (1-6)
- **Visualización de QR**: Muestra códigos QR específicos por unidad
- **Diseño responsive**: Optimizado para dispositivos móviles
- **Animaciones fluidas**: Transiciones y efectos visuales profesionales
- **Funcionalidades adicionales**: Descarga y compartir códigos QR

## 📱 Credenciales de Acceso

- **Usuario**: `conserjeria`
- **Contraseña**: `conserjeria3300`

## 🛠️ Instalación

1. **Instalar dependencias**:
   ```bash
   cd qr-app
   npm install
   npm install react-router-dom framer-motion lucide-react
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   - La aplicación se abrirá automáticamente en `http://localhost:5173`
   - Para acceso móvil, usa la IP de tu computadora en la red local

## 📁 Estructura del Proyecto

```
qr-app/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Componente de autenticación
│   │   ├── Dashboard.jsx      # Dashboard principal
│   │   └── QRViewer.jsx       # Visualizador de códigos QR
│   ├── App.jsx               # Componente principal
│   ├── App.css               # Estilos globales
│   └── main.jsx              # Punto de entrada
├── public/
│   └── Codigos QR - Visitas/ # Carpeta con códigos QR
└── package.json
```

## 🏢 Organización de Unidades

La aplicación organiza las unidades por House:

- **House 1**: Unidades 101-110
- **House 2**: Unidades 201-210
- **House 3**: Unidades 301-310
- **House 4**: Unidades 401-410
- **House 5**: Unidades 501-510
- **House 6**: Unidades 601-610

## 📱 Uso en Dispositivos Móviles

### Para desarrollo móvil:

1. **Encuentra tu IP local**:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. **Accede desde tu móvil**:
   - Conecta tu móvil a la misma red WiFi
   - Abre el navegador y ve a: `http://TU_IP:5173`
   - Ejemplo: `http://192.168.1.100:5173`

### Para producción móvil:

1. **Construir la aplicación**:
   ```bash
   npm run build
   ```

2. **Servir archivos estáticos**:
   ```bash
   npm run preview
   ```

## 🎨 Características de Diseño

- **Gradientes modernos**: Fondos con gradientes elegantes
- **Sombras suaves**: Efectos de profundidad profesionales
- **Animaciones fluidas**: Transiciones con Framer Motion
- **Iconografía**: Iconos de Lucide React
- **Responsive**: Adaptable a todos los tamaños de pantalla
- **Modo oscuro**: Soporte automático para preferencias del sistema

## 🔧 Personalización

### Cambiar credenciales:
Edita el archivo `src/components/Login.jsx`:
```javascript
if (username === 'conserjeria' && password === 'conserjeria3300') {
  // Cambia estas credenciales
}
```

### Agregar más unidades:
Edita el archivo `src/components/Dashboard.jsx`:
```javascript
const unitsData = {
  'House 1': ['101', '102', '103', /* ... */],
  // Agrega más houses o unidades
};
```

### Cambiar colores:
Edita las variables CSS en `src/App.css`:
```css
:root {
  --primary-color: #2563eb;  /* Color principal */
  --accent-color: #f59e0b;   /* Color de acento */
  /* ... más variables */
}
```

## 📋 Funcionalidades

### Login
- Autenticación local segura
- Validación de credenciales
- Animaciones de carga
- Manejo de errores

### Dashboard
- Vista organizada por House
- Navegación intuitiva
- Contador de unidades
- Botón de cerrar sesión

### QR Viewer
- Visualización de códigos QR
- Descarga de imágenes
- Compartir funcionalidad
- Navegación de regreso

## 🚀 Despliegue

### Para producción:
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` y pueden ser servidos desde cualquier servidor web estático.

### Para hosting:
- **Netlify**: Arrastra la carpeta `dist/` a Netlify
- **Vercel**: Conecta tu repositorio Git
- **GitHub Pages**: Usa la acción de GitHub Pages

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda, revisa:
1. La consola del navegador para errores
2. Los logs del servidor de desarrollo
3. La documentación de las dependencias utilizadas

## 🔒 Seguridad

- Las credenciales están hardcodeadas para simplicidad
- En producción, considera implementar autenticación real
- Los códigos QR se cargan desde archivos estáticos
- No se almacenan datos sensibles en el navegador

---

**Desarrollado con ❤️ usando React, Vite y Framer Motion**
