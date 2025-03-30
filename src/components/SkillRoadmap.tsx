import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SkillRoadmap: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState('data-science');
  const navigate = useNavigate();
  
  const skillAreaData = {
    'data-science': {
      name: 'Data Science',
      progress: 60,
      steps: [
        { id: 'python', name: 'Python Basics', status: 'completed', level: 'Beginner' },
        { id: 'data-analysis', name: 'Data Analysis', status: 'completed', level: 'Beginner' },
        { id: 'statistics', name: 'Statistics', status: 'in-progress', level: 'Intermediate' },
        { id: 'machine-learning', name: 'Machine Learning', status: 'locked', level: 'Intermediate' },
        { id: 'deep-learning', name: 'Deep Learning', status: 'locked', level: 'Advanced' },
      ]
    },
    'web-development': {
      name: 'Web Development',
      progress: 40,
      steps: [
        { id: 'html-css', name: 'HTML & CSS', status: 'completed', level: 'Beginner' },
        { id: 'javascript', name: 'JavaScript', status: 'in-progress', level: 'Beginner' },
        { id: 'react', name: 'React', status: 'locked', level: 'Intermediate' },
        { id: 'backend', name: 'Backend Development', status: 'locked', level: 'Intermediate' },
        { id: 'fullstack', name: 'Full Stack Projects', status: 'locked', level: 'Advanced' },
      ]
    },
    'design': {
      name: 'UI/UX Design',
      progress: 25,
      steps: [
        { id: 'design-basics', name: 'Design Principles', status: 'completed', level: 'Beginner' },
        { id: 'figma', name: 'Figma', status: 'in-progress', level: 'Beginner' },
        { id: 'wireframing', name: 'Wireframing', status: 'locked', level: 'Intermediate' },
        { id: 'prototyping', name: 'Prototyping', status: 'locked', level: 'Intermediate' },
        { id: 'user-research', name: 'User Research', status: 'locked', level: 'Advanced' },
      ]
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'locked': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'locked': return 'Locked';
      default: return 'Unknown';
    }
  };
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const handleViewCourses = () => {
    navigate('/dashboard?tab=learning');
  };
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue={activeSkill} onValueChange={setActiveSkill}>
        <TabsList className="mb-6">
          <TabsTrigger value="data-science">Data Science</TabsTrigger>
          <TabsTrigger value="web-development">Web Development</TabsTrigger>
          <TabsTrigger value="design">UI/UX Design</TabsTrigger>
        </TabsList>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{skillAreaData[activeSkill as keyof typeof skillAreaData].name} Journey</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
              <div 
                className="bg-ghibli-forest-green h-4 rounded-full transition-all duration-300"
                style={{ width: `${skillAreaData[activeSkill as keyof typeof skillAreaData].progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{skillAreaData[activeSkill as keyof typeof skillAreaData].progress}%</span>
          </div>
        </div>
      
        {Object.keys(skillAreaData).map((key) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-5 top-10 w-0.5 h-[calc(100%-4rem)] bg-gray-200"></div>
              
              {/* Skill steps */}
              {skillAreaData[key as keyof typeof skillAreaData].steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="flex mb-8">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full ${getStatusColor(step.status)} flex items-center justify-center text-white z-10 relative`}>
                        {step.status === 'completed' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : step.status === 'in-progress' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    <Card className={`ml-4 flex-grow p-5 ${step.status === 'locked' ? 'opacity-75' : ''}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">{step.name}</h4>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getLevelColor(step.level)}`}>
                              {step.level}
                            </span>
                            <span className="text-xs text-gray-500">
                              {getStatusLabel(step.status)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 md:mt-0">
                          {step.status === 'completed' ? (
                            <Button size="sm" variant="outline">Review</Button>
                          ) : step.status === 'in-progress' ? (
                            <Button size="sm" className="bg-ghibli-forest-green hover:bg-ghibli-forest-green/90">Continue</Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled>Locked</Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                className="bg-ghibli-forest-green hover:bg-ghibli-forest-green/90"
                onClick={handleViewCourses}
              >
                View Recommended Courses
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SkillRoadmap;
