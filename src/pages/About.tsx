
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-ghibli-clouds bg-cover bg-fixed">
      <Navbar activeSection="about" />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="ghibli-card p-8 mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-ghibli-deep-navy mb-6">About Career Compass</h1>
            <p className="mb-4">
              Career Compass is an AI-powered career guidance platform designed to help students and job seekers 
              navigate their professional journeys with confidence and clarity.
            </p>
            <p className="mb-4">
              Our mission is to democratize career guidance and make personalized, high-quality career advice 
              accessible to everyone, regardless of their background or resources.
            </p>
          </div>
          
          <div className="ghibli-card p-8 mb-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-ghibli-deep-navy mb-4">Our Vision</h2>
            <p className="mb-4">
              We envision a world where everyone can discover their ideal career path, develop the skills 
              they need to succeed, and connect with opportunities that align with their passions and strengths.
            </p>
            <p className="mb-4">
              By combining artificial intelligence with career development expertise, we're creating a new 
              paradigm for career guidance that's personalized, data-driven, and forward-looking.
            </p>
          </div>
          
          <div className="ghibli-card p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-ghibli-deep-navy mb-4">Our Team</h2>
            <p className="mb-4">
              Career Compass was founded by a team of career counselors, AI researchers, and education 
              technology experts who saw the need for more accessible, personalized career guidance.
            </p>
            <p className="mb-4">
              We're committed to continuous improvement and innovation, constantly updating our AI models 
              and career data to provide the most accurate and helpful guidance possible.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
