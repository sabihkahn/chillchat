import React from 'react';
import { ShieldCheck, EyeOff, Lock, Globe } from 'lucide-react';
import Header from '../components/Header';

const PrivacyPolicy = () => {
  const lastUpdated = "March 10, 2026";

  return (
    <>
    <Header />
    <div className="bg-white min-h-screen font-sans text-slate-800">
      {/* Header Section */}
      <header className="bg-slate-50 py-16 px-6 border-b border-slate-200">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-[#25D366] rounded-full text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> Privacy Protected
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 font-medium">Last Updated: {lastUpdated}</p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto max-w-4xl py-16 px-6 leading-relaxed">
        <div className="space-y-12">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-3">
              <Lock className="text-[#25D366]" size={24} />
              <h3 className="font-bold">End-to-End</h3>
              <p className="text-xs text-slate-500">Your messages are encrypted. Only you and the recipient can read them.</p>
            </div>
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-3">
              <EyeOff className="text-[#25D366]" size={24} />
              <h3 className="font-bold">No Ads</h3>
              <p className="text-xs text-slate-500">We do not sell your data to advertisers. Ever.</p>
            </div>
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-3">
              <Globe className="text-[#25D366]" size={24} />
              <h3 className="font-bold">Transparency</h3>
              <p className="text-xs text-slate-500">We are open about the limited metadata we collect to keep the service running.</p>
            </div>
          </div>

          {/* Detailed Policy Sections */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
            <p className="text-slate-600">
              **Life Rumors** receives or collects information when we operate and provide our Services, including when you install, access, or use our Services.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Your Account Information:</strong> You provide your mobile phone number and basic identifiers (like a profile name) to create an account.</li>
              <li><strong>Your Messages:</strong> We do not retain your messages in the ordinary course of providing our Services. Once delivered, they are deleted from our servers.</li>
              <li><strong>Customer Support:</strong> You may provide us with information related to your use of our Services, including copies of your messages, and how to contact you so we can provide support.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2. How We Use Information</h2>
            <p className="text-slate-600">
              We use the information we have to operate, provide, improve, understand, customize, support, and market our Services.
            </p>
            <p className="text-slate-600 italic border-l-4 border-[#25D366] pl-4">
              "We do not use your private messages for marketing purposes."
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3. Assignment, Change of Control, and Transfer</h2>
            <p className="text-slate-600">
              All of our rights and obligations under our Privacy Policy are freely assignable by us to any of our affiliates, in connection with a merger, acquisition, restructuring, or sale of assets, or by operation of law or otherwise.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4. Contact Information</h2>
            <p className="text-slate-600">
              If you have questions about our Privacy Policy, please contact us at:
            </p>
            <div className="p-6 bg-slate-900 text-white rounded-3xl inline-block">
              <p className="font-mono text-sm">privacy@liferumors.com</p>
              <p className="text-xs text-slate-400 mt-1">Life Rumors HQ, Silicon Valley, CA</p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer Spacer */}
      <div className="h-20 bg-white"></div>
    </div>
    </>
  );
};

export default PrivacyPolicy;