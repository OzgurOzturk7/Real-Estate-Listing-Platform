import Navbar from '@/components/Navbar';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Redefining Your Real Estate Journey</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            At Bestate, we believe that finding a home should be as exciting as living in one. As a fresh perspective in the real estate market, we combine cutting-edge technology with deep local expertise to simplify your search. Whether you are buying your first home or investing in your future, we are here to guide you every step of the way with clarity and passion.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
            <p className="text-gray-600 dark:text-gray-400">Properties Listed</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">24/7</h3>
            <p className="text-gray-600 dark:text-gray-400">Dedicated Support</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100%</h3>
            <p className="text-gray-600 dark:text-gray-400">Verified Portfolios</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Modern</h3>
            <p className="text-gray-600 dark:text-gray-400">User Experience</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg">
            <p>
              Bestate was born out of a simple idea: making the real estate market more transparent and accessible for everyone. While we are a new name in the industry, our team brings years of collective experience and a modern digital approach to the table, starting this journey to eliminate the complexities of traditional real estate and provide a seamless, data-driven experience for the next generation of homeowners.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transparency is our foundation. We provide verified listings and honest information, ensuring you can make decisions with total confidence.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We don't just list properties; we curate opportunities. Our commitment to quality ensures that you only see the best options available.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                By leveraging smart filters and a user-centric interface, we’ve built a platform that thinks like you do, making the search process faster and smarter.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Our team of experienced real estate professionals is dedicated to helping you achieve your property goals. With deep market knowledge and a passion for service, we're here to guide you every step of the way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Alim Özgür Öztürk</h3>
              <p className="text-gray-600 dark:text-gray-400">CEO & Founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Selin Türkdoğan</h3>
              <p className="text-gray-600 dark:text-gray-400">Head of Sales & Founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Saadettin Saran</h3>
              <p className="text-gray-600 dark:text-gray-400">Customer Relations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}