import React from 'react';
import { Code, Lightbulb, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="text-gray-800 dark:text-gray-200 py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-gray-100">
            About Me
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Hi, I'm André, a front-end developer with a unique blend of marketing strategy and technical expertise. Having transitioned from digital marketing to development, I bring a business-oriented perspective to every line of code I write.
            </p>
            <p>
              My passion lies in creating seamless, responsive, and strategically crafted user interfaces. Using React, TypeScript, and advanced analytics, I ensure every digital experience is aligned with clear business outcomes.
            </p>
            <p>
              Driven by continuous learning and community involvement, I've completed Harvard's CS50 and actively engage in global tech communities, consistently pushing my skills and perspectives forward.
            </p>
            <p>
              Let's collaborate to build something impactful, an experience that not only looks great but genuinely moves your business forward.
            </p>
          </div>
          {/* Cards Grid Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Code, title: 'Clean Code', text: 'I prioritize readability and maintainability, writing code that is easy for others (and future me) to understand.' },
              { icon: Zap, title: 'Performance', text: 'I optimize for speed and efficiency, ensuring fast load times and smooth interactions across devices.' },
              { icon: Lightbulb, title: 'Innovation', text: 'I embrace new technologies and creative approaches to solve problems and deliver cutting-edge experiences.' },
              { icon: Users, title: 'Continuous Learning', text: 'I embrace a growth mindset, constantly exploring new tools and methodologies to improve my craft.' }
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 transition-colors duration-500">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
