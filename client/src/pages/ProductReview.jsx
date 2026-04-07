import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import AuthorCard from '../components/AuthorCard';

const ProductReview = () => {
  const { slug } = useParams();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const reviewData = {
    title: "The Comprehensive Athletic Greens AG1 Review: Is it Worth the Hype in 2024?",
    author: {
      name: "Dr. Sarah Chen",
      role: "Clinical Nutritionist, PhD",
      bio: "Dr. Chen has over 15 years of experience in the field of dietetics and nutritional science. She specializes in the metabolic impacts of plant-based diets.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300",
      specialization: ["Clinical Nutrition", "Gut Microbiome", "Sports Supplements"]
    },
    date: "updated Oct 12, 2023",
    readTime: "12 min read",
    category: "Supplements",
    product: {
      name: "Athletic Greens AG1",
      image: "/images/supplement.png",
      rating: 4.8,
      price: "$79 - $99",
      buyUrl: "https://athleticgreens.com/ag1"
    },
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
        author: { name: "Mark Peterson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
        text: "I've been taking this for 6 months now and definitely feel a difference in my energy levels throughout the day. It's pricey but I've stopped buying 3 other supplements.",
        date: "2 days ago",
        likes: 14,
        replies: []
      },
      {
        id: 2,
        author: { name: "Elena Rossi", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
        text: "The clinical breakdown here is exactly what I was looking for. Love the focus on the NSF certification.",
        date: "1 week ago",
        likes: 5,
        replies: [
           { id: 21, author: { name: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300" }, text: "Thanks Elena! Glad you found it helpful. The certification is definitely a huge differentiator.", date: "4 days ago" }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#0052CC] origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Breadcrumb Header */}
      <header className="pt-12 pb-6 border-b border-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/reviews" className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#0052CC] transition-colors mb-4 group/back">
            <i className="ri-arrow-left-s-line text-lg group-hover/back:-translate-x-1 transition-transform"></i>
            Back to Reviews
          </Link>
        </div>
      </header>

      {/* Article Hero */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col mb-12">
            <span className="text-[#0052CC] text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-block">
              {reviewData.category}
            </span>
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-[#191C1D] leading-[1.1] mb-10 tracking-tight">
              {reviewData.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-500">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl ring-1 ring-[#0052CC]/10">
                    <img src={reviewData.author.avatar} alt={reviewData.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#191C1D]">{reviewData.author.name}</p>
                    <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">{reviewData.author.role}</p>
                  </div>
               </div>
               <div className="h-10 w-[1px] bg-gray-100 hidden sm:block"></div>
               <div className="flex flex-col gap-1 text-[11px] font-bold uppercase tracking-widest hidden sm:flex">
                  <span className="text-gray-400">{reviewData.date}</span>
                  <span className="text-[#0052CC]">{reviewData.readTime}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="pb-32">
        {/* Featured Image */}
        <div className="container mx-auto px-4 max-w-5xl mb-20">
          <div className="aspect-video rounded-[32px] overflow-hidden shadow-2xl relative group">
             <img src={reviewData.product.image} alt={reviewData.product.name} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <section id="overview" className="mb-24">
               <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-serif italic mb-12 border-l-4 border-[#0052CC] pl-8 py-2">
                 Athletic Greens (now known simply as <span className="font-bold text-[#191C1D]">AG1</span>) has remained the industry gold standard for daily nutritional shakes for nearly a decade.
               </p>
               
               <div className="space-y-8 text-xl text-gray-700 leading-[1.8]">
                 <p>
                   Positioned as a "foundational nutrition" supplement, it combines 75 distinct ingredients into a single, comprehensive scoop designed to replace multiple individual pills. Our team tested AG1 over a 30-day period, measuring subjective energy levels, digestive comfort, and analyzing the clinical validity of its proprietary complexes.
                 </p>
                 <p>
                   The results were impressive, albeit with a few caveats that prospective users should consider. In this deep dive, we dismantle the marketing noise to reveal the clinical reality of what this green powder actually does for your biology.
                 </p>
               </div>
            </section>

            {/* Ingredient Section */}
            <section id="ingredients" className="mb-32">
              <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-12 flex items-center gap-4">
                <span className="w-12 h-12 bg-[#0052CC] text-white rounded-xl flex items-center justify-center text-xl">
                  <i className="ri-flask-line"></i>
                </span>
                Ingredient Deep Dive
              </h2>
              
              <div className="space-y-12 text-xl text-gray-700 leading-[1.8]">
                <p>
                  AG1's composition is divided into four main complexes: the Alkaline, Nutrient-Dense Raw Superfood Complex; the Nutrient-Dense Natural Extracts, Herbs & Antioxidants; the Digestive Enzyme & Supermushroom Complex; and the Dairy-Free Probiotics.
                </p>

                <div className="grid grid-cols-1 gap-8 mt-12">
                  {['Vitamins & Minerals', 'Superfood Complex', 'Probiotics & Enzyme'].map((item, idx) => (
                    <div key={idx} className="bg-[#F8F9FA] p-10 rounded-3xl group cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-sm hover:shadow-xl">
                       <div className="flex gap-8 items-center">
                         <span className="text-4xl font-black text-gray-200 group-hover:text-[#0052CC] transition-colors">0{idx+1}</span>
                         <h4 className="font-display font-bold text-2xl text-[#191C1D]">{item}</h4>
                         <i className="ri-arrow-right-line ml-auto text-2xl text-gray-300 group-hover:text-[#0052CC] group-hover:translate-x-2 transition-all"></i>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="mb-32">
              <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-12">Observed Health Benefits</h2>
              <div className="grid grid-cols-1 gap-10">
                {[
                  { title: 'Gut Health Optimization', icon: 'ri-men-line', text: 'Significant reduction in bloating within the first 10 days of use, thanks to the 7.2B CFU probiotics.' },
                  { title: 'Mental Clarity', icon: 'ri-brain-line', text: 'Improved focus during mid-afternoon slumps recorded by testers, likely due to B-complex support.' },
                  { title: 'Immune Fortification', icon: 'ri-shield-user-line', text: 'High doses of Zinc and Selenium provides baseline fortification against seasonal stressors.' }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-8 items-start group">
                    <div className="w-16 h-16 bg-[#0052CC]/5 text-[#0052CC] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-[#0052CC] group-hover:text-white transition-all">
                      <i className={benefit.icon}></i>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-2xl mb-3 text-[#191C1D]">{benefit.title}</h4>
                      <p className="text-lg text-gray-500 leading-relaxed">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros & Cons Section - Editorial Style */}
            <section id="proscons" className="mb-32 pt-24 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div>
                    <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3 text-[#006E1C]">
                      <i className="ri-checkbox-circle-line"></i>
                      The Clinical Pros
                    </h3>
                    <ul className="space-y-6">
                      {reviewData.pros.map((pro, i) => (
                        <li key={i} className="flex gap-4 text-gray-600 font-medium text-lg leading-snug">
                          <span className="w-1.5 h-1.5 bg-[#006E1C] rounded-full mt-2.5 flex-shrink-0"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div>
                    <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3 text-red-600">
                      <i className="ri-close-circle-line"></i>
                      Important Cons
                    </h3>
                    <ul className="space-y-6">
                      {reviewData.cons.map((con, i) => (
                        <li key={i} className="flex gap-4 text-gray-400 font-medium text-lg leading-snug">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 flex-shrink-0"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>
            </section>

            {/* Product Card Callout (Middle of page) */}
            <section className="mb-32">
               <div className="bg-[#191C1D] rounded-[40px] p-12 md:p-16 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0052CC]/20 rounded-full blur-[100px] -z-0"></div>
                  <div className="w-full md:w-1/3 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                     <img src={reviewData.product.image} alt={reviewData.product.name} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" />
                  </div>
                  <div className="w-full md:w-2/3 relative z-10">
                     <span className="text-[#91F78E] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Editorial Choice 2024</span>
                     <h3 className="font-display font-black text-4xl mb-6">{reviewData.product.name}</h3>
                     <div className="flex items-center gap-2 mb-8 bg-white/5 w-fit px-4 py-2 rounded-xl">
                        <div className="flex">
                           {[1, 2, 3, 4, 5].map(i => <i key={i} className="ri-star-fill text-[#91F78E] text-sm"></i>)}
                        </div>
                        <span className="text-xs font-bold">{reviewData.product.rating} / 5.0 Rating</span>
                     </div>
                     <p className="text-gray-400 text-lg mb-10 leading-relaxed">The most comprehensive greens powder on the market, backed by rigorous testing. Perfect for those looking for foundational health coverage in a single scoop.</p>
                     <div className="flex flex-wrap gap-4">
                        <a href={reviewData.product.buyUrl} className="px-10 py-5 bg-[#0052CC] text-white rounded-2xl font-bold hover:bg-white hover:text-[#191C1D] transition-all flex items-center gap-3">
                           Visit Official Website
                           <i className="ri-external-link-line"></i>
                        </a>
                        <span className="text-2xl font-black">{reviewData.product.price}</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-32">
              <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-12">Common Scientific FAQs</h2>
              <div className="space-y-8">
                {reviewData.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-8 last:border-0 group cursor-help">
                     <h5 className="font-bold text-2xl text-[#191C1D] mb-4 flex gap-4 transition-colors group-hover:text-[#0052CC]">
                       <span className="text-[#0052CC] opacity-20">Q.</span>
                       {faq.q}
                     </h5>
                     <p className="text-gray-500 text-lg leading-relaxed pl-10 font-medium italic">
                       {faq.a}
                     </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Author Footer Card */}
            <section className="mb-32 pt-24 border-t border-gray-100">
               <div className="bg-[#F8F9FA] rounded-[32px] p-10 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-10">
                     <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
                        <img src={reviewData.author.avatar} alt={reviewData.author.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="text-center md:text-left">
                        <p className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.2em] mb-2">About the Author</p>
                        <h4 className="font-display font-bold text-3xl text-[#191C1D] mb-4">{reviewData.author.name}</h4>
                        <p className="text-lg text-gray-500 leading-relaxed mb-6">{reviewData.author.bio}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                           {reviewData.author.specialization.map((spec, i) => (
                              <span key={i} className="bg-white px-4 py-2 rounded-full text-xs font-bold text-gray-400 border border-gray-100 uppercase tracking-widest">{spec}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Discussion Section */}
            <section className="mb-32">
              <CommentSection comments={reviewData.comments} />
            </section>
          </article>
        </div>
      </main>
    </div>
  );
};

export default ProductReview;
