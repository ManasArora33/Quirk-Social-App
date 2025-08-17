import { MessageSquareQuote, Sparkles, Users, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const LandingPage = () => {
    const [hovered, setHovered] = useState<'primary' | 'secondary' | 'cta' | null>(null);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ x: -100, y: -100 }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-purple-900/10 to-indigo-900/5 blur-xl"
                />
            </div>

            {/* Header + Hero */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Nav */}
                <div className="py-6 flex items-center justify-between">
                    <Link to="/" className="inline-flex items-center gap-2 text-xl font-black hover:opacity-90">
                        <MessageSquareQuote size={28} className="text-purple-400" />
                        <span className="tracking-tight">Quirk</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-full border border-gray-800 text-gray-300 hover:text-white hover:bg-white/5 transition"
                            onMouseEnter={() => setHovered('secondary')}
                            onMouseLeave={() => setHovered(null)}
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg transition"
                            onMouseEnter={() => setHovered('primary')}
                            onMouseLeave={() => setHovered(null)}
                        >
                            Get started
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="relative py-10 md:py-20"
                >
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        {/* Left copy */}
                        <div>
                            <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 text-purple-300 text-xs mb-4">
                                <Sparkles size={14} />
                                <span>Now with OAuth & Timelines</span>
                            </motion.div>
                            <motion.h1
                                variants={item}
                                className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300"
                            >
                                Share your quirks. Build your community.
                            </motion.h1>
                            <motion.p variants={item} className="mt-4 text-lg md:text-xl text-gray-300">
                                A fast, elegant, and secure microblogging platform. Join conversations that matter with a delightful, modern UI.
                            </motion.p>
                            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg transition"
                                >
                                    Start for free
                                    <ArrowRight size={16} />
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-6 py-3 rounded-full font-semibold border border-gray-800 text-gray-300 hover:text-white hover:bg-white/5 transition"
                                >
                                    Sign in
                                </Link>
                            </motion.div>
                            <motion.div variants={item} className="mt-6 flex items-center gap-6 text-sm text-gray-400">
                                <div className="flex items-center gap-2"><Users size={16} className="text-purple-400" /> Real people</div>
                                <div className="flex items-center gap-2"><Zap size={16} className="text-purple-400" /> Blazing fast</div>
                            </motion.div>
                        </div>

                        {/* Right preview */}
                        <motion.div
                            variants={item}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-2xl rounded-3xl" />
                            <div className="relative rounded-3xl border border-gray-800/60 bg-gray-900/40 backdrop-blur-md p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
                                            <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                                                <span className="text-xs text-white font-semibold">Q</span>
                                            </div>
                                        </div>
                                        <span className="font-semibold">Quirk Feed</span>
                                    </div>
                                    <span className="text-xs text-gray-400">Preview</span>
                                </div>
                                {/* Mock tweets */}
                                <div className="space-y-4">
                                    {[1,2].map((i) => (
                                        <div key={i} className="rounded-2xl border border-gray-800/60 p-4 hover:border-purple-500/30 transition-colors bg-black/30">
                                            <div className="flex gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400" />
                                                <div className="flex-1">
                                                    <div className="h-3 w-24 bg-white/10 rounded mb-2" />
                                                    <div className="h-3 w-40 bg-white/10 rounded mb-3" />
                                                    <div className="flex gap-6 text-gray-500">
                                                        <div className="h-3 w-8 bg-white/5 rounded" />
                                                        <div className="h-3 w-8 bg-white/5 rounded" />
                                                        <div className="h-3 w-8 bg-white/5 rounded" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>

            {/* Features Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                <motion.h2
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center mb-12"
                >
                    Why Choose Quirk?
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Sparkles size={24} className="text-purple-400" />, title: "Minimal Design", text: "Clean, distraction-free interface that puts your content first." },
                        { icon: <Zap size={24} className="text-purple-400" />, title: "Lightning Fast", text: "Optimized performance for seamless browsing experience." },
                        { icon: <Users size={24} className="text-purple-400" />, title: "Real Community", text: "Connect with like-minded people in meaningful discussions." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-purple-400/30 transition-colors"
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <motion.div whileHover={{ rotate: 20 }}>
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                            </div>
                            <p className="text-gray-300">{feature.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
            >
                <motion.h2
                    className="text-3xl font-bold mb-6"
                    whileInView={{
                        backgroundSize: ['100% 2px', '100% 100%'],
                        backgroundPosition: ['0 100%', '0 100%']
                    }}
                    viewport={{ once: true }}
                    style={{
                        backgroundImage: 'linear-gradient(to right, #a855f7, #6366f1)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 2px',
                        backgroundPosition: '0 100%',
                        display: 'inline'
                    }}
                >
                    Ready to join the conversation?
                </motion.h2>
                <motion.p
                    className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                    whileInView={{ x: [10, 0] }}
                    viewport={{ once: true }}
                >
                    Sign up now and start your Quirk journey today.
                </motion.p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/register"
                        className="inline-block px-8 py-3 rounded-full font-bold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all relative overflow-hidden"
                    >
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: hovered === 'cta' ? 10 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-white/10 rounded-full"
                            onMouseEnter={() => setHovered('cta')}
                            onMouseLeave={() => setHovered(null)}
                        />
                        <span className="relative z-10">Create Your Account</span>
                    </Link>
                </motion.div>
            </motion.section>

            {/* Footer */}
            <footer className="border-t border-gray-800/60 bg-black/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                    <div>© {new Date().getFullYear()} Quirk. All rights reserved.</div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hover:text-white transition">Sign in</Link>
                        <Link to="/register" className="hover:text-white transition">Get started</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
