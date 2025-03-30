
import React from 'react';
import { ArrowRight, Lightbulb, BarChart, Brain, FileText, Users, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="ghibli-card p-6 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-ghibli-light-green bg-opacity-20 p-3 rounded-full mr-4">
        <Icon className="h-6 w-6 text-ghibli-forest-green" />
      </div>
      <h3 className="text-xl font-bold text-ghibli-deep-navy">{title}</h3>
    </div>
    <p className="text-gray-700">{description}</p>
    <button className="mt-4 text-ghibli-forest-green font-medium flex items-center group">
      Learn more 
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "AI-Powered Career Recommendations",
      description: "Get personalized career suggestions based on your interests, strengths, and personality."
    },
    {
      icon: BarChart,
      title: "Real-Time Industry Insights",
      description: "Access up-to-date information on job demand, salary projections, and career growth trends."
    },
    {
      icon: Brain,
      title: "Adaptive Learning Paths",
      description: "Follow customized skill roadmaps that adjust to your progress and learning preferences."
    },
    {
      icon: FileText,
      title: "Resume & Portfolio Builder",
      description: "Create professional resumes and portfolios that showcase your skills and experience."
    },
    {
      icon: Users,
      title: "Peer Learning & Community",
      description: "Connect with peers who share your career interests for collaborative learning."
    },
    {
      icon: MessageSquare,
      title: "AI Career Coach",
      description: "Get guidance, motivation, and support from our intelligent AI assistant."
    }
  ];

  return (
    <div className="min-h-screen bg-ghibli-clouds bg-cover bg-fixed">
      <Navbar activeSection="features" />
      
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-ghibli-deep-navy mb-6">
            Discover Our Features
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            Career Compass offers a comprehensive suite of tools and resources to help you navigate your career journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
