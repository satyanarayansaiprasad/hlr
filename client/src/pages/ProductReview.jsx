import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import AuthorCard from '../components/AuthorCard';
import { allReviews } from '../data/reviews';
import { getFormattedLastMonthDate } from '../utils/dateUtils';
import { getReviewBySlug } from '../services/api';

const ProductReview = () => {
  const { category, slug } = useParams();
  const activeSlug = slug || category;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const loadReview = async () => {
      if (!activeSlug) return;
      
      try {
        const res = await getReviewBySlug(activeSlug);
        if (res.data) {
          setReviewData(res.data);
          return;
        }
      } catch (err) {
        console.warn('Backend API offline or review not found. Using local fallback.');
      }

      // Robust fallback lookup by slug, id, or normalized title slug
      const normalizedSlug = activeSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const data = allReviews.find(r => 
        r.slug === activeSlug || 
        r.id === activeSlug || 
        r.slug === normalizedSlug ||
        (r.title && r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(normalizedSlug))
      );

      if (data) {
        setReviewData({
          ...data,
          pros: data.pros || [
            "Clinically backed formulations",
            "Third-party lab tested for purity",
            "High bioavailability & absorption",
            "Doctor-verified health outcomes"
          ],
          cons: data.cons || [
            "Premium price point",
            "Subscription model required for best value",
            "Limited local retail availability"
          ],
          faqs: data.faqs || [
            { q: "How long until I see results?", a: "Most users report improvements in biometric markers within the first 30 days of consistent use." },
            { q: "Is this supplement safe to stack?", a: "We recommend consulting with our Clinical Board before combining with prescription medications." }
          ],
          comments: data.comments || [
             {
               id: 1,
               author: { name: "Mark Peterson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
               text: "I've been following this protocol for 3 months now and definitely feel a difference in my energy levels.",
               date: "2 days ago",
               likes: 14,
               replies: []
             }
          ]
        });
      }
    };

    loadReview();
  }, [slug]);

  useEffect(() => {
    if (reviewData) {
      document.title = reviewData.metaTitle || reviewData.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = reviewData.metaDescription || reviewData.excerpt;
    }
  }, [reviewData]);

  if (!reviewData) return (
    <div className="pt-40 text-center min-h-screen">
      <h2 className="text-2xl font-bold text-gray-400">Review not found in our clinical library...</h2>
      <Link to="/reviews" className="text-[#0052CC] font-bold mt-4 hover:underline">Return to Library</Link>
    </div>
  );

  const getParsedContent = (htmlContent) => {
    if (!htmlContent) return { firstPart: '', secondPart: '' };

    const pClosingTag = '</p>';
    const lowerContent = htmlContent.toLowerCase();
    const pIndex = lowerContent.indexOf(pClosingTag);

    if (pIndex !== -1) {
      const splitPos = pIndex + pClosingTag.length;
      return {
        firstPart: htmlContent.substring(0, splitPos),
        secondPart: htmlContent.substring(splitPos),
      };
    }

    const h2Index = lowerContent.indexOf('</h2>');
    if (h2Index !== -1) {
      const splitPos = h2Index + 5;
      return {
        firstPart: htmlContent.substring(0, splitPos),
        secondPart: htmlContent.substring(splitPos),
      };
    }

    return {
      firstPart: htmlContent,
      secondPart: '',
    };
  };

  const { firstPart, secondPart } = getParsedContent(reviewData?.content);

  const backLink = category ? `/reviews/${category}` : '/reviews';

  return (
    <div className="bg-white min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#0052CC] origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* New Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center bg-[#F8F9FA] overflow-hidden pt-20 lg:pt-0">
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0">
           <div className="absolute inset-0 bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10 lg:block hidden"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10 block lg:hidden"></div>
           <img src={reviewData?.image} alt={reviewData?.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
           <div className="max-w-3xl">
              <Link to={backLink} className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-[#0052CC] transition-colors mb-8 group/back bg-white/80 backdrop-blur px-5 py-2.5 rounded-full border border-gray-200">
                <i className="ri-arrow-left-s-line text-xl group-hover/back:-translate-x-1 transition-transform"></i>
                Home / {reviewData?.category || "Review"}
              </Link>
              
              <span className="text-[#0052CC] text-sm font-bold uppercase tracking-[0.2em] mb-6 block">
                {reviewData?.category || "Review"}
              </span>
              
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#191C1D] leading-[1.1] mb-8 tracking-tight">
                {reviewData?.title || "Product Review"}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 text-gray-600 bg-white/70 backdrop-blur-xl p-8 rounded-[32px] w-fit border border-white shadow-xl shadow-gray-200/50">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xl ring-1 ring-[#0052CC]/10">
                      <img 
                        src={reviewData?.author?.avatar || "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"} 
                        alt={reviewData?.author?.name || "Author"} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400";
                        }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-[#191C1D]">{reviewData?.author?.name || "Editorial Team"}</p>
                      <p className="text-[12px] font-bold uppercase tracking-widest opacity-60 text-[#0052CC]">{reviewData?.author?.role || "Medical Reviewer"}</p>
                    </div>
                 </div>
                 <div className="h-12 w-[1px] bg-gray-300 hidden sm:block"></div>
                  <div className="flex flex-col gap-1.5 text-[12px] font-bold uppercase tracking-widest hidden sm:flex">
                    <span className="text-gray-500">Updated {getFormattedLastMonthDate()}</span>
                    <span className="text-[#0052CC] flex items-center gap-1.5"><i className="ri-time-line text-lg"></i> {reviewData?.readTime || "5 min read"}</span>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <article className="prose prose-xl lg:prose-2xl max-w-none">
            
            {/* First Paragraph / Introduction */}
            {firstPart && (
              <section 
                className="prose-headings:font-display prose-headings:font-bold prose-headings:text-[#191C1D] prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-10 prose-p:text-lg lg:prose-p:text-xl prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-6 text-gray-800 max-w-none"
              >
                <div dangerouslySetInnerHTML={{ __html: firstPart }} />
              </section>
            )}

            {/* Featured Product Callout Card Section (Inline After First Paragraph) */}
            {(reviewData?.product || reviewData?.buyUrl || reviewData?.name) && (
              <section id="product-overview" className="my-12 bg-[#121824] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800/80 max-w-none group">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#0052CC]/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center relative z-10">
                  
                  {/* Product Image Box */}
                  <div className="sm:col-span-4 aspect-square max-w-[220px] mx-auto sm:mx-0 w-full rounded-2xl bg-white p-5 shadow-lg flex items-center justify-center border border-slate-100 group-hover:-translate-y-1 transition-transform duration-500">
                    <img
                      src={reviewData?.product?.image || reviewData?.image}
                      alt={reviewData?.product?.name || reviewData?.name || reviewData?.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="sm:col-span-8 flex flex-col items-start space-y-4 text-left">
                    
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[#91F78E] bg-[#91F78E]/10 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#91F78E]/20">
                        EDITORIAL CHOICE 2026
                      </span>
                      <span className="text-gray-400 text-xs font-bold flex items-center gap-1.5">
                        <i className="ri-shield-check-fill text-[#0052CC]"></i> Clinical Board Verified
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug m-0">
                      {reviewData?.product?.name || reviewData?.name || reviewData?.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/50">
                      <div className="flex gap-0.5 text-[#91F78E]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i key={s} className="ri-star-fill text-xs"></i>
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-gray-300">
                        {reviewData?.product?.rating || reviewData?.rating || 4.8} / 5.0 Rating
                      </span>
                    </div>

                    {/* Price & Savings */}
                    <div className="flex items-baseline gap-3 pt-1">
                      <span className="text-gray-500 text-base line-through font-semibold">$89.00</span>
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {reviewData?.product?.price || '$59.00'}
                      </span>
                      <span className="text-[10px] bg-[#91F78E] text-[#191C1D] px-2.5 py-1 rounded-md font-black uppercase tracking-wider">
                        SAVE 35%
                      </span>
                    </div>

                    {/* Action CTA Button */}
                    <div className="w-full pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <a
                        href={reviewData?.product?.buyUrl || reviewData?.buyUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3.5 bg-[#0052CC] hover:bg-[#003D9B] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2.5 text-sm shadow-lg shadow-blue-600/20 active:scale-95 group/btn"
                      >
                        <span>Visit Official Website</span>
                        <i className="ri-arrow-right-up-line text-lg group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"></i>
                      </a>
                      <span className="text-xs text-gray-400 font-semibold tracking-wide text-center sm:text-left">
                        Direct Official Manufacturer Link
                      </span>
                    </div>

                  </div>

                </div>
              </section>
            )}

            {/* Remaining Content */}
            {secondPart && (
              <section 
                className="mb-12 prose-headings:font-display prose-headings:font-bold prose-headings:text-[#191C1D] prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-16 prose-p:text-lg lg:prose-p:text-xl prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-8 prose-ul:text-lg lg:prose-ul:text-xl prose-ul:text-gray-700 prose-ul:leading-[1.8] prose-li:mb-4 prose-ul:list-disc prose-ul:pl-8 text-gray-800 max-w-none"
              >
                <div dangerouslySetInnerHTML={{ __html: secondPart }} />
              </section>
            )}

            {/* Pros & Cons Section - Editorial Wide */}
            <section id="proscons" className="mb-24 pt-16 border-t-2 border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-[#F8F9FA] p-8 sm:p-10 rounded-[32px] border border-gray-100 transition-all hover:shadow-xl hover:shadow-[#0052CC]/5 group">
                    <h3 className="font-display font-black text-2xl sm:text-3xl mb-8 flex items-center gap-3.5 text-[#006E1C] m-0">
                      <div className="w-10 h-10 rounded-full bg-[#006E1C]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <i className="ri-check-line text-xl"></i>
                      </div>
                      The Clinical Pros
                    </h3>
                    <ul className="space-y-3.5 m-0 list-none p-0">
                      {reviewData?.pros?.map((pro, i) => (
                        <li key={`pro-${i}`} className="flex gap-3.5 text-[#191C1D] font-medium text-base sm:text-lg leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-[#006E1C] rounded-full mt-2.5 flex-shrink-0"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="bg-[#FFF5F5] p-8 sm:p-10 rounded-[32px] border border-red-50 transition-all hover:shadow-xl hover:shadow-red-500/5 group">
                    <h3 className="font-display font-black text-2xl sm:text-3xl mb-8 flex items-center gap-3.5 text-red-600 m-0">
                      <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <i className="ri-close-line text-xl"></i>
                      </div>
                      Important Cons
                    </h3>
                    <ul className="space-y-3.5 m-0 list-none p-0">
                      {reviewData?.cons?.map((con, i) => (
                        <li key={`con-${i}`} className="flex gap-3.5 text-gray-700 font-medium text-base sm:text-lg leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 flex-shrink-0"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>
            </section>

            {/* FAQ Section */}
            {reviewData?.faqs && reviewData.faqs.length > 0 && (
            <section id="faq" className="mb-24">
               <h2 className="font-display font-black text-3xl lg:text-4xl text-[#191C1D] mb-10 m-0">Expert Answers</h2>
              <div className="space-y-5">
                {reviewData.faqs.map((faq, idx) => (
                  <div key={`faq-${idx}`} className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 group">
                     <h5 className="font-bold text-lg sm:text-xl text-[#191C1D] mb-3 flex gap-3 transition-colors group-hover:text-[#0052CC] m-0 leading-tight">
                       <span className="text-[#0052CC] opacity-20 font-display font-black">Q.</span>
                       {faq.q}
                     </h5>
                     <p className="text-gray-600 text-base sm:text-lg leading-relaxed pl-8 font-medium m-0">
                       {faq.a}
                     </p>
                  </div>
                ))}
              </div>
            </section>
            )}

            {/* Discussion Section */}
            {reviewData?.comments && (
            <section className="mb-24">
              <CommentSection comments={reviewData.comments} />
            </section>
            )}
          </article>
        </div>
      </main>

      {/* Mobile Sticky CTA (Since sidebar is hidden on mobile) */}
      {reviewData?.product && (
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50 animate-fade-in-up">
         <div className="bg-[#191C1D] p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-between gap-4 backdrop-blur-2xl bg-[#191C1D]/90">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-white rounded-2xl p-1 shadow-inner flex-shrink-0">
                 <img src={reviewData.product.image} className="w-full h-full object-contain" />
               </div>
               <div className="flex flex-col">
                  <span className="text-white font-bold text-sm line-clamp-1">{reviewData.product.name}</span>
                  <span className="text-[#91F78E] font-black text-sm">{reviewData.product.price}</span>
               </div>
            </div>
            <a href={reviewData.product.buyUrl || '#'} target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-[#0052CC] text-white rounded-2xl font-black text-sm hover:bg-white hover:text-[#191C1D] transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 shadow-lg shadow-[#0052CC]/50">
               Get Now
            </a>
         </div>
      </div>
      )}
    </div>
  );
};

export default ProductReview;
