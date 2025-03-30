
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Briefcase, BookOpen, Award, PenSquare, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import OnboardingFlow from '@/components/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import ChatAssistant from '@/components/ChatAssistant';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const [onboardingStarted, setOnboardingStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const startOnboarding = () => {
    setOnboardingStarted(true);
  };
  
  const handleOnboardingComplete = (userData: any) => {
    setIsAuthenticated(true);
    setUserData(userData);
  };
  
  if (isAuthenticated && userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ghibli-light-green/20 to-white">
        <Navbar isLoggedIn={true} activeSection="dashboard" />
        <div className="pt-20">
          <Dashboard userData={userData} />
        </div>
        <ChatAssistant />
        <Footer />
      </div>
    );
  }
  
  if (onboardingStarted) {
    return (
      <div className="min-h-screen bg-ghibli-gradient bg-ghibli-clouds bg-no-repeat bg-cover">
        <Navbar />
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-ghibli-gradient bg-ghibli-clouds bg-no-repeat bg-cover">
      <Navbar activeSection="home" />
      
      <main className="pt-20">
        {/* Hero section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ghibli-deep-navy mb-6 leading-tight">
                  Navigate Your Career Journey with AI Guidance
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Career Compass provides personalized career recommendations, skill roadmaps, and AI-powered job matching to help you find your perfect path.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    className="bg-ghibli-forest-green hover:bg-ghibli-forest-green/90 text-white text-lg px-8 py-6 ghibli-button"
                    onClick={startOnboarding}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-2 border-ghibli-forest-green text-ghibli-forest-green hover:bg-ghibli-forest-green/10 ghibli-button"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-ghibli-warm-amber/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-ghibli-light-blue/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-ghibli-light-green/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
                  <div className="relative ghibli-card p-8 h-full flex flex-col items-center justify-center">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="ghibli-card p-4 flex items-center justify-center">
                        <GraduationCap className="h-10 w-10 text-ghibli-forest-green" />
                      </div>
                      <div className="ghibli-card p-4 flex items-center justify-center">
                        <Briefcase className="h-10 w-10 text-ghibli-warm-amber" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">AI-Powered Career Guidance</h3>
                    <p className="text-center text-gray-600 mb-8">Personalized recommendations based on your skills, interests, and goals</p>
                    <img 
                      src="https://t4.ftcdn.net/jpg/01/31/96/99/360_F_131969925_4npM7jqii8Dlo76mRROdD0r285Oojc8d.jpg" 
                      alt="Career Path Visualization" 
                      className="w-full max-w-xs rounded-lg shadow-lg mb-4" 
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-ghibli-deep-navy mb-4">
                Discover Your Path Forward
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Career Compass combines advanced AI with personalized guidance to help you navigate your career journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<GraduationCap className="h-10 w-10" />}
                title="AI Career Recommendations"
                description="Get personalized career suggestions based on your skills, personality, and interests."
                iconBg="bg-ghibli-light-green/20"
                iconColor="text-ghibli-forest-green"
              />
              <FeatureCard 
                icon={<BookOpen className="h-10 w-10" />}
                title="Interactive Skill Roadmaps"
                description="Visualize and track your progress on customized learning paths for your chosen career."
                iconBg="bg-ghibli-light-blue/20"
                iconColor="text-ghibli-light-blue"
              />
              <FeatureCard 
                icon={<Briefcase className="h-10 w-10" />}
                title="AI Job Matching"
                description="Connect with job opportunities that align with your unique skills and career goals."
                iconBg="bg-ghibli-warm-amber/20"
                iconColor="text-ghibli-warm-amber"
              />
              <FeatureCard 
                icon={<Award className="h-10 w-10" />}
                title="Soft Skills Training"
                description="Develop essential interpersonal and leadership skills through AI-driven coaching."
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
              />
              <FeatureCard 
                icon={<PenSquare className="h-10 w-10" />}
                title="Resume Builder"
                description="Create professional resumes tailored to your target roles with AI assistance."
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
              <FeatureCard 
                icon={<Globe className="h-10 w-10" />}
                title="Peer Learning Community"
                description="Connect with peers on similar career paths for support and collaboration."
                iconBg="bg-green-100"
                iconColor="text-green-600"
              />
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-ghibli-deep-navy text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join thousands of students and job seekers who are navigating their career paths with confidence using Career Compass.
            </p>
            <Button 
              className="bg-ghibli-light-green hover:bg-ghibli-light-green/90 text-ghibli-deep-navy font-semibold text-lg px-8 py-6 ghibli-button"
              onClick={startOnboarding}
            >
              Begin Your Career Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, iconBg, iconColor }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="ghibli-card p-8 transition-all duration-300"
    >
      <div className={`rounded-full w-16 h-16 ${iconBg} ${iconColor} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Index;
