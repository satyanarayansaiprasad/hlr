import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { verifyAdminSession } from '../services/api';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const response = await verifyAdminSession();
        setUser(response.data.user);
        setChecking(false);
      } catch (err) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/admin/login');
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-gray-500">Checking credentials...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: 'ri-dashboard-line', end: true },
    { name: 'Blog Posts', path: '/admin/blogs', icon: 'ri-article-line' },
    { name: 'Categories', path: '/admin/categories', icon: 'ri-folder-line' },
    { name: 'Tags', path: '/admin/tags', icon: 'ri-hashtag' },
    { name: 'Media Library', path: '/admin/media', icon: 'ri-image-line' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#191C1D] text-white flex flex-col fixed h-full z-40 border-r border-white/5">
        <div className="h-16 px-6 border-b border-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#003D9B] to-[#0052CC] rounded-lg flex items-center justify-center font-bold text-white shadow-md">
            H
          </div>
          <span className="font-display font-bold text-sm tracking-tight">
            Health Line <span className="text-[#0052CC]">CMS</span>
          </span>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0052CC] text-white shadow-lg shadow-[#0052CC]/15'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <i className={`${item.icon} text-lg`}></i>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0052CC]/20 border border-[#0052CC]/30 flex items-center justify-center text-[#91F78E] font-bold text-sm">
            {user?.username?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold truncate leading-none mb-1 capitalize">
              {user?.username || 'Admin'}
            </p>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              {user?.role || 'Administrator'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Log Out"
          >
            <i className="ri-logout-box-r-line"></i>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 flex-grow flex flex-col min-h-screen">
        <header className="h-16 px-8 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
          <h1 className="font-display font-black text-[#191C1D] text-lg">Control Board</h1>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="px-4 py-2 border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-[#191C1D] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <i className="ri-external-link-line text-sm"></i>
              View Live Website
            </Link>
          </div>
        </header>

        <main className="p-8 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
