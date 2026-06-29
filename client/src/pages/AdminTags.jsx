import React, { useEffect, useState } from 'react';
import { getTags, mergeTags } from '../services/api';

const AdminTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  // Merge Form State
  const [sourceTag, setSourceTag] = useState('');
  const [targetTag, setTargetTag] = useState('');
  const [merging, setMerging] = useState(false);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await getTags();
      setTags(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleMerge = async (e) => {
    e.preventDefault();
    if (sourceTag === targetTag) {
      alert('Source tag and Target tag must be different.');
      return;
    }
    if (!window.confirm(`Are you sure you want to merge tag "${sourceTag}" into "${targetTag}"? This will modify all post references.`)) return;

    setMerging(true);
    try {
      const res = await mergeTags(sourceTag, targetTag);
      alert(res.data.message);
      setSourceTag('');
      setTargetTag('');
      fetchTags();
    } catch (err) {
      alert('Merge failed.');
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Tags Listing */}
      <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h3 className="font-display font-bold text-xl text-[#191C1D] mb-2">Tag Library</h3>
        <p className="text-xs text-gray-400 mb-6">Keywords used for articles and clinical indexes</p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <div
                  key={tag.name}
                  className="bg-[#F3F4F5] px-4 py-2 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 border border-gray-100 hover:border-gray-300 transition-colors"
                >
                  <span className="text-[#0052CC]">#</span>
                  {tag.name}
                  <span className="w-5 h-5 rounded-full bg-white text-[10px] text-gray-400 font-bold flex items-center justify-center border border-gray-100">
                    {tag.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-xs py-8 w-full">No keywords registered in the database.</p>
            )}
          </div>
        )}
      </div>

      {/* Merge Panel */}
      <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm h-fit">
        <h3 className="font-display font-bold text-xl text-[#191C1D] mb-2">Merge Keywords</h3>
        <p className="text-xs text-gray-400 mb-6">
          Combine similar tags to prevent clinical duplicates (e.g. merge "supplement" into "supplements")
        </p>

        <form onSubmit={handleMerge} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Source Keyword (Delete)</label>
            <select
              value={sourceTag}
              onChange={(e) => setSourceTag(e.target.value)}
              required
              className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-600 text-sm font-bold"
            >
              <option value="">Select source keyword</option>
              {tags.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} ({t.count} posts)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Target Keyword (Keep)</label>
            <select
              value={targetTag}
              onChange={(e) => setTargetTag(e.target.value)}
              required
              className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-600 text-sm font-bold"
            >
              <option value="">Select target keyword</option>
              {tags.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} ({t.count} posts)
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={merging || !sourceTag || !targetTag}
            className="w-full py-3 bg-[#0052CC] text-white rounded-xl text-xs font-bold hover:bg-[#003D9B] disabled:opacity-50 transition-all"
          >
            {merging ? 'Merging...' : 'Execute Merge'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminTags;
