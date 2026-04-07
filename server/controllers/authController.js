const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const validUser = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username === validUser && password === validPassword) {
      return res.status(200).json({ success: true, message: 'Login successful.' });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed.', error: error.message });
  }
};

module.exports = { login };
