import React, { useEffect, useState } from 'react';
import { getMedia, uploadMedia, deleteMedia } from '../services/api';

const AdminMedia = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await getMedia();
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      await uploadMedia(formData);
      fetchMedia();
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await deleteMedia(id);
      fetchMedia();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const handleCopyUrl = (url) => {
    // Resolve absolute URL if relative path
    const absoluteUrl = url.startsWith('/')
      ? window.location.origin + url
      : url;
    navigator.clipboard.writeText(absoluteUrl);
    alert('URL copied to clipboard:\n' + absoluteUrl);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Media Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-[#191C1D]">Media Storage</h2>
          <p className="text-xs text-gray-400">Upload and link assets in clinical reviews</p>
        </div>

        <label className="px-5 py-3 bg-[#0052CC] text-white rounded-xl font-bold hover:bg-[#003D9B] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/10 text-xs uppercase tracking-wider">
          {uploading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Uploading...
            </>
          ) : (
            <>
              <i className="ri-upload-cloud-line text-lg"></i>
              Upload File
            </>
          )}
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-50">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.src = '/images/supplement.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleCopyUrl(file.url)}
                      className="w-9 h-9 bg-white text-[#191C1D] hover:bg-[#0052CC] hover:text-white rounded-xl flex items-center justify-center shadow transition-colors"
                      title="Copy URL"
                    >
                      <i className="ri-link-m"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="w-9 h-9 bg-white text-red-500 hover:bg-red-600 hover:text-white rounded-xl flex items-center justify-center shadow transition-colors"
                      title="Delete File"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {file.type}
                  </span>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <p
                    className="text-xs font-bold text-gray-700 truncate mb-1"
                    title={file.name}
                  >
                    {file.name}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>{formatBytes(file.sizeBytes)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 text-sm">
              <i className="ri-image-2-line text-4xl block mb-2 text-gray-300"></i>
              No media files uploaded yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
