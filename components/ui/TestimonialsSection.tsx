'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya S.",
      role: "Sustainability Lead",
      company: "EcoMart",
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face", // Random human image
      content: "This dashboard transformed our inventory process and made sustainability tracking effortless. The carbon analytics and expiry alerts are game-changers for our team.",
      rating: 5,
      featured: true
    },
    {
      id: 2,
      name: "Rahul M.",
      role: "Admin",
      company: "GreenGrocers",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The return module and carbon footprint analytics helped us reduce waste and improve compliance. Our team now makes data-driven decisions every day.",
      rating: 5,
      featured: false
    },
    {
      id: 3,
      name: "Ayesha K.",
      role: "Procurement Manager",
      company: "FreshFields",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "We love the real-time expiry tracking and the ability to upload certifications for every product. The dashboard makes ethical sourcing easy to manage.",
      rating: 5,
      featured: true
    },
    {
      id: 4,
      name: "David Park",
      role: "Compliance Officer",
      company: "DevSolutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Incredible attention to sustainability and compliance. The dashboard’s waste impact tracking and smart alerts keep us ahead of regulations.",
      rating: 5,
      featured: false
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Operations Manager",
      company: "GlobalTech",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "This platform has been instrumental in our growth. The admin dashboard’s insights into returns and carbon savings are truly impressive.",
      rating: 5,
      featured: true
    }
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500 dark:text-gray-700'}`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-purple-500/10 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full mb-6">
            <Quote className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience.
          </p>
        </div>

        {/* Main testimonial carousel */}
        <div className="relative mb-16">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-neutral-900 rounded-3xl shadow-xl p-8 md:p-12 border border-neutral-800 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                      {/* Avatar */}
                      <div className="relative">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={128}
                          height={128}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-500/20"
                        />
                        {testimonial.featured && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                          <StarRating rating={testimonial.rating} />
                        </div>
                        <blockquote className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed mb-6">
                          &quot;{testimonial.content}&quot;
                        </blockquote>
                        <div>
                          <div className="font-bold text-white text-lg mb-1">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-neutral-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:bg-blue-900/30"
          >
            <ChevronLeft className="w-6 h-6 text-gray-300 group-hover:text-blue-400" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-neutral-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:bg-blue-900/30"
          >
            <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-blue-400" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToTestimonial(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                idx === currentIndex
                  ? 'bg-blue-500 w-8'
                  : 'bg-gray-700 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-neutral-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-300">Happy Clients</div>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
            <div className="text-gray-300">Satisfaction Rate</div>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">4.9/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 