import { DemoBackgroundPaths } from "@/components/ui/demo";
import FuturisticFeaturesSection from "@/components/ui/FuturisticFeaturesSection";
import VisualStatisticsSection from "@/components/ui/VisualStatisticsSection";
import EnhancedDemoSection from "@/components/ui/EnhancedDemoSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import ConservationFooter from "@/components/ui/ConservationFooter";
import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo";
import Link from "next/link";

const testimonials = [
  {
    name: "Priya S.",
    role: "Sustainability Lead, EcoMart",
    text: "This dashboard transformed our inventory process and made sustainability tracking effortless!",
  },
  {
    name: "Rahul M.",
    role: "Admin, GreenGrocers",
    text: "The return module and carbon analytics helped us reduce waste and improve compliance.",
  },
  {
    name: "Ayesha K.",
    role: "Procurement, FreshFields",
    text: "We love the real-time expiry tracking and the ability to upload certifications for every product.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-white dark:bg-neutral-950 overflow-x-hidden">
      {/* NavBar */}
      <NavBarDemo />
      {/* Hero Section */}
      <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center relative">
        {/* Animated background - always behind, never blocks clicks */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DemoBackgroundPaths />
        </div>
        {/* Content - always above, always clickable */}
        <div className="relative z-20 flex flex-col items-center justify-center gap-6">
          <h1 className="text-6xl md:text-8xl font-extrabold text-center bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text drop-shadow-lg mb-4">
            Eco Inventory
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-center text-[var(--primary)] font-semibold max-w-2xl drop-shadow">
            Smarter stock. Greener returns.
          </p>

          <div className="flex gap-4">
            <Link
              href="/login/admin"
              className="rounded-xl px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Admin Login
            </Link>
            <Link
              href="/login/customer"
              className="rounded-xl px-6 py-3 bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Customer Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full"><FuturisticFeaturesSection /></section>

      {/* Visual Statistics Section */}
      <section id="statistics" className="w-full"><VisualStatisticsSection /></section>

      {/* Enhanced Demo Section */}
      <section id="demo" className="w-full"><EnhancedDemoSection /></section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full"><TestimonialsSection /></section>

      {/* Footer Section */}
      <section id="footer" className="w-full"><ConservationFooter /></section>
    </div>
  );
}
