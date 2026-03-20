import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

function SignupPage() {
  const { isSigningUp, signup } = useAuthStore();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-950 selection:bg-cyan-500/30">
      <div className="relative w-full max-w-5xl shadow-2xl shadow-cyan-900/20 rounded-2xl overflow-hidden">
        <BorderAnimatedContainer>
          <div className="flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl">

            {/* LEFT SIDE - FORM */}
            <div className="flex w-full items-center justify-center border-b md:border-b-0 md:border-r border-slate-700/50 p-8 lg:p-12 md:w-1/2">
              <div className="w-full max-w-sm">
                {/* HEADER */}
                <div className="mb-10 text-center">
                  <div className="inline-flex p-3 rounded-2xl bg-slate-800 mb-4 border border-slate-700">
                    <MessageCircleIcon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Join the community and start connecting
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* FULL NAME */}
                  <div className="space-y-2">
                    <label htmlFor="fullname" className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        required
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@gmail.com"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                      Password
                    </label>
                    <div className="relative group">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-cyan-900/20 mt-2"
                  >
                    {isSigningUp ? (
                      <>
                        <LoaderIcon className="h-5 w-5 animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* LOGIN LINK */}
                <p className="mt-8 text-center text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-cyan-500 font-medium hover:underline decoration-cyan-500/30 underline-offset-4"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - IMAGE */}
            <div className="hidden md:flex flex-col items-center justify-center p-12 bg-slate-800/30 md:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
                <img
                  src="/signup.png"
                  alt="Signup illustration"
                  className="relative mx-auto max-w-sm h-auto object-contain drop-shadow-2xl"
                />
              </div>

              <div className="mt-12 text-center max-w-xs">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Start Your Journey Today
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Create your profile and start chatting with friends in a secure environment.
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                    Free Forever
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                    Secure
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                    Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignupPage;