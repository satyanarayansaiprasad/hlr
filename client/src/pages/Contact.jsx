import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Add real submission logic later if needed
  };

  const contactMethod = [
    { title: 'Editor Feedback', icon: 'ri-chat-voice-line', text: 'feedback@healthlinereview.com' },
    { title: 'Clinical Review Board', icon: 'ri-microscope-line', text: 'medical@healthlinereview.com' },
    { title: 'Partnerships', icon: 'ri-briefcase-line', text: 'partner@healthlinereview.com' }
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Informational Side */}
          <div className="flex flex-col gap-12 order-2 lg:order-1">
            <div>
              <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
              <h1 className="font-display font-bold text-5xl md:text-6xl text-[#191C1D] mb-8 leading-tight tracking-tight">Open Channels <br /> of Communication</h1>
              <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                Whether you have clinical feedback on our reviews or a partnership proposal, our doors are always open.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {contactMethod.map((method, i) => (
                <div key={i} className="flex gap-6 items-center p-8 bg-white rounded-3xl border border-transparent shadow-sm hover:border-[#0052CC]/10 transition-all hover:shadow-xl hover:shadow-[#0052CC]/5 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-[#0052CC]/5 flex items-center justify-center text-3xl text-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white transition-all duration-500">
                    <i className={method.icon}></i>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-xl text-[#191C1D] group-hover:text-[#003D9B] transition-colors">{method.title}</h4>
                    <p className="text-sm font-bold text-gray-400 pointer-events-none">{method.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-10 opacity-30 grayscale saturate-0 hover:grayscale-0 hover:opacity-100 hover:saturate-100 transition-all duration-700">
               <span className="text-xl font-display font-black text-gray-900 tracking-tighter uppercase">500+ <br/> Brands Tested</span>
               <span className="text-xl font-display font-black text-gray-900 tracking-tighter uppercase">Global <br/> Reach</span>
            </div>
          </div>

          {/* Form Side */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-12 md:p-16 rounded-[48px] shadow-2xl shadow-blue-900/5 border border-gray-50 flex flex-col gap-10 relative overflow-hidden"
                >
                   {/* Background Glow */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#0052CC]/5 to-transparent blur-3xl -z-10 -translate-y-20 translate-x-10"></div>
                   
                   <div className="flex flex-col">
                      <h3 className="font-display font-bold text-3xl text-[#191C1D] mb-2 leading-tight">Direct Access</h3>
                      <p className="text-sm text-gray-400 font-medium">Your inquiry will be routed to the appropriate department within 24 hours.</p>
                   </div>

                   <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2 group">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                            <input 
                              required
                              type="text" 
                              placeholder="e.g. John Miller" 
                              className="bg-[#F8F9FA] p-5 rounded-2xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 transition-all text-gray-700 font-medium text-lg placeholder:text-gray-300 focus:border-[#0052CC]/10"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                         </div>
                         <div className="flex flex-col gap-2 group">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
                            <input 
                              required
                              type="email" 
                              placeholder="john@example.com" 
                              className="bg-[#F8F9FA] p-5 rounded-2xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 transition-all text-gray-700 font-medium text-lg placeholder:text-gray-300 focus:border-[#0052CC]/10"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                         </div>
                      </div>

                      <div className="flex flex-col gap-2 group">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Topic of Discussion</label>
                         <select 
                           className="bg-[#F8F9FA] p-5 rounded-2xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 transition-all text-gray-700 font-medium text-lg placeholder:text-gray-300 focus:border-[#0052CC]/10 appearance-none cursor-pointer"
                           value={formData.subject}
                           required
                           onChange={(e) => setFormData({...formData, subject: e.target.value})}
                         >
                            <option value="">Select a category...</option>
                            <option value="feedback">General Editorial Feedback</option>
                            <option value="partnership">Clinical Partnership</option>
                            <option value="advertising">Advertising Inquiry</option>
                         </select>
                      </div>

                      <div className="flex flex-col gap-2 group">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Message Content</label>
                         <textarea 
                           required
                           placeholder="Please provide as much detail as possible..."
                           className="bg-[#F8F9FA] p-5 rounded-2xl border-2 border-transparent outline-none focus:ring-4 focus:ring-[#0052CC]/5 transition-all text-gray-700 font-medium text-lg min-h-[180px] placeholder:text-gray-300 resize-none focus:border-[#0052CC]/10 shadow-inner"
                           value={formData.message}
                           onChange={(e) => setFormData({...formData, message: e.target.value})}
                         ></textarea>
                      </div>

                      <button className="btn-primary w-full py-6 text-xl shadow-2xl flex items-center justify-center gap-4 group/btn">
                         Send Transmission
                         <i className="ri-send-plane-fill group-hover/btn:translate-x-2 transition-transform duration-500"></i>
                      </button>
                   </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-20 rounded-[48px] shadow-2xl shadow-green-900/5 border border-gray-50 flex flex-col items-center text-center gap-10"
                >
                  <div className="w-24 h-24 bg-[#91F78E] rounded-full flex items-center justify-center text-[#006E1C] text-5xl shadow-xl shadow-[#91F78E]/20 animate-bounce">
                    <i className="ri-checkbox-circle-fill"></i>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-4xl text-[#191C1D] mb-4">Transmission Received</h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-sm mx-auto">
                      Thank you, <span className="font-bold text-[#191C1D]">{formData.name.split(' ')[0]}</span>. Your message has been encrypted and routed. Expect a response within 1 business day.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="font-bold text-[#0052CC] uppercase tracking-widest hover:underline"
                  >
                    Send another query?
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
