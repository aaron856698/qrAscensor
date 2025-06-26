import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, QrCode, Building2, Home } from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // Datos reales basados en los códigos QR existentes
  const unitsData = {
    'Piso 1': [
      { id: 'H1', name: 'House 1', type: 'house', piso: 'Piso 1' },
      { id: 'UF 101', name: 'Unidad 101', type: 'unit' },
      { id: 'UF 102', name: 'Unidad 102', type: 'unit' },
      { id: 'UF 103', name: 'Unidad 103', type: 'unit' },
      { id: 'UF 104', name: 'Unidad 104', type: 'unit' }
    ],
    'Piso 2': [
      { id: 'H2', name: 'House 2', type: 'house', piso: 'Piso 2' },
      { id: 'UF 201', name: 'Unidad 201', type: 'unit' },
      { id: 'UF 202', name: 'Unidad 202', type: 'unit' },
      { id: 'UF 203', name: 'Unidad 203', type: 'unit' },
      { id: 'UF 204', name: 'Unidad 204', type: 'unit' },
      { id: 'UF 205', name: 'Unidad 205', type: 'unit' },
      { id: 'UF 206', name: 'Unidad 206', type: 'unit' }
    ],
    'Piso 3': [
      { id: 'H3', name: 'House 3', type: 'house', piso: 'Piso 3' },
      { id: 'UF 301', name: 'Unidad 301', type: 'unit' },
      { id: 'UF 302', name: 'Unidad 302', type: 'unit' },
      { id: 'UF 303', name: 'Unidad 303', type: 'unit' },
      { id: 'UF 304', name: 'Unidad 304', type: 'unit' },
      { id: 'UF 305', name: 'Unidad 305', type: 'unit' },
      { id: 'UF 306', name: 'Unidad 306', type: 'unit' }
    ],
    'Piso 4': [
      { id: 'H4', name: 'House 4', type: 'house', piso: 'Piso 4' },
      { id: 'UF 401', name: 'Unidad 401', type: 'unit' },
      { id: 'UF 402', name: 'Unidad 402', type: 'unit' },
      { id: 'UF 403', name: 'Unidad 403', type: 'unit' },
      { id: 'UF 404', name: 'Unidad 404', type: 'unit' },
      { id: 'UF 405', name: 'Unidad 405', type: 'unit' }
    ],
    'Piso 5': [
      { id: 'H5', name: 'House 5', type: 'house', piso: 'Piso 5' },
      { id: 'UF 501', name: 'Unidad 501', type: 'unit' },
      { id: 'UF 502', name: 'Unidad 502', type: 'unit' },
      { id: 'UF 503', name: 'Unidad 503', type: 'unit' },
      { id: 'UF 504', name: 'Unidad 504', type: 'unit' },
      { id: 'UF 505', name: 'Unidad 505', type: 'unit' }
    ],
    'Piso 6': [
      { id: 'H6', name: 'House 6', type: 'house', piso: 'Piso 6' }
    ]
  };

  const handleUnitClick = (unit) => {
    navigate(`/qr/${unit.id}`);
  };

  const handleLogout = () => {
    onLogout();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div className="header-left">
            <Building2 size={32} className="header-icon" />
            <div>
              <h1>Sistema de Acceso</h1>
              <p>Seleccione una unidad o piso para ver su código QR</p>
            </div>
          </div>
          <motion.button
            onClick={handleLogout}
            className="logout-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Content */}
      <motion.div 
        className="dashboard-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(unitsData).map(([pisoName, units]) => (
          <motion.div 
            key={pisoName} 
            className="house-section"
            variants={itemVariants}
          >
            <div className="house-header">
              <Home size={24} className="house-icon" />
              <h2>{pisoName}</h2>
            </div>
            
            <div className="units-grid">
              {units.map((unit) => (
                <motion.button
                  key={unit.id}
                  onClick={() => handleUnitClick(unit)}
                  className={`unit-card ${unit.type === 'house' ? 'house-card' : 'unit-card'}`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <QrCode size={24} className="unit-icon" />
                  <span className="unit-number">{unit.type === 'house' ? unit.name : unit.name}</span>
                  {unit.type === 'house' && (
                    <span className="unit-type">House</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="dashboard-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p>Total de códigos QR disponibles: {Object.values(unitsData).flat().length}</p>
      </motion.footer>
    </div>
  );
};

export default Dashboard; 