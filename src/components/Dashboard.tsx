import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GraduationCap, BookOpen, Award, TrendingUp, Briefcase, Calendar, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SkillRoadmap from './SkillRoadmap';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface DashboardProps {
  userData: any;
}

const mockCareerData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
];

const mockRecommendedPaths = [
  {
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make better decisions',
    growth: '+24%',
    avgSalary: '$105,000',
    matchScore: 92,
  },
  {
    title: 'Full Stack Developer',
    description: 'Build both frontend and backend of web applications',
    growth: '+22%',
    avgSalary: '$97,500',
    matchScore: 88,
  },
  {
    title: 'UX/UI Designer',
    description: 'Create intuitive, accessible interfaces and experiences',
    growth: '+19%',
    avgSalary: '$89,000',
    matchScore: 85,
  },
];

const mockEvents = [
  {
    title: 'Tech Career Fair',
    date: 'Oct 15, 2023',
    time: '10:00 AM - 3:00 PM',
    location: 'Virtual',
  },
  {
    title: 'Resume Workshop',
    date: 'Oct 18, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Career Center',
  },
  {
    title: 'Interview Prep Session',
    date: 'Oct 22, 2023',
    time: '1:00 PM - 3:00 PM',
    location: 'Virtual',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const userType = userData?.userType || 'student';
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'overview';
  const navigate = useNavigate();
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-ghibli-deep-navy mb-2">Welcome, {userData?.name || 'User'}!</h1>
        <p className="text-gray-600 mb-8">Here's your personalized career dashboard</p>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">65%</div>
                  <p className="text-xs text-muted-foreground">Complete your profile to get more accurate recommendations</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-ghibli-forest-green h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 Skills</div>
                  <p className="text-xs text-muted-foreground">You've made progress on 12 skill areas</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-ghibli-warm-amber h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Career Match Score</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">Match with top career recommendation</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-ghibli-light-blue h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Career Growth Trends</CardTitle>
                  <CardDescription>Projected growth for your recommended career paths</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mockCareerData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#86C1B2" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Career fairs and workshops</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEvents.map((event, index) => (
                      <div key={index} className={`flex items-start p-3 rounded-lg ${index % 2 === 0 ? 'bg-ghibli-soft-cream/50' : 'bg-white'}`}>
                        <div className="bg-ghibli-light-green/20 p-2 rounded-full mr-3">
                          <Calendar className="h-5 w-5 text-ghibli-forest-green" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                          <p className="text-xs text-gray-500">{event.location}</p>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-center text-ghibli-forest-green hover:text-ghibli-forest-green/80 hover:bg-ghibli-light-green/10"
                      onClick={() => navigate('/events')}
                    >
                      View All Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Career Paths</CardTitle>
                  <CardDescription>AI-powered career recommendations based on your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockRecommendedPaths.map((path, index) => (
                      <div key={index} className="ghibli-card p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{path.title}</h3>
                            <p className="text-sm text-gray-600">{path.description}</p>
                          </div>
                          <div className="bg-ghibli-light-green/20 text-ghibli-forest-green rounded-full px-2 py-1 text-xs font-medium">
                            {path.matchScore}% Match
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Growth</p>
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              <span className="font-medium">{path.growth}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Avg. Salary</p>
                            <p className="font-medium">{path.avgSalary}</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full ghibli-button"
                          onClick={() => navigate(`/career-path/${path.title.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                          Explore Path
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Your Skill Roadmap</CardTitle>
                <CardDescription>Interactive visualization of your skill progress and learning path</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillRoadmap />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Recommendations</CardTitle>
                <CardDescription>AI-matched job opportunities based on your skills and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="ghibli-card p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {index === 0 ? 'Junior Data Analyst' : 
                             index === 1 ? 'Frontend Developer' : 
                             index === 2 ? 'UX Designer' : 
                             index === 3 ? 'Product Manager Intern' : 
                             'Marketing Coordinator'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {index === 0 ? 'TechCorp, Inc.' : 
                             index === 1 ? 'WebSolutions' : 
                             index === 2 ? 'Creative Designs' : 
                             index === 3 ? 'InnovateTech' : 
                             'BrandBuilders'}
                          </p>
                        </div>
                        <div className="bg-ghibli-light-green/20 text-ghibli-forest-green rounded-full px-2 py-1 text-xs font-medium">
                          {95 - index * 3}% Match
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex space-x-2 mb-2">
                          {['Remote', 'Full-time', 'Entry Level'].map((tag, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {index === 0 ? 'Looking for a data enthusiast with SQL and Excel skills to analyze business metrics...' : 
                           index === 1 ? 'Seeking a creative developer with React skills to build beautiful user interfaces...' : 
                           index === 2 ? 'Passionate about user experience and interface design with Figma expertise...' : 
                           index === 3 ? 'Join our team to help define product roadmaps and gather user requirements...' : 
                           'Create compelling marketing campaigns and manage social media presence...'}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">Salary Range</p>
                          <p className="font-medium">
                            ${60 + index * 5}K - ${75 + index * 5}K
                          </p>
                        </div>
                        <Button variant="default" className="bg-ghibli-forest-green hover:bg-ghibli-forest-green/90 ghibli-button">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="learning">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Courses</CardTitle>
                <CardDescription>Personalized learning paths to build your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="ghibli-card p-6">
                      <div className="mb-4">
                        <h3 className="font-semibold">
                          {index === 0 ? 'Data Analysis with Python' : 
                           index === 1 ? 'React Frontend Masterclass' : 
                           index === 2 ? 'UX/UI Design Fundamentals' : 
                           index === 3 ? 'SQL for Data Scientists' : 
                           index === 4 ? 'Product Management Basics' : 
                           'Digital Marketing Essentials'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {index === 0 ? 'Coursera' : 
                           index === 1 ? 'Udemy' : 
                           index === 2 ? 'Google' : 
                           index === 3 ? 'edX' : 
                           index === 4 ? 'LinkedIn Learning' : 
                           'HubSpot Academy'}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">4.{7 + (index % 3)}</span>
                          <div className="flex ml-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-ghibli-warm-amber' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">(2,{100 + index * 50})</span>
                        </div>
                        <span className="text-sm font-medium">
                          {index % 3 === 0 ? 'Beginner' : index % 3 === 1 ? 'Intermediate' : 'Advanced'}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex space-x-2">
                          {(index === 0 ? ['Python', 'Data', 'Analysis'] : 
                            index === 1 ? ['React', 'JavaScript', 'Frontend'] : 
                            index === 2 ? ['Design', 'UI/UX', 'Wireframing'] : 
                            index === 3 ? ['SQL', 'Database', 'Data'] : 
                            index === 4 ? ['Product', 'Management', 'Agile'] : 
                            ['Marketing', 'Digital', 'SEO']).map((tag, i) => (
                            <span key={i} className="bg-ghibli-light-green/20 text-ghibli-forest-green rounded-full px-2 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full ghibli-button">
                        Enroll Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;
