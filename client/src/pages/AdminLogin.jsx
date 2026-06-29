import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAdmin(username, password);
      if (response.data && response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
        navigate('/admin');
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#003D9B]/10 to-[#0052CC]/5 pointer-events-none"></div>
      
      <div className="relative w-full max-w-md bg-white border border-gray-100 p-10 rounded-[32px] shadow-xl shadow-gray-200/50 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-gradient-to-tr from-[#003D9B] to-[#0052CC] rounded-2xl items-center justify-center text-white font-bold text-3xl shadow-lg mb-4">
            H
          </div>
          <h2 className="font-display font-bold text-2xl text-[#191C1D] mb-1">CMS Control Room</h2>
          <p className="text-sm text-gray-400">Authenticate to manage clinical reviews</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <i className="ri-error-warning-line text-lg"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Username</label>
            <div className="relative group">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#F3F4F5] p-4 pl-12 rounded-xl outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 font-semibold border-2 border-transparent focus:border-[#0052CC]/10 transition-all text-sm"
              />
              <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#0052CC] transition-colors"></i>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Password</label>
            <div className="relative group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F3F4F5] p-4 pl-12 rounded-xl outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 font-semibold border-2 border-transparent focus:border-[#0052CC]/10 transition-all text-sm"
              />
              <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#0052CC] transition-colors"></i>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#0052CC] text-white rounded-xl font-bold hover:bg-[#003D9B] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Access Dashboard
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
