import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#4D1900]">
      {/* Navigation */}
      <nav className="bg-yellow-100 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                {/* <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9 5m-9-5v8" />
                </svg> */}
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
  <img 
    src="/roseborn-logo.jpg" 
    alt="Roseborn International School Logo" 
    className="w-full h-full object-cover"
  />
</div>
              </div>
              <span className="text-black text-xl font-bold">Roseborn Int'l School</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-black/80 hover:text-black transition-colors">Features</a>
              <a href="#instructions" className="text-black/80 hover:text-black transition-colors">Instructions</a>
              <a href="#contact" className="text-black/80 hover:text-black transition-colors">Contact</a>
            </div>

            <Link 
              href="/login"
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-black transition-colors"
            >
              Student Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ExamPortal
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              {/* A modern, secure, and efficient online examination platform designed for educational institutions.  */}
              Take your exams with confidence and get instant results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/login"
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-colors shadow-lg shadow-blue-600/25"
              >
                Start Your Exam
              </Link>
              <a
                href="#features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">25</div>
              <div className="text-white/80">Total Questions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">60</div>
              <div className="text-white/80">Minutes Duration</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">Instant</div>
              <div className="text-white/80">Results & Feedback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Exam Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a seamless examination experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Timed Examination</h3>
              <p className="text-gray-600">
                Built-in timer with automatic submission when time expires. Visual progress indicators keep you informed.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Results</h3>
              <p className="text-gray-600">
                Get immediate scoring for multiple-choice questions with detailed performance analysis.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Auto-Save Results</h3>
              <p className="text-gray-600">
                All results are automatically saved to secure Google Sheets for record-keeping and analysis.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Question Types</h3>
              <p className="text-gray-600">
                60 multiple-choice questions.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Built with security in mind. Your progress is saved locally and submissions are encrypted.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast & Responsive</h3>
              <p className="text-gray-600">
                Optimized for all devices. Smooth experience on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section id="instructions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Exam Instructions
            </h2>
            <p className="text-xl text-gray-600">
              Important guidelines for your examination
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Before You Begin</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm font-bold">1</span>
                    </div>
                    <p className="text-gray-700">Ensure you have a stable internet connection throughout the exam</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm font-bold">2</span>
                    </div>
                    <p className="text-gray-700">Use a desktop or laptop for the best experience</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm font-bold">3</span>
                    </div>
                    <p className="text-gray-700">Close all other applications and browser tabs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm font-bold">4</span>
                    </div>
                    <p className="text-gray-700">Have your student ID ready for verification</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">During the Exam</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-sm font-bold">1</span>
                    </div>
                    <p className="text-gray-700">Total duration: <strong>1 hour (60 minutes)</strong></p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-sm font-bold">2</span>
                    </div>
                    <p className="text-gray-700"><strong>60 multiple-choice</strong> questions (1 mark each)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-sm font-bold">3</span>
                    </div>
                    {/* <p className="text-gray-700"><strong>10 theory</strong> questions (5 marks each)</p> */}
                    <p className="text-gray-700">Questions auto-disable when time expires</p>
                  </div>
                  {/* <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-sm font-bold">4</span>
                    </div>
                    <p className="text-gray-700">Questions auto-disable when time expires</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ Important Notice</h3>
              <p className="text-yellow-700 text-lg">
                Do not refresh the page or navigate away during the exam. Your progress is saved locally, 
                but refreshing may cause you to lose unsaved answers. The exam will automatically submit when time expires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brown-600 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Begin Your Exam?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join other students who have successfully completed their examinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Exam Now
            </Link>
            <a
              href="#instructions"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Review Instructions
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#4D0900] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <img 
    src="/roseborn-logo.jpg" 
    alt="Roseborn International School Logo" 
    className="w-full h-full object-cover"
  />
                </div>
                <span className="text-white text-xl font-bold">Roseborn Int'l School</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                A modern online examination platform designed for Roseborn Int'l School to conduct secure and efficient assessments.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#instructions" className="text-gray-400 hover:text-white transition-colors">Instructions</a></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Student Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@examportal.com" className="text-gray-400 hover:text-white transition-colors">support@rosebornintlschool.com</a></li>
                <li><a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">+234 703 468 7011</a></li>
                <li><span className="text-gray-400">Mon-Fri: 9AM-5PM</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 Roseborn Int'l School. All rights reserved. Designed for educational purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}