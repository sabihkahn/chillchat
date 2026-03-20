import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-950 selection:bg-cyan-500/30">
      <div className="relative w-full max-w-5xl shadow-2xl shadow-cyan-900/20 rounded-2xl overflow-hidden">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl">

            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 lg:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-700/50">
              <div className="w-full max-w-sm">
                {/* HEADING TEXT */}
                <div className="text-center mb-10">
                  <div className="inline-flex p-3 rounded-2xl bg-slate-800 mb-4 border border-slate-700">
                    <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
                  <p className="text-slate-400 text-sm">Enter your credentials to access your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* EMAIL INPUT */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                      <button type="button" className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors">Forgot?</button>
                    </div>
                    <div className="relative group">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white font-semibold rounded-xl transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-cyan-900/20"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-slate-400 text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-cyan-500 font-medium hover:underline decoration-cyan-500/30 underline-offset-4">
                      Create account
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-12 bg-slate-800/30">
              <div className="relative group">
                {/* Subtle Glow behind image */}
                <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
                <img
                  src="/login.png"
                  alt="Login Illustration"
                  className="relative w-full max-w-sm h-auto object-contain drop-shadow-2xl"
                />
              </div>

              <div className="mt-12 text-center max-w-xs">
                <h3 className="text-2xl font-bold text-white mb-3">Connect anytime, anywhere</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Experience seamless communication with our secure and private platform.
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Secure</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Fast</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LoginPage;