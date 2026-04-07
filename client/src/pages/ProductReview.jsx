import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import AuthorCard from '../components/AuthorCard';

const ProductReview = () => {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState('overview');

  const reviewData = {
    title: "The Comprehensive Athletic Greens AG1 Review: Is it Worth the Hype in 2024?",
    author: {
      name: "Dr. Sarah Chen",
      role: "Clinical Nutritionist, PhD",
      bio: "Dr. Chen has over 15 years of experience in the field of dietetics and nutritional science. She specializes in the metabolic impacts of plant-based diets.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      specialization: ["Clinical Nutrition", "Gut Microbiome", "Sports Supplements"]
    },
    date: "updated Oct 12, 2023",
    readTime: "12 min read",
    category: "Supplements",
    product: {
      name: "Athletic Greens AG1",
      image: "https://images.unsplash.com/photo-1626202346584-c77aa94969bb?auto=format&fit=crop&q=80&w=1200",
      rating: 4.8,
      price: "$79 - $99",
      buyUrl: "https://athleticgreens.com/ag1"
    },
    sections: [
      { id: 'overview', title: 'Product Overview' },
      { id: 'ingredients', title: 'Ingredient Analysis' },
      { id: 'benefits', title: 'Key Health Benefits' },
      { id: 'proscons', title: 'Pros & Cons' },
      { id: 'faq', title: 'Frequently Asked Questions' }
    ],
    pros: [
      "75 highly absorbable vitamins & minerals",
      "Includes prebiotics and probiotics (7.2B CFU)",
      "NSF Certified for Sport - safe for athletes",
      "Digestive enzymes and superfood complex",
      "Pleasant, slightly sweet taste (natural flavors)"
    ],
    cons: [
      "Higher price point compared to competitors",
      "Proprietary blends don't specify exact dosages",
      "Must be refrigerated after opening",
      "Contains stevia (some users may dislike)"
    ],
    faqs: [
      {
        q: "When is the best time to take AG1?",
        a: "We recommend taking it first thing in the morning on an empty stomach for optimal absorption of nutrients."
      },
      {
        q: "Does AG1 replace a multivitamin?",
        a: "Yes, AG1 is designed to replace your multivitamin, prebiotic, probiotic, and greens powder, providing comprehensive nutritional support in one scoop."
      },
      {
        q: "Is Athletic Greens AG1 Keto/Paleo friendly?",
        a: "Absolutely. With only 2g of net carbs per serving and no added sugar, AG1 is suitable for most ketogenic and paleo diets."
      }
    ],
    comments: [
      {
        id: 1,
        author: { name: "Mark Peterson", avatar: "https://i.pravatar.cc/150?u=mark" },
        text: "I've been taking this for 6 months now and definitely feel a difference in my energy levels throughout the day. It's pricey but I've stopped buying 3 other supplements.",
        date: "2 days ago",
        likes: 14,
        replies: []
      },
      {
        id: 2,
        author: { name: "Elena Rossi", avatar: "https://i.pravatar.cc/150?u=elena" },
        text: "The clinical breakdown here is exactly what I was looking for. Love the focus on the NSF certification.",
        date: "1 week ago",
        likes: 5,
        replies: [
           { id: 21, author: { name: "Dr. Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" }, text: "Thanks Elena! Glad you found it helpful. The certification is definitely a huge differentiator.", date: "4 days ago" }
        ]
      }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      reviewData.sections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#F8F9FA] pb-32">
      {/* Article Header */}
      <header className="bg-white pt-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/blog" className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#0052CC] transition-colors mb-10 group/back">
            <i className="ri-arrow-left-s-line text-lg group-hover/back:-translate-x-1 transition-transform"></i>
            All Reviews
          </Link>
          
          <div className="flex flex-col mb-12">
            <span className="bg-[#0052CC]/5 text-[#0052CC] p-1 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-6 ring-1 ring-[#0052CC]/10">
              {reviewData.category}
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[#191C1D] leading-tight mb-8 tracking-tight">
              {reviewData.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 border-y border-gray-100 py-8 text-gray-500">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg shadow-black/5 ring-1 ring-[#0052CC]/10">
                    <img src={reviewData.author.avatar} alt={reviewData.author.name} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#191C1D]">{reviewData.author.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 leading-none">{reviewData.author.role}</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <i className="ri-calendar-line text-[#0052CC] text-sm"></i>
                    {reviewData.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line text-[#0052CC] text-sm"></i>
                    {reviewData.readTime}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-7xl pt-16 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 relative items-start">
        {/* Sticky Table of Contents (Left Sidebar) */}
        <aside className="hidden lg:block sticky top-24">
          <div className="flex flex-col">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8 border-b pb-4">Table of Contents</h4>
            <nav className="flex flex-col">
              {reviewData.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`py-3.5 border-l-2 text-sm font-bold transition-all px-6 border-transparent hover:text-[#0052CC] hover:bg-white/50 rounded-r-xl ${
                    activeSection === section.id 
                    ? 'border-[#0052CC] text-[#0052CC] bg-white translate-x-1 shadow-sm' 
                    : 'text-gray-400'
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
            
            <div className="mt-12 bg-[#191C1D] p-8 rounded-2xl text-white shadow-2xl shadow-blue-900/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#0052CC]/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
               <h5 className="font-display font-bold text-lg mb-4 text-[#91F78E] leading-tight">Expert Verified Product</h5>
               <p className="text-xs text-gray-400 mb-6 leading-relaxed">Our clinical team has verified the research behind this review.</p>
               <Link to="/about" className="text-[10px] font-bold text-[#0052CC] uppercase tracking-widest hover:underline hover:text-white transition-colors">See Methodology ↑</Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex flex-col gap-24">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-32">
            <div className="aspect-video rounded-[40px] overflow-hidden mb-12 shadow-2xl relative group">
               <img src={reviewData.product.image} alt={reviewData.product.name} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
               <div className="absolute top-8 left-8 flex gap-2">
                 {[1, 2, 3, 4, 5].map(i => (
                    <i key={i} className="ri-star-fill text-[#91F78E] text-2xl drop-shadow-lg"></i>
                 ))}
               </div>
            </div>
            
            <div className="p-8 md:p-12 bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-8 transition-all hover:shadow-xl hover:shadow-[#0052CC]/5 group/card">
               <div className="flex justify-between items-center bg-[#F8F9FA] p-6 rounded-2xl border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Editor's Summary</span>
                    <h3 className="font-display font-bold text-2xl text-[#191C1D]">The Benchmark of Greens</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rating</span>
                    <span className="font-display font-black text-3xl text-[#0052CC]">{reviewData.product.rating}</span>
                  </div>
               </div>
               
               <p className="text-xl text-gray-600 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-[#0052CC] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                 Athletic Greens (now known simply as <span className="font-bold text-[#191C1D]">AG1</span>) has remained the industry gold standard for daily nutritional shakes for nearly a decade. Positioned as a "foundational nutrition" supplement, it combines 75 distinct ingredients into a single, comprehensive scoop designed to replace multiple individual pills.
               </p>
               
               <p className="text-lg text-gray-500 leading-relaxed">
                 Our team tested AG1 over a 30-day period, measuring subjective energy levels, digestive comfort, and analyzing the clinical validity of its proprietary complexes. The results were impressive, albeit with a few caveats that prospective users should consider.
               </p>
               
               <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                  <a 
                    href={reviewData.product.buyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-grow btn-primary flex items-center justify-center gap-3 py-6 text-xl shadow-2xl shadow-[#0052CC]/20"
                  >
                    Check Latest Price
                    <i className="ri-external-link-line"></i>
                  </a>
                  <button className="px-8 py-6 rounded-2xl border-2 border-gray-100 text-gray-400 hover:text-[#191C1D] hover:border-[#191C1D] transition-all flex items-center justify-center">
                    <i className="ri-heart-line text-2xl"></i>
                  </button>
               </div>
            </div>
          </section>

          {/* Ingredient Section */}
          <section id="ingredients" className="scroll-mt-32">
            <div className="flex items-center gap-6 mb-12">
               <div className="w-16 h-16 bg-[#0052CC]/10 rounded-2xl flex items-center justify-center text-[#0052CC] text-3xl font-bold border border-[#0052CC]/20 shadow-inner translate-y-1">
                 <i className="ri-flask-line"></i>
               </div>
               <h2 className="font-display font-bold text-4xl text-[#191C1D] leading-none mb-0">Ingredient Deep Dive</h2>
            </div>
            
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              AG1's composition is divided into four main complexes: the Alkaline, Nutrient-Dense Raw Superfood Complex; the Nutrient-Dense Natural Extracts, Herbs & Antioxidants; the Digestive Enzyme & Supermushroom Complex; and the Dairy-Free Probiotics.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {['Vitamins & Minerals', 'Superfood Complex', 'Probiotics & Enzyme'].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-[#0052CC]/30 transition-all shadow-sm hover:shadow-xl hover:shadow-[#0052CC]/5">
                   <div className="flex gap-6 items-center">
                     <span className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-[#0052CC] group-hover:text-white transition-colors">0{idx+1}</span>
                     <h4 className="font-display font-bold text-2xl text-[#191C1D]">{item}</h4>
                   </div>
                   <i className="ri-add-circle-line text-3xl text-gray-200 group-hover:text-[#0052CC] transition-colors group-hover:rotate-90 transition-transform duration-500"></i>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="scroll-mt-32 bg-[#191C1D] p-12 md:p-20 rounded-[48px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#91F78E]/10 to-transparent blur-3xl -z-1 blur-[120px] transition-transform duration-1000 group-hover:scale-150"></div>
            
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-12 text-center">Observed Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Gut Health', icon: 'ri-men-line', text: 'Significant reduction in bloating within the first 10 days of use.' },
                { title: 'Mental Clarity', icon: 'ri-brain-line', text: 'Improved focus during mid-afternoon slumps recorded by testers.' },
                { title: 'Immune Support', icon: 'ri-shield-user-line', text: 'High doses of Zinc and Selenium provides baseline fortification.' },
                { title: 'Metabolism', icon: 'ri-fire-line', text: 'Vitamin B-complex ensures sustained ATP production without the crash.' }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 bg-[#0052CC] rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-xl shadow-blue-600/20">
                    <i className={benefit.icon}></i>
                  </div>
                  <h4 className="font-display font-bold text-xl mb-3">{benefit.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pros & Cons */}
          <section id="proscons" className="scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Pros */}
               <div className="flex flex-col gap-8 bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#91F78E]/20 text-[#006E1C] rounded-full flex items-center justify-center text-xl">
                      <i className="ri-add-line"></i>
                    </div>
                    <h3 className="font-display font-bold text-2xl">The Pros</h3>
                  </div>
                  <ul className="flex flex-col gap-6">
                    {reviewData.pros.map((pro, i) => (
                      <li key={i} className="flex gap-4 group">
                        <i className="ri-check-line text-[#006E1C] font-black text-xl group-hover:scale-125 transition-transform"></i>
                        <span className="text-gray-500 font-bold leading-tight">{pro}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Cons */}
               <div className="flex flex-col gap-8 bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xl">
                      <i className="ri-subtract-line"></i>
                    </div>
                    <h3 className="font-display font-bold text-2xl">The Cons</h3>
                  </div>
                  <ul className="flex flex-col gap-6">
                    {reviewData.cons.map((con, i) => (
                      <li key={i} className="flex gap-4 group">
                        <i className="ri-close-line text-red-500 font-black text-xl group-hover:scale-125 transition-transform"></i>
                        <span className="text-gray-400 font-medium leading-tight">{con}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="scroll-mt-32">
            <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-12">Expert Answers</h2>
            <div className="flex flex-col gap-6">
              {reviewData.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-10 rounded-3xl border border-gray-100 transition-all hover:bg-[#F3F4F5]/50 group cursor-help">
                   <h5 className="font-bold text-xl text-[#003D9B] mb-4 flex gap-4">
                     <span className="opacity-30">Q.</span>
                     {faq.q}
                   </h5>
                   <p className="text-gray-500 text-lg leading-relaxed pl-9 border-l-2 border-[#0052CC]/10 font-medium">
                     {faq.a}
                   </p>
                </div>
              ))}
            </div>
          </section>

          {/* Comments Section */}
          <CommentSection comments={reviewData.comments} />
        </main>

        {/* Right Sidebar (Product Quick Link) */}
        <aside className="hidden xl:block sticky top-24">
          <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-blue-900/5 border border-gray-50 flex flex-col items-center text-center">
             <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-inner bg-gray-50">
                <img src={reviewData.product.image} alt={reviewData.product.name} className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
             </div>
             <p className="text-[10px] font-black text-[#006E1C] uppercase tracking-[0.2em] mb-2">Our Top Choice</p>
             <h4 className="font-display font-bold text-2xl text-[#191C1D] mb-4 leading-tight">{reviewData.product.name}</h4>
             
             <div className="flex items-center gap-2 mb-8">
               <div className="flex">
                 {[1, 2, 3, 4, 5].map(i => <i key={i} className="ri-star-fill text-[#0052CC] text-xs"></i>)}
               </div>
               <span className="text-xs font-bold text-gray-400">4,800+ Verified Reviews</span>
             </div>

             <a 
               href={reviewData.product.buyUrl} 
               className="btn-primary w-full py-5 text-lg mb-6 shadow-xl"
             >
               Visit Official Store
             </a>
             
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
               <i className="ri-information-line mr-1"></i>
               Prices may vary based on active promotions.
             </p>
          </div>

          <div className="mt-8">
             <AuthorCard author={reviewData.author} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductReview;
