import React from 'react';
import { motion } from 'framer-motion';
import AuthorCard from '../components/AuthorCard';

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Clinical Nutritionist, PhD",
      bio: "Sarah leads our nutritional audit team, ensuring every supplement review is backed by peer-reviewed clinical data and metabolic science.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300",
      specialization: ["Clinical Nutrition", "Gut Microbiome", "Sports Supplements"]
    },
    {
      name: "Marcus Thorne",
      role: "Fitness Technology Expert",
      bio: "With a background in biomedical engineering, Marcus dissects the wearables and health tech that aim to optimize our daily biological performance.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
      specialization: ["Wearable Tech", "Bio-Feedback", "Sleep Optimization"]
    },
    {
      name: "Dr. Elena Rossi",
      role: "Medical Reviewer, MD",
      bio: "Elena oversees our medical disclaimer process and ensures all health claims made in our content are accurate and safe for the general public.",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
      specialization: ["Internal Medicine", "Preventative Care", "Public Health"]
    }
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-32 relative">
        <div className="absolute -top-24 right-0 w-1/2 h-[500px] bg-gradient-to-l from-[#0052CC]/5 to-transparent -z-10 blur-3xl"></div>
        <div className="max-w-4xl">
          <span className="bg-[#91F78E]/20 text-[#006E1C] p-1 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-8 inline-block ring-1 ring-[#91F78E]">
            Our Mission
          </span>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-[#191C1D] leading-tight mb-10 tracking-tight">
            Democratizing <br />
            <span className="text-[#0052CC] relative">
              Clinical Truth
              <span className="absolute bottom-1 left-0 w-full h-2 bg-[#0052CC]/10 -z-10"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl mb-12">
            The wellness industry is crowded with noise. Our goal is simple: to provide the clarity you need to lead a healthier life, using rigorous scientific methodology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-display font-black text-4xl text-[#0052CC]">50k+</span>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly Readers</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-display font-black text-4xl text-[#0052CC]">150+</span>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expert Reviews</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-display font-black text-4xl text-[#0052CC]">100%</span>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Independent Testing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-white py-32 mb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#0052CC]/10"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-1000 group">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" alt="Laboratory testing" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute bottom-10 left-10 p-8 bg-white/20 backdrop-blur-3xl rounded-3xl border border-white/20 max-w-xs">
                   <h4 className="font-bold text-white text-xl mb-2">Clinical Rigor</h4>
                   <p className="text-white/60 text-sm">Every supplement is analyzed for purity in third-party labs.</p>
                </div>
             </div>

             <div className="flex flex-col gap-12">
               <div>
                  <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-6 leading-tight">The Review Process</h2>
                  <p className="text-lg text-gray-500 leading-relaxed">We don't take shortcuts. Our methodology is built on three pillars of verification that ensure the most accurate results for our readers.</p>
               </div>

               <div className="flex flex-col gap-10">
                 {[
                   { title: 'Independent Acquisition', text: 'We buy all products ourselves. We never accept free samples from brands to ensure absolute neutrality.', icon: 'ri-shopping-cart-line' },
                   { title: 'Testing Protocols', text: 'Subjective testing is combined with clinical data analysis by our PhD-led medical review board.', icon: 'ri-microscope-line' },
                   { title: 'Long-term Tracking', text: 'Health outcomes are tracked over 30 and 60-day periods to determine efficacy and side effects.', icon: 'ri-history-line' }
                 ].map((pillar, i) => (
                   <div key={i} className="flex gap-6 group">
                     <div className="w-14 h-14 rounded-2xl bg-[#0052CC]/5 flex items-center justify-center text-2xl text-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white transition-colors duration-500">
                       <i className={pillar.icon}></i>
                     </div>
                     <div className="flex flex-col">
                       <h4 className="font-bold text-xl mb-1 text-[#191C1D]">{pillar.title}</h4>
                       <p className="text-gray-500 text-sm leading-relaxed max-w-md">{pillar.text}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.2em] mb-4 block">The Collective</span>
          <h2 className="font-display font-bold text-5xl text-[#191C1D] mb-6 leading-tight tracking-tight">Vetted by Experts</h2>
          <p className="text-lg text-gray-400">Our medical review board consists of medical doctors, PhD researchers, and licensed registered dietitians.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <AuthorCard key={i} author={member} />
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="container mx-auto px-4 mb-24">
         <div className="bg-white p-12 md:p-24 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-full bg-[#EDEEEF]/20 -z-10 rotate-12 translate-x-10"></div>
            <div className="max-w-4xl">
               <h2 className="font-display font-bold text-3xl text-[#191C1D] mb-8 leading-tight">Medical Disclaimer & Ethics</h2>
               <p className="text-gray-500 text-lg leading-relaxed mb-8">
                 The information provided by HealthQuest is for informational and educational purposes only. It is not intended as medical advice or to replace a relationship with a qualified healthcare professional. Always consult your doctor before starting any new supplement regimen or lifestyle changes.
               </p>
               <p className="text-gray-400 text-sm leading-relaxed italic">
                 HealthQuest is a participant in several affiliate advertising programs. When you purchase through links on our site, we may earn an affiliate commission. This never influences our editorial content or testing results.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
