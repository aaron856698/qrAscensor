import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Building2 } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Credenciales hardcodeadas
    if (username === 'conserjeria' && password === 'conserjeria3300') {
      onLogin(true);
    } else {
      setError('Usuario o contraseña incorrectos');
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientMove 6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div 
        className="login-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.95)',
          padding: '2.5rem',
          maxWidth: 400,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div 
          className="login-header"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
        >
          <motion.div 
            className="logo-container"
            initial={{ rotate: -20, scale: 0.7 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
          >
            <Building2 size={56} className="logo-icon" />
          </motion.div>
          <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#2563eb', letterSpacing: 1 }}>Bienvenido</h1>
          <p style={{ color: '#64748b', fontWeight: 500 }}>Sistema de Gestión de Códigos QR</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="login-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
              className="form-input"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
                className="form-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="login-button"
            disabled={isLoading}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #2563eb44' }}
            whileTap={{ scale: 0.98 }}
            style={{ marginTop: 20, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1 }}
          >
            {isLoading ? (
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </motion.button>
        </motion.form>

        <motion.div 
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 24 }}>© 2024 Sistema QR</p>
        </motion.div>
      </motion.div>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default Login; 