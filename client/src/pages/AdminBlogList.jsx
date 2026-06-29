import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getReviewsAdmin,
  getCategories,
  deleteReview,
  restoreReview,
  duplicateReview,
  bulkReviewsAction,
} from '../services/api';

const AdminBlogList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const [bulkAction, setBulkAction] = useState('');
  const [bulkCategory, setBulkCategory] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {
        q: search,
        category: selectedCategory,
        status: selectedStatus,
        page,
        limit,
      };
      const res = await getReviewsAdmin(params);
      if (res.data && res.data.posts) {
        setPosts(res.data.posts);
        setTotal(res.data.total);
      } else {
        setPosts(res.data || []);
        setTotal((res.data || []).length);
      }
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
    setSelectedIds([]);
  }, [search, selectedCategory, selectedStatus, page]);

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(posts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await deleteReview(id);
      fetchPosts();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreReview(id);
      fetchPosts();
    } catch (err) {
      alert('Restore failed.');
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await duplicateReview(id);
      fetchPosts();
    } catch (err) {
      alert('Duplicate failed.');
    }
  };

  const handleBulkSubmit = async () => {
    if (!bulkAction) return;
    if (selectedIds.length === 0) {
      alert('Select at least one post.');
      return;
    }

    let categoryParams = {};
    if (bulkAction === 'category') {
      if (!bulkCategory) {
        alert('Please select a target category.');
        return;
      }
      const catObj = categories.find((c) => c.id === bulkCategory);
      categoryParams = {
        category: catObj.name,
        categorySlug: catObj.id,
      };
    }

    try {
      await bulkReviewsAction({
        ids: selectedIds,
        action: bulkAction,
        ...categoryParams,
      });
      setSelectedIds([]);
      setBulkAction('');
      setBulkCategory('');
      fetchPosts();
    } catch (err) {
      alert('Bulk action failed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-[#191C1D]">Clinical Library</h2>
          <p className="text-xs text-gray-400">Total of {total} reviews recorded</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="px-5 py-3 bg-[#0052CC] text-white rounded-xl font-bold hover:bg-[#003D9B] transition-all flex items-center gap-2 shadow-lg shadow-blue-600/10 text-xs uppercase tracking-wider"
        >
          <i className="ri-add-line text-lg"></i>
          Create New Review
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative group w-full md:flex-grow">
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#F3F4F5] p-3.5 pl-12 rounded-xl outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 font-semibold border-2 border-transparent focus:border-[#0052CC]/10 transition-all text-xs"
          />
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#0052CC] transition-colors"></i>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          className="bg-[#F3F4F5] p-3.5 rounded-xl border-2 border-transparent outline-none text-xs font-bold text-gray-600 w-full md:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setPage(1);
          }}
          className="bg-[#F3F4F5] p-3.5 rounded-xl border-2 border-transparent outline-none text-xs font-bold text-gray-600 w-full md:w-48"
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="deleted">Deleted (Trash)</option>
        </select>
      </div>

      {/* Bulk Operations Panel */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold text-[#0052CC]">
            {selectedIds.length} posts selected
          </span>
          <div className="flex items-center gap-3">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="bg-white p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600"
            >
              <option value="">Choose Bulk Action</option>
              <option value="publish">Publish Selected</option>
              <option value="draft">Draft Selected</option>
              <option value="delete">Soft Delete Selected</option>
              <option value="category">Change Category</option>
            </select>

            {bulkAction === 'category' && (
              <select
                value={bulkCategory}
                onChange={(e) => setBulkCategory(e.target.value)}
                className="bg-white p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 animate-fade-in"
              >
                <option value="">Target Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handleBulkSubmit}
              disabled={!bulkAction}
              className="px-4 py-2.5 bg-[#0052CC] text-white text-xs font-bold rounded-xl hover:bg-[#003D9B] disabled:opacity-50 transition-all"
            >
              Execute
            </button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold uppercase text-gray-400 tracking-wider">
                  <th className="pb-4 w-12">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        posts.length > 0 && selectedIds.length === posts.length
                      }
                      className="rounded accent-[#0052CC]"
                    />
                  </th>
                  <th className="pb-4">Article</th>
                  <th className="pb-4 w-40">Category</th>
                  <th className="pb-4 w-32">Status</th>
                  <th className="pb-4 w-44">Date</th>
                  <th className="pb-4 w-48 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      className={`hover:bg-gray-50/30 transition-colors ${
                        post.deletedAt ? 'opacity-60 bg-red-50/10' : ''
                      }`}
                    >
                      <td className="py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(post.id)}
                          onChange={() => handleSelectRow(post.id)}
                          className="rounded accent-[#0052CC]"
                        />
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                            <img
                              src={post.image || '/images/supplement.png'}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/images/supplement.png';
                              }}
                            />
                          </div>
                          <div>
                            <span className="font-bold text-[#191C1D] block max-w-sm truncate leading-tight mb-1">
                              {post.title}
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                              Slug: {post.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 font-medium">{post.category}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            post.deletedAt
                              ? 'bg-red-50 text-red-500'
                              : post.status === 'published'
                              ? 'bg-green-50 text-green-600'
                              : post.status === 'scheduled'
                              ? 'bg-purple-50 text-purple-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {post.deletedAt ? 'Trash' : post.status}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-gray-400 font-bold capitalize">
                        {post.date || 'No Date'}
                      </td>
                      <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                        {post.deletedAt ? (
                          <>
                            <button
                              onClick={() => handleRestore(post.id)}
                              className="px-2.5 py-1.5 bg-green-50 hover:bg-green-600 text-green-600 hover:text-white rounded-lg text-xs font-bold transition-all"
                            >
                              Restore
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to={`/admin/blogs/edit/${post.id}`}
                              className="px-2.5 py-1.5 bg-blue-50 hover:bg-[#0052CC] text-[#0052CC] hover:text-white rounded-lg text-xs font-bold transition-all"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDuplicate(post.id)}
                              className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-600 text-gray-600 hover:text-white rounded-lg text-xs font-bold transition-all"
                              title="Duplicate"
                            >
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-lg text-xs font-bold transition-all"
                              title="Delete"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-20 text-center text-gray-400 text-sm">
                      No matching reviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Control */}
        {total > limit && (
          <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-6">
            <span className="text-xs text-gray-400 font-semibold">
              Showing {(page - 1) * limit + 1} -{' '}
              {Math.min(page * limit, total)} of {total} reviews
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page * limit >= total}
                className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogList;
