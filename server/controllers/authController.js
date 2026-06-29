const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'hlr-secret-key-2026';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const envUser = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Verify credentials
    let isValid = false;
    if (username === envUser) {
      // Check if envPassword is bcrypt hashed (starts with $2y$ or $2a$)
      if (envPassword.startsWith('$2a$') || envPassword.startsWith('$2b$')) {
        isValid = await bcrypt.compare(password, envPassword);
      } else {
        isValid = password === envPassword;
      }
    }

    if (isValid) {
      // Generate JWT
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        token,
        user: { username, role: 'admin' },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed.', error: error.message });
  }
};

const verify = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = { login, verify };
