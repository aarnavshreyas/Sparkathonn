import React from 'react';
import { 
  Globe, 
  Leaf, 
  Shield, 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react';

export default function ConservationFooter() {
  return (
    <footer className="w-full min-h-[200px] bg-gradient-to-b from-neutral-900 to-black dark:from-neutral-950 dark:to-black overflow-hidden flex flex-col justify-end relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
                EcoFuture
              </span>
            </div>
            <p className="text-neutral-300 mb-6 text-lg leading-relaxed max-w-md">
              Pioneering the future of conservation with cutting-edge AI technology. 
              Together, we're building a sustainable tomorrow for our planet.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                Join Our Mission
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 backdrop-blur-sm"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Linkedin, href: "#", color: "hover:text-blue-500" },
                { icon: Github, href: "#", color: "hover:text-gray-400" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-neutral-400 ${social.color} transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:transform hover:scale-110 backdrop-blur-sm`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-400" />
              Solutions
            </h4>
            <ul className="space-y-4">
              {[
                "Forest Monitoring",
                "Ocean Conservation",
                "Wildlife Protection",
                "Climate Analytics",
                "Carbon Tracking",
                "Biodiversity AI"
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-neutral-300 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              Connect
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neutral-300">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <span>hello@ecofuture.ai</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">2M+</div>
                <div className="text-sm text-neutral-400">Trees Protected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-neutral-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for our planet</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Accessibility</a>
            </div>
            
            <div className="text-neutral-400 text-sm">
              © 2025 EcoFuture. All rights reserved.
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 group">
            <Zap className="w-6 h-6 group-hover:animate-pulse" />
          </button>
        </div>
      </div>
    </footer>
  );
} 