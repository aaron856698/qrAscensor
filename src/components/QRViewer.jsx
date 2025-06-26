import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, QrCode, Download, Share2, Building2 } from 'lucide-react';

const QRViewer = ({ onBack }) => {
  const { unit } = useParams();
  const [qrImage, setQrImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unitInfo, setUnitInfo] = useState({});

  useEffect(() => {
    loadQRCode();
  }, [unit]);

  const loadQRCode = async () => {
    setIsLoading(true);
    setError(null);

    // Determinar información de la unidad
    let unitName = '';
    let unitType = '';
    
    if (unit.startsWith('H')) {
      unitName = `House ${unit.substring(1)}`;
      unitType = 'House';
    } else if (unit.startsWith('UF ')) {
      unitName = `Unidad ${unit.substring(3)}`;
      unitType = 'Unidad';
    } else {
      unitName = unit;
      unitType = 'Código QR';
    }

    setUnitInfo({ name: unitName, type: unitType });

    try {
      // Intentar cargar el QR desde la carpeta de códigos QR
      const qrPath = `/Codigos QR - Visitas/${unit}.png`;
      
      // Verificar si la imagen existe
      const img = new Image();
      img.onload = () => {
        setQrImage(qrPath);
        setIsLoading(false);
      };
      img.onerror = () => {
        // Si no existe la imagen, generar un QR placeholder
        generatePlaceholderQR();
      };
      img.src = qrPath;
    } catch (err) {
      generatePlaceholderQR();
    }
  };

  const generatePlaceholderQR = () => {
    // Generar un QR placeholder usando una API online
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${unit}`;
    setQrImage(qrUrl);
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (qrImage) {
      const link = document.createElement('a');
      link.href = qrImage;
      link.download = `QR-${unit}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Código QR - ${unitInfo.name}`,
          text: `Código QR para acceso a ${unitInfo.name}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="qr-viewer-container">
      {/* Header */}
      <motion.header 
        className="qr-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.button
            onClick={onBack}
            className="back-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} />
            <span>Volver</span>
          </motion.button>
          
          <div className="unit-info">
            <Building2 size={24} className="unit-icon" />
            <h1>{unitInfo.name}</h1>
          </div>
        </div>
      </motion.header>

      {/* QR Content */}
      <motion.div 
        className="qr-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando código QR...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error al cargar el código QR</p>
            <motion.button
              onClick={loadQRCode}
              className="retry-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reintentar
            </motion.button>
          </div>
        ) : (
          <div className="qr-display">
            <motion.div 
              className="qr-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="qr-image-container">
                <img 
                  src={qrImage} 
                  alt={`Código QR ${unitInfo.name}`}
                  className="qr-image"
                  onError={() => setError('Error al cargar la imagen')}
                />
              </div>
              
              <div className="qr-info">
                <h2>Código QR - {unitInfo.name}</h2>
                <p>Escanea este código para acceder al ascensor</p>
                <span className="qr-type">{unitInfo.type}</span>
              </div>

              <div className="qr-actions">
                <motion.button
                  onClick={handleDownload}
                  className="action-button download"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  <span>Descargar</span>
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  className="action-button share"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={20} />
                  <span>Compartir</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="qr-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p>Mantenga este código QR visible para el acceso al ascensor</p>
      </motion.footer>
    </div>
  );
};

export default QRViewer; 