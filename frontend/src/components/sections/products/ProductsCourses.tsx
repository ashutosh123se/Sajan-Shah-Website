'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import api from '@/lib/api';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

interface CourseProduct {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  image?: string;
  buy_url_internal?: string;
  price?: number;
  isSoldOut: boolean;
}

export const ProductsCourses: React.FC = () => {
  const [coursesList, setCoursesList] = useState<CourseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/v1/products');
        const dbProducts = response.data.data.products || [];
        const dbCourses = dbProducts.filter(
          (p: any) => String(p.category || '').toLowerCase() === 'course' && p.is_active !== false
        );
        setCoursesList(
          dbCourses.map((c: any) => ({
            id: c.id,
            name: c.name,
            subtitle: c.short_description || 'A Premium Course',
            description: c.description,
            image: c.image_product_page || c.image_homepage || 'https://placehold.co/800x600/0a0a0a/3b82f6?text=COURSE',
            buy_url_internal: c.buy_url_internal || '#',
            price: c.price !== null ? Number(c.price) : 0,
            isSoldOut: !c.is_active,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setCoursesList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const activeCourses = coursesList;

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 bg-[#0a0a0a]">
        Loading Courses...
      </div>
    );
  }

  if (activeCourses.length === 0) {
    return (
      <section id="courses" className="py-24 bg-[#0a0a0a] text-center text-gray-500">
        No courses available yet.
      </section>
    );
  }

  return (
    <section id="courses" className="py-24 bg-[#0a0a0a] relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="md:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 bg-[#f26522] text-white text-[10px] font-black tracking-widest uppercase rounded-full mb-6"
              >
                COURSES BY SAJAN SHAH
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase leading-none"
              >
                Step-by-Step <br />Systems for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f26522] to-[#ff8c4a]">Real Growth</span>
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:w-1/3"
            >
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Transform your life with structured learning modules designed for measurable impact.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {activeCourses.map((course: CourseProduct, index: number) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative bg-black rounded-[30px] overflow-hidden border border-white/5 group flex flex-col h-full transition-all duration-500 hover:border-[#f26522]/30 ${course.isSoldOut ? 'opacity-70' : ''}`}
            >
              <div className="relative aspect-video overflow-hidden border-b border-white/5">

                <img 
                  src={course.image} 
                  alt={course.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 z-20">
                   <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-white border border-white/10 shadow-xl">
                      Featured Course
                   </div>
                </div>

                {course.isSoldOut && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30">
                    <div className="px-8 py-3 border border-white/20 text-white font-black text-xl uppercase tracking-[0.2em] bg-black/50 rounded-lg">
                      Sold Out
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow relative overflow-hidden">


                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight leading-none group-hover:text-[#f26522] transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-[#f26522] font-bold text-[10px] mb-6 tracking-widest uppercase">
                    {course.subtitle}
                  </p>
                  <p className="text-gray-400 font-light text-sm leading-relaxed mb-10 flex-grow">
                    {course.description}
                  </p>
                  
                  <div>
                     {course.isSoldOut ? (
                       <div className="text-gray-500 font-bold text-[10px] uppercase tracking-widest border border-white/10 px-6 py-3 rounded-full inline-block">
                          Next Batch Coming Soon
                       </div>
                     ) : (
                       <button 
                         onClick={() => {
                           addToCart({
                             id: course.id,
                             title: course.name,
                             description: course.description,
                             price: course.price || 4999,
                             imageUrl: course.image || '',
                             category: 'course',
                             stock: 100
                           }, 1);
                           router.push('/cart');
                         }}
                         className="inline-flex items-center text-white font-black text-sm uppercase tracking-widest hover:text-[#f26522] transition-colors group/link"
                       >
                          Add to Cart 
                          <svg className="ml-2 w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                       </button>
                     )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
