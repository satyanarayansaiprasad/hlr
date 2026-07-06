import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, seedDatabase } from '../services/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async (force = false) => {
    if (force && !window.confirm("WARNING: Force re-seeding will clear and overwrite database records with the original 232 reviews. Are you sure you want to proceed?")) {
      return;
    }
    setSeeding(true);
    try {
      const res = await seedDatabase(force);
      alert(res.data.message || "Database seeded successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to seed database: " + (err.response?.data?.message || err.message));
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setData(res.data);
      } catch (err) {
        setError('Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-2">
        <i className="ri-error-warning-line text-lg"></i>
        {error}
      </div>
    );
  }

  const { stats, recentBlogs, recentActivity } = data;

  const cardStats = [
    { name: 'Total Reviews', value: stats.totalBlogs, icon: 'ri-article-line', bg: 'bg-blue-50 text-blue-600' },
    { name: 'Published', value: stats.publishedBlogs, icon: 'ri-checkbox-circle-line', bg: 'bg-green-50 text-green-600' },
    { name: 'Drafts', value: stats.draftBlogs, icon: 'ri-edit-circle-line', bg: 'bg-amber-50 text-amber-600' },
    { name: 'Scheduled', value: stats.scheduledBlogs || 0, icon: 'ri-calendar-todo-line', bg: 'bg-purple-50 text-purple-600' },
    { name: 'Categories', value: stats.totalCategories, icon: 'ri-folder-line', bg: 'bg-teal-50 text-teal-600' },
    { name: 'Unique Tags', value: stats.totalTags, icon: 'ri-hashtag', bg: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cardStats.map((item) => (
          <div key={item.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.bg}`}>
              <i className={item.icon}></i>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">{item.name}</p>
              <h3 className="font-display font-black text-2xl text-[#191C1D] leading-none">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Blogs */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-[#191C1D]">Recent Clinical Reviews</h3>
              <p className="text-xs text-gray-400">Manage the latest submissions to your library</p>
            </div>
            <Link
              to="/admin/blogs"
              className="text-xs font-bold text-[#0052CC] hover:underline uppercase tracking-wider"
            >
              See all posts →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold uppercase text-gray-400 tracking-wider">
                  <th className="pb-4">Article Title</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {recentBlogs && recentBlogs.length > 0 ? (
                  recentBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 font-semibold text-[#191C1D] max-w-xs truncate">
                        {blog.title}
                      </td>
                      <td className="py-4 text-gray-500 font-medium">
                        {blog.category}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            blog.status === 'published'
                              ? 'bg-green-50 text-green-600'
                              : blog.status === 'scheduled'
                              ? 'bg-purple-50 text-purple-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="px-3 py-1.5 bg-[#0052CC]/5 text-[#0052CC] hover:bg-[#0052CC] hover:text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-gray-400 text-sm">
                      No blog posts in database yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Activity Feed */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-[#191C1D] mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                      activity.type === 'post' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <i className={activity.type === 'post' ? 'ri-article-line' : 'ri-information-line'}></i>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm font-semibold leading-normal">{activity.text}</p>
                      <span className="text-[10px] text-gray-400 font-bold">{activity.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 text-sm py-8">No activities recorded.</p>
              )}
            </div>
          </div>

          {/* Database Seeder Tools */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-[#191C1D] mb-2">Database Seeder</h3>
            <p className="text-xs text-gray-400 mb-6">Import or reset static review entries directly into your active database.</p>
            <div className="space-y-3">
              <button
                onClick={() => handleSeed(false)}
                disabled={seeding}
                className="w-full py-3 bg-[#0052CC] text-white rounded-xl text-xs font-bold hover:bg-[#003D9B] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {seeding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Syncing...
                  </>
                ) : (
                  <>
                    <i className="ri-database-2-line text-sm"></i>
                    Sync 232 Reviews
                  </>
                )}
              </button>
              <button
                onClick={() => handleSeed(true)}
                disabled={seeding}
                className="w-full py-3 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-refresh-line text-sm"></i>
                Force Clear & Re-seed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
