'use client';
import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const blogPosts = [
    { title: "You Don’t Lack Motivation. You Lack a System.", link: "#" },
    { title: "Your Brain Is Not Lazy. It’s Misaligned.", link: "#" },
    { title: "The Focus Formula: How Top Performers Stay Consistent", link: "#" },
    { title: "How Parents Shape a Child’s Confidence (Without Realizing It)", link: "#" },
    { title: "Your Memory Is Not Weak. It’s Untrained.", link: "#" }
  ];

  const exploreLinks = [
    { name: "Become a Certified Mentor", href: "#" },
    { name: "Book Sajan Shah for Speaking", href: "/speaking" },
    { name: "Join Live Webinars", href: "https://webinar.sajanshah.com" },
    { name: "Explore Programs", href: "/programs" },
    { name: "Watch Transformation Videos", href: "https://www.youtube.com/@SajanShah" },
    { name: "Live to Inspire", href: "/impact" }
  ];

  const secondaryLinks = [
    { name: "For Event Organisers", href: "#" },
    { name: "For Podcast & Media Interviews", href: "#" },
    { name: "Success Stories", href: "https://www.youtube.com/@teamsajanshah" },
    { name: "Privacy Policy", href: "https://docs.google.com/document/d/1qr5l8OqkDrdOqmWwKhdFt0LzOaQcF5kVsdsEEgXwXgs/edit?usp=drive_link" },
    { name: "Terms of service", href: "https://docs.google.com/document/d/14_Pnu-gfEiDYcTu5NOy4T1Y9p_ZJB-fPnldokeKgGLg/edit?usp=drive_link" },
    { name: "Terms and Conditions", href: "https://docs.google.com/document/d/1KsdvF-vf7pomBgVaJRXZ2FewJNzna6bu1sr8wL9m2bE/edit?usp=drive_link" },
    { name: "Refund and replacement Policy", href: "https://docs.google.com/document/d/1ral0mySL2HjLbFK5siee9Xb4HJx27yYgJckINqPsgfU/edit?usp=sharing" },
    { name: "AI Policy", href: "https://docs.google.com/document/d/1MfMZbLyhQ7WQFz9Fa5GCX2c2XVAsx_POygtQ7izUK8U/edit?usp=sharing" }
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/sajan_shahh/" },
    { name: "Twitter", href: "https://x.com/sajanofficial" },
    { name: "Youtube", href: "https://www.youtube.com/@SajanShah" },
    { name: "Facebook", href: "https://www.facebook.com/SajanShahPage" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/sajan-shaah-7840244a/" }
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t-8 border-[#f26522]">
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
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              As the founder of United First and Live to Inspire, he leads one of the largest movements aligned with the United Nations Sustainable Development Goals 2030 in India.
            </p>
            <p className="text-white font-medium">
              His work focuses on one core mission, <br/><span className="text-[#f26522]">to transform how people think, perform, and live.</span>
            </p>
            <button className="bg-white text-gray-900 hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-6 py-3 transition-colors" onClick={() => window.location.href = '/about'}>
              Explore The Journey
            </button>
            <div className="pt-6 border-t border-gray-800 mt-8">
              <p className="text-xs text-[#f26522] font-bold mb-3 uppercase tracking-wider">Credentials</p>
              <div className="text-xs text-gray-400 flex flex-wrap gap-2 uppercase tracking-widest">
                <span className="bg-[#151515] border border-gray-800 px-3 py-1.5">TEDx Speaker</span>
                <span className="bg-[#151515] border border-gray-800 px-3 py-1.5">World Parliament of Religions</span>
                <span className="bg-[#151515] border border-gray-800 px-3 py-1.5">United First</span>
                <span className="bg-[#151515] border border-gray-800 px-3 py-1.5">Live to Inspire</span>
                <span className="bg-[#151515] border border-gray-800 px-3 py-1.5">UN SDG 2030 Alignment</span>
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 uppercase tracking-widest">From the Blog</h3>
            <ul className="space-y-4">
              {blogPosts.map((post, idx) => (
                <li key={idx}>
                  <Link href={post.link} className="group block">
                    <h4 className="text-gray-400 font-light group-hover:text-white transition-colors line-clamp-2 leading-relaxed">{post.title}</h4>
                    <p className="text-[10px] text-[#f26522] mt-2 font-bold uppercase tracking-widest">Read More →</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 3 */}
          <div className="col-span-1 bg-[#111] p-8 border border-gray-800 h-fit">
            <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">Sign up for Updates</h3>
            <div className="w-12 h-1 bg-[#f26522] mb-6"></div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed font-light">
              Actionable insights, neuroscience-backed strategies, and powerful shifts, designed to improve focus, confidence, and performance in real life. No fluff. Only what works.
            </p>
            <form className="space-y-3" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] focus:border-[#f26522] outline-none text-white placeholder-gray-500 transition-colors" required />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] focus:border-[#f26522] outline-none text-white placeholder-gray-500 transition-colors" required />
              <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] focus:border-[#f26522] outline-none text-white placeholder-gray-500 transition-colors" required />
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
                    <Link href={link.href} className="text-gray-500 hover:text-[#f26522] font-light text-sm transition-colors" target={link.href.startsWith('http') ? '_blank' : undefined}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            {socialLinks.map((social, idx) => {
              // Get SVG icon based on the social platform name
              let iconSvg = null;
              switch (social.name) {
                case 'Instagram':
                  iconSvg = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>;
                  break;
                case 'Twitter':
                  iconSvg = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
                  break;
                case 'Youtube':
                  iconSvg = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg>;
                  break;
                case 'Facebook':
                  iconSvg = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>;
                  break;
                case 'LinkedIn':
                  iconSvg = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>;
                  break;
                default:
                  iconSvg = <span>{social.name}</span>;
              }

              return (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f26522] transition-colors" aria-label={social.name}>
                  {iconSvg}
                </a>
              );
            })}
          </div>
          <p className="text-gray-600 text-xs uppercase tracking-widest">
            © {currentYear} Sajan Shah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
