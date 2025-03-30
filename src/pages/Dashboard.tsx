
import React from 'react';
import { AreaChart, PieChart, BarChart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // This would typically be fetched from an API
  const userStats = {
    skillsCompleted: 12,
    coursesInProgress: 3,
    nextMilestone: "Advanced JavaScript",
    recommendedJobs: 5
  };

  return (
    <div className="min-h-screen bg-ghibli-clouds bg-cover bg-fixed">
      <Navbar isLoggedIn={true} activeSection="dashboard" />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-ghibli-deep-navy mb-8">Welcome back, User!</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Skills Completed" 
              value={userStats.skillsCompleted} 
              icon={<AreaChart className="h-8 w-8 text-ghibli-light-green" />}
            />
            <StatCard 
              title="Courses In Progress" 
              value={userStats.coursesInProgress} 
              icon={<BarChart className="h-8 w-8 text-ghibli-warm-amber" />}
            />
            <StatCard 
              title="Recommended Jobs"

              value={userStats.recommendedJobs} 
              icon={<PieChart className="h-8 w-8 text-ghibli-dusty-rose" />}
            />
            <div className="ghibli-card p-6">
              <h3 className="text-sm text-gray-500 mb-1">Next Milestone</h3>
              <div className="text-xl font-semibold text-ghibli-deep-navy">
                {userStats.nextMilestone}
              </div>
              <Button 
                variant="outline" 
                className="mt-4 w-full text-ghibli-forest-green"
              >
                Start Learning
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="ghibli-card p-6 h-full">
                <h2 className="text-xl font-bold text-ghibli-deep-navy mb-4">Your Career Path</h2>
                <div className="h-64 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Career progress visualization will appear here</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <CareerMilestone title="Beginner" isActive={true} />
                  <CareerMilestone title="Intermediate" isActive={false} />
                  <CareerMilestone title="Advanced" isActive={false} />
                </div>
              </div>
            </div>
            
            <div className="ghibli-card p-6">
              <h2 className="text-xl font-bold text-ghibli-deep-navy mb-4">Recommended Skills</h2>
              <ul className="space-y-4">
                <SkillItem name="JavaScript" proficiency={65} />
                <SkillItem name="React.js" proficiency={42} />
                <SkillItem name="Node.js" proficiency={28} />
                <SkillItem name="UI/UX Design" proficiency={18} />
              </ul>
              <Button 
                variant="default" 
                className="mt-6 w-full"
              >
                View Skill Roadmap
              </Button>
            </div>
          </div>
          
          <div className="ghibli-card p-6">
            <h2 className="text-xl font-bold text-ghibli-deep-navy mb-4">Recommended Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <JobCard 
                title="Frontend Developer" 
                company="TechCorp" 
                location="Remote" 
                matchPercentage={92} 
              />
              <JobCard 
                title="UI/UX Designer" 
                company="DesignHub" 
                location="New York, NY" 
                matchPercentage={85} 
              />
              <JobCard 
                title="Full Stack Developer" 
                company="WebSolutions" 
                location="San Francisco, CA" 
                matchPercentage={78} 
              />
            </div>
            <div className="text-center mt-6">
              <Button 
                variant="outline"
                className="text-ghibli-forest-green"
              >
                View All Jobs
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
  <div className="ghibli-card p-6">
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <div className="flex justify-between items-center">
      <div className="text-2xl font-semibold text-ghibli-deep-navy">{value}</div>
      {icon}
    </div>
  </div>
);

const CareerMilestone = ({ title, isActive }: { title: string, isActive: boolean }) => (
  <div className={`p-3 text-center rounded-lg ${isActive ? 'bg-ghibli-light-green bg-opacity-30 text-ghibli-forest-green' : 'bg-gray-100 text-gray-500'}`}>
    <span className="font-medium">{title}</span>
  </div>
);

const SkillItem = ({ name, proficiency }: { name: string, proficiency: number }) => (
  <li>
    <div className="flex justify-between mb-1">
      <span className="font-medium">{name}</span>
      <span className="text-sm text-gray-500">{proficiency}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-ghibli-light-green rounded-full h-2" 
        style={{ width: `${proficiency}%` }}
      ></div>
    </div>
  </li>
);

const JobCard = ({ title, company, location, matchPercentage }: { title: string, company: string, location: string, matchPercentage: number }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-ghibli-deep-navy">{title}</h3>
      <span className="text-sm font-medium bg-ghibli-light-green bg-opacity-20 text-ghibli-forest-green px-2 py-1 rounded-full">
        {matchPercentage}% Match
      </span>
    </div>
    <p className="text-sm text-gray-700">{company}</p>
    <p className="text-sm text-gray-500 mb-3">{location}</p>
    <Button variant="outline" size="sm" className="w-full">View Job</Button>
  </div>
);

export default Dashboard;
