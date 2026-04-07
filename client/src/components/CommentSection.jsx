import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommentSection = ({ comments }) => {
  const [commentText, setCommentText] = useState('');
  const [activeComments, setActiveComments] = useState(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?u=user123',
      },
      text: commentText,
      date: 'Just now',
      likes: 0,
      replies: [],
    };

    setActiveComments([newComment, ...activeComments]);
    setCommentText('');
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col gap-12 mb-16">
          <div className="text-center">
            <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-6 tracking-tight">Community Discussion</h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg">
              Share your experience with this product. Join over <span className="font-bold text-[#0052CC]">2,400+</span> readers participating in the conversation.
            </p>
          </div>

          {/* Comment Form */}
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-[#F8F9FA] p-10 rounded-2xl border border-gray-100 relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0052CC]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0 ring-1 ring-[#0052CC]/10">
                <img src="https://i.pravatar.cc/150?u=current_user" alt="User" />
              </div>
              <div className="flex flex-col w-full">
                <span className="font-bold text-[#191C1D] text-lg">Leave a Review</span>
                <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider">Sharing is caring!</span>
              </div>
            </div>
            
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What are your thoughts on this supplement? Be honest, it helps others!"
              className="w-full bg-white rounded-xl p-6 border-none outline-none focus:ring-4 focus:ring-[#0052CC]/10 min-h-[160px] text-gray-700 transition-all font-medium placeholder:text-gray-300 resize-none shadow-inner"
            ></textarea>
            
            <div className="flex justify-between items-center bg-white/50 backdrop-blur-xl p-4 rounded-xl">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-[200px]">By posting, you agree to our community guidelines.</p>
              <button 
                type="submit" 
                className="btn-primary flex items-center gap-2 group/btn"
              >
                Post Review
                <i className="ri-send-plane-fill group-hover/btn:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </motion.form>
        </div>

        {/* Comment List */}
        <div className="flex flex-col gap-8">
          <AnimatePresence>
            {activeComments.map((comment) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={comment.id}
                className="flex gap-6 group hover:bg-[#F8F9FA]/50 p-6 rounded-2xl transition-colors"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-xl ring-1 ring-[#0052CC]/5 group-hover:scale-105 transition-transform">
                  <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-[#191C1D] leading-tight text-lg">{comment.author.name}</h4>
                      <span className="text-[10px] font-bold text-[#0052CC]/60 uppercase tracking-widest">{comment.date}</span>
                    </div>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-[#0052CC] transition-colors group/like">
                        <i className={`ri-heart-${comment.likes > 0 ? 'fill text-[#0052CC]' : 'line'}`}></i>
                        <span className="text-[10px] font-bold">{comment.likes}</span>
                      </button>
                      <button className="text-[10px] font-bold text-gray-400 hover:text-[#0052CC] uppercase tracking-widest transition-colors">Reply</button>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg">
                    {comment.text}
                  </p>
                  
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-10 pl-10 border-l-2 border-gray-100 flex flex-col gap-10">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-4">
                          <img src={reply.author.avatar} alt={reply.author.name} className="w-10 h-10 rounded-full border-2 border-white shadow-lg shadow-[#0052CC]/5" />
                          <div className="flex flex-col bg-[#F3F4F5] p-5 rounded-2xl rounded-tl-none w-full shadow-sm">
                            <div className="flex justify-between mb-2">
                              <span className="font-bold text-[#191C1D] text-sm">{reply.author.name}</span>
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{reply.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-20">
          <button className="text-sm font-bold text-[#0052CC] hover:underline flex items-center gap-2 mx-auto uppercase tracking-extra-wide group">
            Load More Discussions
            <i className="ri-arrow-down-line group-hover:translate-y-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
