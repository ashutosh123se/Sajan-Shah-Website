'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    { 
      title: "You Don’t Lack Motivation. You Lack a System.", 
      intro: "The Motivation Myth That’s Holding You Back",
      content: "Motivation is celebrated everywhere. But the truth is simple: motivation is unreliable. It rises with emotion and disappears with discomfort. If your progress depends on it, your results will always be inconsistent. High performers don’t rely on motivation. They rely on systems.",
      why: "Your brain is wired to: Avoid discomfort, Conserve energy, Repeat familiar patterns. Motivation fights this biology. Systems work with it.",
      execution: [
        { t: "Fix your time, not your mood", d: "“I study at 7 PM daily” beats “I’ll study when I feel like it.”" },
        { t: "Design your environment", d: "Remove distractions. Prepare your space. Make action easy." },
        { t: "Start small, build momentum", d: "10 minutes daily > 3 hours once a week." },
        { t: "Track actions, not outcomes", d: "Consistency builds identity. Identity builds results." },
        { t: "Remove friction before starting", d: "Prepare everything in advance. Starting should feel effortless." }
      ],
      closing: "Motivation starts you. Systems sustain you."
    },
    { 
      title: "Your Brain Is Not Lazy. It’s Misaligned.", 
      intro: "The Real Problem Isn’t Laziness",
      content: "People label themselves lazy. But laziness is often misalignment, between what you want and how your brain operates. Your brain is not against you. It is simply following patterns.",
      why: "Why Misalignment Happens: No clarity of goals, Overwhelming tasks, No structured approach. Result: avoidance, delay, distraction.",
      execution: [
        { t: "Define clear, specific tasks", d: "Not “study science” → “complete chapter 2 notes”" },
        { t: "Break tasks into micro-actions", d: "Small steps reduce mental resistance." },
        { t: "Align tasks with energy cycles", d: "Do deep work when your energy is highest." },
        { t: "Remove overload", d: "Too many tasks = no action. Focus on 1–2 priorities." },
        { t: "Create visible progress", d: "Checklists reinforce completion." }
      ],
      closing: "You are not lazy. You are unaligned. Fix the system, not yourself."
    },
    { 
      title: "The Focus Formula: How Top Performers Stay Consistent", 
      intro: "Focus Is Not a Talent",
      content: "Most people believe focus requires discipline. In reality, focus is designed. Top performers don’t force focus. They engineer it.",
      why: "The Focus Formula: Focus = Environment + Clarity + Time Control",
      execution: [
        { t: "Control your environment", d: "Phone away. Clean desk. Fixed location." },
        { t: "Define one task at a time", d: "Clarity eliminates confusion." },
        { t: "Use time blocks (25–45 min)", d: "Work → break → repeat." },
        { t: "Pre-plan your day", d: "No decisions during execution." },
        { t: "Eliminate multitasking", d: "Single-tasking = deep work." }
      ],
      closing: "Focus is not forced. It is engineered."
    },
    { 
      title: "How Parents Shape a Child’s Confidence (Without Realizing It)", 
      intro: "Confidence Is Not Built in School",
      content: "It is built at home, through daily interactions. Every word, tone, and reaction becomes a belief in a child’s mind.",
      why: "The Invisible Damage: Parents unintentionally Compare, Criticize, and Focus only on results. This creates fear of failure, low self-worth, and performance anxiety.",
      execution: [
        { t: "Replace criticism with correction", d: "Not “wrong” → “let’s improve this”" },
        { t: "Appreciate effort, not outcome", d: "Effort builds growth mindset." },
        { t: "Allow failure", d: "Failure builds resilience." },
        { t: "Listen actively", d: "Understanding builds trust." },
        { t: "Model behavior", d: "Children copy more than they listen." }
      ],
      closing: "A child becomes what they repeatedly hear at home."
    },
    { 
      title: "Your Memory Is Not Weak. It’s Untrained.", 
      intro: "The Biggest Myth About Memory",
      content: "People say: “I forget easily.” But forgetting is not the problem. Poor encoding is. Your brain remembers what is Visual, Connected, and Repeated.",
      why: "Why You Forget: Passive reading, No revision strategy, No recall practice.",
      execution: [
        { t: "Use association (linking)", d: "Connect new info to known ideas." },
        { t: "Visualize concepts", d: "Turn words into images." },
        { t: "Teach what you learn", d: "Explaining = deeper understanding." },
        { t: "Use spaced repetition", d: "Revise at intervals (Day 1, 3, 7)" },
        { t: "Practice active recall", d: "Close book → test yourself." }
      ],
      closing: "Don’t study harder. Train your memory smarter."
    }
  ];

  const exploreLinks = [
    { name: "Book Sajan Shah for Speaking", href: "/events#book-sajan" },
    { name: "Join Live Webinars", href: "/events#webinars" },
    { name: "Explore Programs", href: "/speaking#programs" },
    { name: "Watch Transformation Videos", href: "https://www.youtube.com/@SajanShah" },
    { name: "Live to Inspire", href: "https://www.unitedfirst.in/" }
  ];

  const secondaryLinks = [
    { name: "For Event Organisers", href: "/event-organiser-briefing-note" },
    { name: "For Podcast & Media Interviews", href: "/podcast-media-briefing-note" },
    { name: "Success Stories", href: "https://www.youtube.com/@teamsajanshah" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Terms and Conditions", href: "/terms-and-conditions" },
    { name: "Refund and Replacement Policy", href: "/refund-policy" },
    { name: "AI Policy", href: "/ai-policy" }
  ];

  const socialLinks = [
    { 
      name: "Instagram", 
      href: "https://www.instagram.com/sajan_shahh/", 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
    },
    { 
      name: "Twitter", 
      href: "https://x.com/sajanofficial", 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
    },
    { 
      name: "Youtube", 
      href: "https://www.youtube.com/@SajanShah", 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg>
    },
    { 
      name: "Facebook", 
      href: "https://www.facebook.com/SajanShahPage", 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/sajan-shaah-7840244a/", 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
    }
  ];

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t-8 border-[#f26522] z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Block 1 */}
          <div className="col-span-1 lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-3xl font-light tracking-tighter">sajan<span className="font-bold">shah</span></h2>
              <p className="text-[#f26522] font-bold uppercase tracking-widest text-xs mt-1">neuroscience for greatness</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Sajan Shah is one of India’s youngest motivational speakers, widely known as the Memory Man of India, and a globally recognized voice in human transformation.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              A 3-time TEDx speaker, speaker at the World Parliament of Religions, and author of 8 books, he has impacted over 16 million lives across students, parents, and professionals.
            </p>
            <button className="bg-white text-gray-900 hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-6 py-3 transition-colors" onClick={() => window.location.href = '/about'}>
              Explore The Journey
            </button>
            <div className="pt-6 border-t border-gray-800 mt-8">
              <img 
                src="/LOGO2.png" 
                alt="Credentials" 
                className="h-32 w-auto object-contain" 
              />
            </div>
          </div>

          {/* Block 2 - From the Blog */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 uppercase tracking-widest">From the Blog</h3>
            <ul className="space-y-6">
              {blogPosts.map((post, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="group text-left block w-full"
                  >
                    <h4 className="text-gray-400 font-light group-hover:text-white transition-colors line-clamp-2 leading-relaxed">{post.title}</h4>
                    <p className="text-[10px] text-[#f26522] mt-2 font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={10} />
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 3 */}
          <div className="col-span-1 h-fit">
            <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">Sign up for Updates</h3>
            <div className="w-12 h-1 bg-[#f26522] mb-6"></div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed font-light">
              Actionable insights, neuroscience-backed strategies, and powerful shifts, designed to improve focus, confidence, and performance.
            </p>
            <form className="space-y-3" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] focus:border-[#f26522] outline-none text-white placeholder-gray-500 transition-colors" required />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] focus:border-[#f26522] outline-none text-white placeholder-gray-500 transition-colors" required />
              <button type="submit" className="w-full bg-[#f26522] hover:bg-[#d95a1e] text-white font-bold py-4 uppercase tracking-widest text-xs transition-colors mt-4">
                Subscribe Now
              </button>
            </form>
          </div>

          {/* Block 4 */}
          <div className="col-span-1 space-y-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 uppercase tracking-widest">Explore More</h3>
              <ul className="space-y-3">
                {exploreLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-gray-400 hover:text-white font-light transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 uppercase tracking-widest">Quick Links</h3>
              <ul className="space-y-2">
                {secondaryLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-gray-500 hover:text-[#f26522] font-light text-sm transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900/50 border border-gray-800 text-[#f26522] hover:bg-[#f26522] hover:text-white hover:border-[#f26522] hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-light">
            © {currentYear} Sajan Shah. All rights reserved.
          </p>
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl no-scrollbar"
            >
              {/* Watermark Signature */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.03]">
                <img 
                  src="/sir sign.png" 
                  alt="Watermark" 
                  className="w-[80%] rotate-[-15deg] object-contain" 
                />
              </div>

              <div className="sticky top-0 right-0 p-6 flex justify-end z-20">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="bg-black/5 hover:bg-black/10 p-3 rounded-full transition-colors group"
                >
                  <X size={24} className="text-black group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="px-8 md:px-16 pb-20 relative z-10">
                <div className="mb-12">
                  <div className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-xs mb-4">Blog Article</div>
                  <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 uppercase tracking-tighter leading-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="w-20 h-1 bg-[#f26522]"></div>
                </div>

                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-6 uppercase tracking-widest border-l-4 border-[#f26522] pl-6">
                      {selectedPost.intro}
                    </h3>
                    <p className="text-gray-700 text-lg font-light leading-relaxed">
                      {selectedPost.content}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-8 md:p-10 rounded-[2rem] border border-gray-100">
                    <h4 className="text-[#f26522] font-bold uppercase tracking-widest text-xs mb-6">The Insight</h4>
                    <p className="text-gray-600 font-light italic leading-relaxed text-lg">
                      {selectedPost.why}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-black mb-8 uppercase tracking-tighter">Strategic Execution</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedPost.execution.map((step: any, i: number) => (
                        <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl group hover:border-[#f26522]/30 transition-colors shadow-sm">
                          <div className="text-[#f26522] font-bold text-lg mb-2">{i + 1}. {step.t}</div>
                          <p className="text-gray-500 text-sm font-light leading-relaxed">{step.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-12 border-t border-gray-100 text-center">
                    <div className="text-gray-400 uppercase tracking-[0.5em] text-[10px] mb-4">Final Thought</div>
                    <div className="text-black text-2xl md:text-3xl font-bold italic tracking-tight">
                      "{selectedPost.closing}"
                    </div>
                    <div className="mt-12 flex justify-center opacity-30">
                       <img src="/sir sign.png" alt="Signature" className="h-16 w-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
    </footer>
  );
};
