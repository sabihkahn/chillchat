import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroImg = "https://scontent.whatsapp.net/v/t39.8562-34/316546300_547692113846445_7299710494491288098_n.png?stp=dst-webp&ccb=1-7&_nc_sid=73b08c&_nc_ohc=jnE6MH61qdIQ7kNvwHixkHT&_nc_oc=AdkiTLy4NtoL92s5Ic99sxz79tIb0j2wyj8hb2qgBXsaWXEGuAbXkDJkErSV_5cS9yM&_nc_zt=3&_nc_ht=scontent.whatsapp.net&_nc_gid=zvpPZnG98q_Xb0bPFgolDA&_nc_ss=8&oh=01_Q5Aa4AGtsL08iQ2Ek9HcipNjkhEaQAIwWDcNOPJOHSu60PY9qA&oe=69B5B0E5";
  const stickersImg = "https://scontent.whatsapp.net/v/t39.8562-34/409964903_7655947307754468_3960711266215354357_n.png?stp=dst-webp&ccb=1-7&_nc_sid=73b08c&_nc_ohc=0yzU0RQ0SLMQ7kNvwE5BVpG&_nc_oc=AdlWPDSAb-r-HwD7MGqDWY7ceYBGwZU0cExIW4bPIwIBsN3jSBmAAY749O5HZmQafEQ&_nc_zt=3&_nc_ht=scontent.whatsapp.net&_nc_gid=zvpPZnG98q_Xb0bPFgolDA&_nc_ss=8&oh=01_Q5Aa4AHtIRuevuWjuKUXvdyn_YbT2E9_9nwkdl96FyT0hNPfxA&oe=69B5B0C0";
  const fullWidthImg = "https://scontent.whatsapp.net/v/t39.8562-34/473083383_985260680138627_8314586055954509622_n.png?stp=dst-webp&ccb=1-7&_nc_sid=73b08c&_nc_ohc=xYuLIHcRbxEQ7kNvwGpVV27&_nc_oc=Adl6coC1mm27fp9ReOL_xH0YrQF3xAuk_XyPk5aeJviSq5og1cJjCnbJgpHtpfrTOZg&_nc_zt=3&_nc_ht=scontent.whatsapp.net&_nc_gid=zvpPZnG98q_Xb0bPFgolDA&_nc_ss=8&oh=01_Q5Aa4AGudOZC5em4wjgZsOxuhXYm60D86Jk6LOG6Nz7nwcp5lA&oe=69B5A90E";

  return (
    <div className="font-sans text-slate-900 overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-[90vh] bg-[#fcfcfc] flex items-center overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-100 rounded-full blur-[120px] opacity-50 z-0"></div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-12 z-10">
          <div className="w-full md:w-1/2 flex flex-col space-y-6 text-center md:text-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Message <br />
              <span className="text-[#25D366]">privately.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-lg">
              Simple, reliable, private messaging and calling for free*, available all over the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 pt-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#1ebe5d] transition-all shadow-xl shadow-green-200">
                Download Now
              </button>
              <Link to="/login" className="w-full sm:w-auto px-10 py-4 bg-white text-center text-slate-800 font-bold border-2 border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
                Login
              </Link>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">* Data charges may apply</p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img src={heroImg} alt="Hero" className="w-full h-auto drop-shadow-2xl rounded-[2.5rem]" />
          </div>
        </div>
      </section>

      {/* SECTION 2: SAY WHAT YOU FEEL */}
      <section className="w-full bg-white py-24 px-6 md:px-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={stickersImg} alt="Stickers" className="w-full max-w-[480px] h-auto drop-shadow-xl" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Say what <br /> you feel
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              Express yourself without words. Use stickers and GIFs or share everyday moments on Status. 
              Record a voice message for a quick hello or a longer story.
            </p>
            <button className="text-[#128C7E] font-bold text-lg hover:underline underline-offset-8">
              Explore features &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: FULL WIDTH IMAGE SECTION */}
      <section className="w-full bg-[#f0f2f5] pt-20">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Never miss a moment</h2>
          <p className="text-lg text-slate-600">High-quality calling for your most important connections.</p>
        </div>
        <div className="w-full flex justify-center pb-10">
          <img 
            src={fullWidthImg} 
            alt="Full Display" 
            className="w-full h-auto max-w-[1200px] object-cover rounded-3xl shadow-2xl" 
          />
        </div>
      </section>

      {/* FOOTER WAVE */}
      <div className="bg-[#f0f2f5] h-20 w-full"></div>
    </div>
  );
};

export default HeroSection;