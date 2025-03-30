
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AuthForm from './AuthForm';
import ProfileForm from './ProfileForm';

interface OnboardingFlowProps {
  onComplete: (userData: any) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'userType' | 'auth' | 'profile'>('userType');
  const [userType, setUserType] = useState<'student' | 'jobSeeker' | null>(null);
  const [userData, setUserData] = useState({});

  const handleUserTypeSelect = (type: 'student' | 'jobSeeker') => {
    setUserType(type);
    setStep('auth');
  };

  const handleAuthComplete = (authData: any) => {
    setUserData({ ...userData, ...authData });
    setStep('profile');
  };

  const handleProfileComplete = (profileData: any) => {
    const completedUserData = { 
      ...userData, 
      ...profileData, 
      userType 
    };
    setUserData(completedUserData);
    onComplete(completedUserData);
  };

  const UserTypeSelection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-ghibli-deep-navy mb-4">Welcome to Career Compass</h2>
        <p className="text-lg text-gray-600">Your AI-Powered Career Guide—Helping You Navigate the Right Path!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <UserTypeCard 
          type="student"
          title="I'm a Student"
          description="Get personalized career guidance, skill roadmaps, and educational resources tailored to your academic journey."
          icon={<GraduationCap className="h-10 w-10" />}
          onClick={() => handleUserTypeSelect('student')}
        />
        
        <UserTypeCard 
          type="jobSeeker"
          title="I'm a Job Seeker"
          description="Discover career opportunities, enhance your skills, and get AI-powered job matching based on your experience."
          icon={<Briefcase className="h-10 w-10" />}
          onClick={() => handleUserTypeSelect('jobSeeker')}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {step === 'userType' && <UserTypeSelection />}
      {step === 'auth' && <AuthForm onComplete={handleAuthComplete} userType={userType!} />}
      {step === 'profile' && <ProfileForm onComplete={handleProfileComplete} userType={userType!} />}
    </div>
  );
};

interface UserTypeCardProps {
  type: 'student' | 'jobSeeker';
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({ type, title, description, icon, onClick }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="ghibli-card p-8 cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="mb-6">
        <div className={`rounded-full p-4 w-fit ${type === 'student' ? 'bg-ghibli-light-blue/20' : 'bg-ghibli-warm-amber/20'}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Button 
        variant="ghost" 
        className={`mt-auto group ${type === 'student' ? 'text-ghibli-light-blue' : 'text-ghibli-warm-amber'} hover:bg-transparent`}
      >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default OnboardingFlow;
