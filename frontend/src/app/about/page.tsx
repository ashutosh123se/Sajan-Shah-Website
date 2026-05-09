import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Sajan Shah - Memory Man of India',
  description: 'Learn about Sajan Shah, the Memory Man of India, Global Youth Speaker, and Neuroscience-Backed Educator. Discover his journey, achievements, and mission.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Sajan Shah
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Memory Man of India • Global Youth Speaker • Neuroscience-Backed Educator
              </p>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  The Journey
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
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
              <div className="relative">
                <img
                  src="/about-journey.jpg"
                  alt="Sajan Shah's journey"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Educational Philosophy
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Science-Based Learning
                    </h3>
                    <p className="text-gray-600">
                      Every technique and methodology is grounded in cognitive science research, 
                      ensuring effective and sustainable learning outcomes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Practical Application
                    </h3>
                    <p className="text-gray-600">
                      Theory meets practice with real-world applications that students can use 
                      immediately in their academic and professional lives.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Personalized Approach
                    </h3>
                    <p className="text-gray-600">
                      Recognizing that every mind is unique, programs are designed to adapt 
                      to individual learning styles and cognitive patterns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Core Values
                </h3>
                <div className="space-y-4">
                  {[
                    'Excellence in Education',
                    'Scientific Integrity',
                    'Student Success',
                    'Continuous Innovation',
                    'Global Impact',
                    'Community Building',
                  ].map((value, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              To revolutionize education through neuroscience-backed memory techniques, 
              empowering individuals to unlock their full cognitive potential and achieve extraordinary success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/programs'}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Programs
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
