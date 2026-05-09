import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Sajan Shah - Memory Man of India',
  description: 'Learn about Sajan Shah, the Memory Man of India, Global Youth Speaker, and Neuroscience-Backed Educator. Discover his journey, achievements, and mission.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white font-sans">
      <div className="bg-[#0C0C0C]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              About Sajan Shah.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Memory Man of India • Global Youth Speaker • Neuroscience-Backed Educator
            </p>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-wide">
                  The Journey
                </h2>
                <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                  <p>
                    From a curious student fascinated by the workings of the human mind to becoming 
                    India's recognized Memory Man, Sajan Shah's journey is a testament to dedication, 
                    scientific curiosity, and the transformative power of education.
                  </p>
                  <p>
                    With over a decade of experience in memory science and education, Sajan has 
                    revolutionized how thousands approach learning, memory, and personal development. 
                    His unique blend of neuroscience research and practical application has made him a 
                    sought-after speaker and educator across India and internationally.
                  </p>
                  <p>
                    Today, Sajan continues to push the boundaries of what's possible in education, 
                    developing innovative programs that help students, professionals, and organizations 
                    unlock their full cognitive potential.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-white/10 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="/about-journey.jpg"
                  alt="Sajan Shah's journey"
                  className="relative rounded-2xl shadow-2xl border border-white/10 object-cover w-full h-[500px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-24 bg-[#141414] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
                Achievements & Recognition
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Memory Man of India',
                  description: 'Nationally recognized for exceptional memory capabilities and techniques',
                  icon: '🧠',
                },
                {
                  title: '200,000+ Students',
                  description: 'Lives transformed through innovative memory training programs',
                  icon: '👥',
                },
                {
                  title: '500+ Events',
                  description: 'Workshops and seminars conducted across India and abroad',
                  icon: '🎯',
                },
                {
                  title: 'Global Speaker',
                  description: 'Inspired audiences in 30+ countries worldwide',
                  icon: '🌍',
                },
                {
                  title: 'Corporate Trainer',
                  description: 'Elevated organizational performance through customized programs',
                  icon: '💼',
                },
                {
                  title: 'Education Innovator',
                  description: 'Pioneered neuroscience-backed learning methodologies',
                  icon: '🔬',
                },
              ].map((achievement, index) => (
                <div key={index} className="bg-[#0C0C0C] p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-300">
                  <div className="text-4xl mb-6">{achievement.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-wide">
                  Educational Philosophy
                </h2>
                <div className="space-y-10">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 tracking-wide">
                      Science-Based Learning
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Every technique and methodology is grounded in cognitive science research, 
                      ensuring effective and sustainable learning outcomes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 tracking-wide">
                      Practical Application
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Theory meets practice with real-world applications that students can use 
                      immediately in their academic and professional lives.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 tracking-wide">
                      Personalized Approach
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Recognizing that every mind is unique, programs are designed to adapt 
                      to individual learning styles and cognitive patterns.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#141414] p-10 md:p-12 rounded-3xl border border-white/10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-8 tracking-wide">
                  Core Values
                </h3>
                <div className="space-y-6">
                  {[
                    'Excellence in Education',
                    'Scientific Integrity',
                    'Student Success',
                    'Continuous Innovation',
                    'Global Impact',
                    'Community Building',
                  ].map((value, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span className="text-gray-300 font-medium tracking-wide">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-wide">
              Our Mission
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
              To revolutionize education through neuroscience-backed memory techniques, 
              empowering individuals to unlock their full cognitive potential and achieve extraordinary success.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/programs"
                className="bg-white text-black px-10 py-4 rounded-xl font-semibold tracking-wide hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Programs
              </Link>
              <Link 
                href="/contact"
                className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-xl font-semibold tracking-wide hover:bg-white/5 transition-all shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
