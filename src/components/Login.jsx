import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Building2, UserPlus } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [registerUser, setRegisterUser] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [registerPass2, setRegisterPass2] = useState('');
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  useEffect(() => {
    // Si no hay usuario guardado, mostrar registro
    const savedUser = localStorage.getItem('qrapp_user');
    const savedPass = localStorage.getItem('qrapp_pass');
    if (!savedUser || !savedPass) {
      setIsRegister(true);
    } else {
      // Sugerir usuario guardado
      setUsername(savedUser);
    }
  }, []);

  // Registro de usuario
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!registerUser.trim() || !registerPass.trim()) {
      setError('Usuario y contraseña requeridos');
      return;
    }
    if (registerPass !== registerPass2) {
      setError('Las contraseñas no coinciden');
      return;
    }
    localStorage.setItem('qrapp_user', registerUser.trim().toLowerCase());
    localStorage.setItem('qrapp_pass', registerPass.trim());
    setIsRegister(false);
    setUsername(registerUser.trim());
    setPassword(registerPass);
    setRegisterUser('');
    setRegisterPass('');
    setRegisterPass2('');
    setError('Usuario creado correctamente. Inicie sesión.');
  };

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    const savedUser = localStorage.getItem('qrapp_user');
    const savedPass = localStorage.getItem('qrapp_pass');
    if (
      username.trim().toLowerCase() === savedUser &&
      password === savedPass
    ) {
      setShowSavePrompt(true); // Mostrar mensaje propio
      setTimeout(() => setShowSavePrompt(false), 4000);
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
          <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#2563eb', letterSpacing: 1 }}>{isRegister ? 'Crear Usuario' : 'Bienvenido'}</h1>
          <p style={{ color: '#64748b', fontWeight: 500 }}>{isRegister ? 'Registre un usuario para acceder' : 'Sistema de Gestión de Códigos QR'}</p>
        </motion.div>

        {isRegister ? (
          <motion.form 
            onSubmit={handleRegister}
            className="login-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="form-group">
              <label htmlFor="registerUser">Usuario</label>
              <input
                type="text"
                id="registerUser"
                value={registerUser}
                onChange={(e) => setRegisterUser(e.target.value)}
                placeholder="Cree su usuario"
                required
                className="form-input"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerPass">Contraseña</label>
              <input
                type="password"
                id="registerPass"
                value={registerPass}
                onChange={(e) => setRegisterPass(e.target.value)}
                placeholder="Cree su contraseña"
                required
                className="form-input"
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerPass2">Repetir Contraseña</label>
              <input
                type="password"
                id="registerPass2"
                value={registerPass2}
                onChange={(e) => setRegisterPass2(e.target.value)}
                placeholder="Repita la contraseña"
                required
                className="form-input"
                autoComplete="new-password"
              />
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
              whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #2563eb44' }}
              whileTap={{ scale: 0.98 }}
              style={{ marginTop: 20, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1 }}
            >
              <UserPlus size={18} style={{ marginRight: 8 }} /> Crear Usuario
            </motion.button>
          </motion.form>
        ) : (
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
        )}

        <motion.div 
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 24, fontWeight: 500 }}>
            © 2025 · Desarrollador de software: Garcen Aaron<br/>
            <span style={{ fontSize: '0.9rem', color: '#2563eb', fontWeight: 600 }}>
              Soluciones digitales a tu medida
            </span>
          </p>
        </motion.div>
      </motion.div>
      {showSavePrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            position: 'fixed',
            bottom: 32,
            left: 0,
            right: 0,
            margin: '0 auto',
            maxWidth: 340,
            background: '#2563eb',
            color: 'white',
            borderRadius: 12,
            padding: '1rem 1.5rem',
            textAlign: 'center',
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: '0 4px 24px #2563eb44',
          }}
        >
          ¿Desea guardar la contraseña en su navegador para autocompletar la próxima vez?
        </motion.div>
      )}
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