import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, Shield, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HotelCard from '../components/HotelCard';
import hotelsAPI from '../utils/api/hotelsAPI';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllHotels, setShowAllHotels] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const loadHotels = async () => {
    try {
      setLoading(true);
      const response = await hotelsAPI.getAll();
      if (response.success) {
        setHotels(response.data);
      }
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const features = [
    { icon: Star, title: 'Premium Properties', desc: 'Handpicked luxury hotels' },
    { icon: Shield, title: 'Secure Booking', desc: 'Safe & encrypted payments' },
    { icon: Clock, title: '24/7 Support', desc: 'Always here to help' }
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920"
            alt="Hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6"
          >
            Experience <span className="text-blue-500">Luxury</span> Living
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            {user 
              ? `Welcome back, ${user.name}! Discover your next adventure`
              : 'Discover extraordinary stays across India\'s finest destinations'
            }
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center max-w-2xl mx-auto bg-gray-800 rounded-full p-2 shadow-2xl"
          >
            <Search className="w-6 h-6 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Search destinations or hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition flex items-center space-x-2">
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gray-800 rounded-xl border border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {showAllHotels ? 'All Hotels' : 'Featured Properties'}
            </h2>
            <p className="text-gray-400 text-lg">
              {showAllHotels 
                ? `Showing all ${filteredHotels.length} hotels`
                : filteredHotels.length > 6 
                  ? `Explore our top 6 featured hotels (${filteredHotels.length} total available)`
                  : 'Explore our handpicked luxury hotels'
              }
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllHotels ? filteredHotels : filteredHotels.slice(0, 6)).map((hotel) => (
              <HotelCard key={hotel._id || hotel.id} hotel={hotel} />
            ))}
          </div>
          {filteredHotels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No hotels found matching your search.</p>
            </div>
          )}
          {!showAllHotels && filteredHotels.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllHotels(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center space-x-2"
              >
                <span>View All {filteredHotels.length} Hotels</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
          {showAllHotels && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllHotels(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {user ? 'Ready for Your Next Adventure?' : 'Ready to Start Your Journey?'}
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {user 
              ? 'Explore our collection of luxury hotels and book your perfect getaway today'
              : 'Join thousands of happy travelers and experience the finest hospitality India has to offer'
            }
          </p>
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
            >
              View My Dashboard
            </button>
          ) : (
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
            >
              Get Started Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};
export default Landing;
