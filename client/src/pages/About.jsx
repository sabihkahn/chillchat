import React from 'react';
import { ShieldCheck, Zap, Globe, Users } from 'lucide-react';
import Header from '../components/Header';

const About = () => {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <Header />
      {/* Hero Section: The Mission */}
      <section className="relative py-20 bg-slate-50 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Our mission is to <span className="text-[#25D366]">connect the world</span> privately.
          </h1>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            At Life Rumors, we believe that your conversations should stay between you and the people you care about. 
            We are building a platform where freedom of expression meets uncompromising security.
          </p>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 px-6 md:px-20 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-green-100 text-[#25D366] rounded-2xl"><ShieldCheck size={32} /></div>
            <h3 className="text-xl font-bold">Privacy First</h3>
            <p className="text-slate-500 text-sm">End-to-end encryption is at the heart of everything we build.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl"><Zap size={32} /></div>
            <h3 className="text-xl font-bold">Lightning Fast</h3>
            <p className="text-slate-500 text-sm">Optimized protocols ensure your messages deliver instantly, anywhere.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl"><Globe size={32} /></div>
            <h3 className="text-xl font-bold">Global Reach</h3>
            <p className="text-slate-500 text-sm">Available in over 180 countries, keeping families connected across borders.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl"><Users size={32} /></div>
            <h3 className="text-xl font-bold">Community Driven</h3>
            <p className="text-slate-500 text-sm">Designed for people, not for advertisers. Your data is never for sale.</p>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="py-20 px-6 md:px-20 bg-slate-900 text-white">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Visit our HQ</h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              We're headquartered in the heart of the tech district, 
              where our team of engineers and designers work around the clock 
              to keep **Life Rumors** running smoothly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full text-[#25D366]">📍</span>
                <p>123 Privacy Lane, Silicon Valley, CA 94025</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full text-[#25D366]">📧</span>
                <p>hello@liferumors.com</p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
            <iframe
              title="Life Rumors Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6282365437!2d-122.08385108469242!3d37.421999879825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24adcf25951%3A0x6734ef9482d8c90!2sGoogleplex!5e0!3m2!1sen!2sus!4v1647452667123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;