import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-6 md:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand/Logo */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Logo1</h2>
            <p className="text-slate-400 font-light leading-relaxed">
              Simple. Reliable. Private. <br />
              Connecting the world, one message at a time.
            </p>
            <div className="flex gap-4 mt-2">
              <Facebook size={20} className="text-slate-400 hover:text-[#25D366] cursor-pointer transition-colors" />
              <Instagram size={20} className="text-slate-400 hover:text-[#25D366] cursor-pointer transition-colors" />
              <Twitter size={20} className="text-slate-400 hover:text-[#25D366] cursor-pointer transition-colors" />
              <Youtube size={20} className="text-slate-400 hover:text-[#25D366] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Column 2: Platform Links (From Header) */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contactus" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacypolicy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Account</h3>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link to="/download" className="hover:text-white transition-colors">Download App</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Help</h3>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 Logo1 Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
            <span className="cursor-pointer hover:text-white">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;