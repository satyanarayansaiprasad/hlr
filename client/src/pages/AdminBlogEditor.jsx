import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getReviewsAdmin,
  getCategories,
  getAuthors,
  getProducts,
  createReview,
  updateReview,
  getReviewBySlug,
  uploadMedia
} from '../services/api';
import RichTextEditor from '../components/RichTextEditor';

const AdminBlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [products, setProducts] = useState([]);

  // Post State Fields
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categorySlug, setCategorySlug] = useState('general');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('4.5');
  const [readTime, setReadTime] = useState('5 min read');
  const [authorId, setAuthorId] = useState('');
  const [status, setStatus] = useState('draft');
  const [publishDate, setPublishDate] = useState('');

  // Pros & Cons
  const [pros, setPros] = useState([]);
  const [newPro, setNewPro] = useState('');
  const [cons, setCons] = useState([]);
  const [newCon, setNewCon] = useState('');

  // FAQs
  const [faqs, setFaqs] = useState([]);
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // Product Attachment
  const [hasProduct, setHasProduct] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('$59.00');
  const [productRating, setProductRating] = useState('4.5');
  const [productImage, setProductImage] = useState('');
  const [productBuyUrl, setProductBuyUrl] = useState('');

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  // Image Upload helper
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getCategories();
        setCategories(catRes.data);

        const authRes = await getAuthors();
        setAuthors(authRes.data);
        if (authRes.data.length > 0 && !authorId) {
          setAuthorId(authRes.data[0].id);
        }

        const prodRes = await getProducts();
        setProducts(prodRes.data);

        if (isEditMode) {
          // Fetch existing post details by slug or ID
          try {
            const res = await getReviewBySlug(id);
            const existingPost = res.data;
            if (existingPost) {
              setTitle(existingPost.title || '');
              setExcerpt(existingPost.excerpt || '');
              setContent(existingPost.content || '');
              setCategorySlug(existingPost.categorySlug || 'general');
              setImage(existingPost.image || '');
              setRating(existingPost.rating?.toString() || '4.5');
              setReadTime(existingPost.readTime || '5 min read');
              setAuthorId(existingPost.authorId || '');
              setStatus(existingPost.status || 'draft');
              setPublishDate(existingPost.publishDate ? existingPost.publishDate.substring(0, 16) : '');

              setPros(existingPost.pros || []);
              setCons(existingPost.cons || []);
              setFaqs(existingPost.faqs || []);

              if (existingPost.product) {
                setHasProduct(true);
                setProductName(existingPost.product.name || '');
                setProductPrice(existingPost.product.price || '$59.00');
                setProductRating(existingPost.product.rating?.toString() || '4.5');
                setProductImage(existingPost.product.image || '');
                setProductBuyUrl(existingPost.product.buyUrl || '');
              }

              setMetaTitle(existingPost.metaTitle || '');
              setMetaDescription(existingPost.metaDescription || '');
              setKeywords(existingPost.keywords ? existingPost.keywords.join(', ') : '');
            }
          } catch (loadErr) {
            console.error('Failed to load post for editing:', loadErr);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [id, isEditMode]);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploadingImage(true);

    try {
      const res = await uploadMedia(formData);
      if (type === 'featured') {
        setImage(res.data.imageUrl);
      } else if (type === 'product') {
        setProductImage(res.data.imageUrl);
      }
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddPro = () => {
    if (!newPro.trim()) return;
    setPros([...pros, newPro.trim()]);
    setNewPro('');
  };

  const handleRemovePro = (index) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const handleAddCon = () => {
    if (!newCon.trim()) return;
    setCons([...cons, newCon.trim()]);
    setNewCon('');
  };

  const handleRemoveCon = (index) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  const handleAddFaq = () => {
    if (!faqQ.trim() || !faqA.trim()) return;
    setFaqs([...faqs, { q: faqQ.trim(), a: faqA.trim() }]);
    setFaqQ('');
    setFaqA('');
  };

  const handleRemoveFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Find category name
    const categoryName = categories.find(c => c.id === categorySlug)?.name || 'General';

    const postPayload = {
      title,
      excerpt,
      content,
      category: categoryName,
      categorySlug,
      image,
      rating: parseFloat(rating),
      readTime,
      authorId,
      status,
      publishDate: publishDate ? new Date(publishDate).toISOString() : new Date().toISOString(),
      pros,
      cons,
      faqs,
      keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
    };

    if (hasProduct) {
      postPayload.product = {
        name: productName,
        price: productPrice,
        rating: parseFloat(productRating),
        image: productImage || image,
        buyUrl: productBuyUrl,
      };
      postPayload.buyUrl = productBuyUrl;
    } else {
      postPayload.product = null;
      postPayload.buyUrl = '';
    }

    try {
      if (isEditMode) {
        await updateReview(id, postPayload);
      } else {
        await createReview(postPayload);
      }
      navigate('/admin/blogs');
    } catch (err) {
      alert(err.response?.data?.message || 'Save operation failed.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'General Content' },
    { id: 'breakdown', name: 'Clinical Pros & Cons' },
    { id: 'faqs', name: 'Expert Answers (FAQs)' },
    { id: 'seo', name: 'SEO & Metadata' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Editor Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-[#191C1D]">
            {isEditMode ? 'Modify Clinical Review' : 'Publish New Clinical Review'}
          </h2>
          <p className="text-xs text-gray-400">
            {isEditMode ? `ID: ${id}` : 'Create a new medical review card'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/blogs')}
          className="px-4 py-2 border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-[#191C1D] rounded-xl text-xs font-bold transition-all"
        >
          Cancel
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#0052CC] text-[#0052CC]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
        
        {/* Tab 1: General Info */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Review Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Citrus Burn Review 2026: The Stimulant-Free Path..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 focus:border-[#0052CC]/10 text-gray-700 text-sm font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Category</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 focus:border-[#0052CC]/10 text-gray-600 text-sm font-bold transition-all"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Short Excerpt / Summary</label>
              <textarea
                rows="2"
                placeholder="Brief introductory summary..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 focus:border-[#0052CC]/10 text-gray-700 text-sm font-medium transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Featured Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/assets/hlr/image.png"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-grow bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-700 text-sm transition-all"
                  />
                  <label className="px-3.5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-bold text-gray-600 cursor-pointer flex items-center justify-center">
                    Upload
                    <input type="file" onChange={(e) => handleImageUpload(e, 'featured')} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Scientific Score (Rating)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-700 text-sm font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Read Time</label>
                <input
                  type="text"
                  placeholder="8 min read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-700 text-sm font-semibold transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Medical Reviewer (Author)</label>
                <select
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-600 text-sm font-bold transition-all"
                >
                  <option value="">Select Author</option>
                  {authors.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Publishing Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-600 text-sm font-bold transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Publish Instantly</option>
                  <option value="scheduled">Schedule Post</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Schedule Date & Time</label>
                <input
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  disabled={status !== 'scheduled'}
                  className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-600 text-sm disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Clinical Review Body (Content Editor)</label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your clinical review content here..."
              />
            </div>
          </div>
        )}

        {/* Tab 2: Editorial Breakdown */}
        {activeTab === 'breakdown' && (
          <div className="space-y-8 animate-fade-in">
            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pros */}
              <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-100">
                <h4 className="font-display font-bold text-sm text-[#006E1C] mb-4 flex items-center gap-1.5">
                  <i className="ri-check-line text-lg"></i>
                  Clinical Pros
                </h4>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Add beneficial proof..."
                    value={newPro}
                    onChange={(e) => setNewPro(e.target.value)}
                    className="flex-grow bg-white p-2.5 rounded-xl border border-gray-200 outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddPro}
                    className="px-4 bg-[#006E1C] text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-2">
                  {pros.map((p, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-white px-3.5 py-2 rounded-lg border border-gray-100 text-xs font-semibold text-gray-700">
                      <span className="truncate pr-4">{p}</span>
                      <button type="button" onClick={() => handleRemovePro(idx)} className="text-red-500 hover:text-red-700">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-[#FFF5F5] p-6 rounded-2xl border border-red-50">
                <h4 className="font-display font-bold text-sm text-red-600 mb-4 flex items-center gap-1.5">
                  <i className="ri-close-line text-lg"></i>
                  Important Cons
                </h4>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Add side-effect or restriction..."
                    value={newCon}
                    onChange={(e) => setNewCon(e.target.value)}
                    className="flex-grow bg-white p-2.5 rounded-xl border border-gray-200 outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddCon}
                    className="px-4 bg-red-600 text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-2">
                  {cons.map((c, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-white px-3.5 py-2 rounded-lg border border-red-100/50 text-xs font-semibold text-gray-700">
                      <span className="truncate pr-4">{c}</span>
                      <button type="button" onClick={() => handleRemoveCon(idx)} className="text-red-500 hover:text-red-700">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product Card Attachment */}
            <div className="bg-[#191C1D] text-white p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-display font-bold text-base">Editorial Choice Product Link</h4>
                  <p className="text-xs text-gray-500">Inject a sidebar callout card linked directly to this review</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasProduct}
                    onChange={(e) => setHasProduct(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0052CC]"></div>
                </label>
              </div>

              {hasProduct && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Citrus Burn Official Supplement"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full bg-white/5 p-3 rounded-xl border border-white/10 outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Display Price</label>
                    <input
                      type="text"
                      required
                      placeholder="$59.00"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full bg-white/5 p-3 rounded-xl border border-white/10 outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Rating (1-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      required
                      value={productRating}
                      onChange={(e) => setProductRating(e.target.value)}
                      className="w-full bg-white/5 p-3 rounded-xl border border-white/10 outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Direct Affiliate / Buy URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/buy"
                      value={productBuyUrl}
                      onChange={(e) => setProductBuyUrl(e.target.value)}
                      className="w-full bg-white/5 p-3 rounded-xl border border-white/10 outline-none text-white text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Image Path</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="/assets/hlr/citrus-burn.png"
                        value={productImage}
                        onChange={(e) => setProductImage(e.target.value)}
                        className="flex-grow bg-white/5 p-3 rounded-xl border border-white/10 outline-none text-white text-sm"
                      />
                      <label className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white cursor-pointer flex items-center justify-center">
                        Upload
                        <input type="file" onChange={(e) => handleImageUpload(e, 'product')} className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: FAQs */}
        {activeTab === 'faqs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-100 space-y-4">
              <h4 className="font-display font-bold text-sm text-[#191C1D]">Add Frequently Asked Question</h4>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Question</label>
                <input
                  type="text"
                  placeholder="How long until I see results?"
                  value={faqQ}
                  onChange={(e) => setFaqQ(e.target.value)}
                  className="w-full bg-white p-2.5 rounded-xl border border-gray-200 outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Answer</label>
                <textarea
                  rows="2"
                  placeholder="Clinical results typically build up over 30 days..."
                  value={faqA}
                  onChange={(e) => setFaqA(e.target.value)}
                  className="w-full bg-white p-2.5 rounded-xl border border-gray-200 outline-none text-xs font-medium"
                />
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="px-4 py-2.5 bg-[#0052CC] text-white rounded-xl text-xs font-bold"
              >
                Insert Q&A Pair
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-[#191C1D]">Active Q&A List</h4>
              {faqs.length > 0 ? (
                faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl flex justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#0052CC]">Q. {faq.q}</p>
                      <p className="text-xs font-medium text-gray-500">{faq.a}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveFaq(idx)} className="text-red-500 hover:text-red-700 flex-shrink-0 h-fit mt-1">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 text-xs py-8">No FAQ questions added to this article yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: SEO Metadata */}
        {activeTab === 'seo' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Meta Title</label>
              <input
                type="text"
                placeholder="Google Search Header..."
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-700 text-sm font-semibold transition-all"
              />
              <span className="text-[10px] text-gray-400 block mt-1">Defaults to the Article Title if blank</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Meta Description</label>
              <textarea
                rows="3"
                placeholder="Brief snippet shown in search results..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-700 text-sm font-medium transition-all"
              />
              <span className="text-[10px] text-gray-400 block mt-1">Defaults to the Summary / Excerpt if blank</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191C1D] uppercase tracking-wider mb-2">Focus Keywords (Comma-separated)</label>
              <input
                type="text"
                placeholder="citrus burn review, fat burner supplements, metabolism boosters"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-[#F3F4F5] p-3 rounded-xl border-2 border-transparent outline-none text-gray-700 text-sm font-semibold transition-all"
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="border-t border-gray-100 pt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-5 py-3 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 text-gray-500 uppercase tracking-wider"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="px-6 py-3 bg-[#0052CC] text-white rounded-xl font-bold hover:bg-[#003D9B] disabled:opacity-50 transition-all flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-blue-600/10"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Save Review
                <i className="ri-save-line text-sm"></i>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminBlogEditor;
