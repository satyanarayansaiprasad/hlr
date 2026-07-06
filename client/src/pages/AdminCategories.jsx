import React, { useEffect, useState } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  seedDatabase,
} from '../services/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('ri-health-book-line');
  const [order, setOrder] = useState('10');
  const [editId, setEditId] = useState(null);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const res = await seedDatabase(false);
      alert(res.data.message || 'Database seeded successfully!');
      fetchCategories();
    } catch (err) {
      alert('Seeding failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        icon,
        order: parseInt(order, 10),
      };

      if (editId) {
        await updateCategory(editId, payload);
      } else {
        await createCategory(payload);
      }

      setName('');
      setIcon('ri-health-book-line');
      setOrder('10');
      setEditId(null);
      fetchCategories();
    } catch (err) {
      alert('Operation failed.');
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
    setIcon(cat.icon || 'ri-health-book-line');
    setOrder(cat.order?.toString() || '10');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* List Categories */}
      <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h3 className="font-display font-bold text-xl text-[#191C1D] mb-2">Category Verticals</h3>
        <p className="text-xs text-gray-400 mb-6">Order of appearance on home header dropdown menu</p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[30px] border border-dashed border-gray-200">
            <i className="ri-folder-open-line text-4xl text-gray-300 block mb-3 animate-pulse"></i>
            <p className="text-sm text-gray-500 font-semibold mb-4">No categories registered in the database yet.</p>
            <button
              onClick={handleSeed}
              className="px-5 py-2.5 bg-[#0052CC] text-white rounded-xl text-xs font-bold hover:bg-[#003D9B] transition-all shadow-md shadow-blue-600/10"
            >
              Sync 232 Reviews & Categories
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold uppercase text-gray-400 tracking-wider">
                  <th className="pb-4 w-16 text-center">Order</th>
                  <th className="pb-4">Icon</th>
                  <th className="pb-4">Category Name</th>
                  <th className="pb-4">Slug ID</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-center font-bold text-gray-400">
                      {cat.order}
                    </td>
                    <td className="py-4">
                      <div className="w-9 h-9 bg-[#0052CC]/5 text-[#0052CC] rounded-xl flex items-center justify-center text-lg">
                        <i className={cat.icon || 'ri-health-book-line'}></i>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-[#191C1D]">
                      {cat.name}
                    </td>
                    <td className="py-4 text-xs font-mono text-gray-400">{cat.id}</td>
                    <td className="py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="px-2.5 py-1.5 bg-blue-50 text-[#0052CC] rounded-lg text-xs font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="px-2.5 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor Panel */}
      <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm h-fit">
        <h3 className="font-display font-bold text-xl text-[#191C1D] mb-6">
          {editId ? 'Edit Category' : 'Create Category'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Category Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Brain Supplements"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 text-sm font-semibold transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Icon Class Name</label>
            <input
              type="text"
              required
              placeholder="e.g. ri-brain-line"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 text-sm font-semibold transition-all"
            />
            <span className="text-[10px] text-gray-400 block mt-1.5">
              Supports RemixIcon icon classes. Check remixicon.com.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Display Order</label>
            <input
              type="number"
              required
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 text-sm font-semibold transition-all"
            />
          </div>

          <div className="flex gap-2 pt-4">
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setName('');
                  setIcon('ri-health-book-line');
                  setOrder('10');
                }}
                className="flex-grow py-3 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-grow py-3 bg-[#0052CC] text-white rounded-xl text-xs font-bold hover:bg-[#003D9B] transition-all"
            >
              {editId ? 'Update Vertical' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategories;
