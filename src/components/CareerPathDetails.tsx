import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Briefcase, GraduationCap, Clock, Users, Brain, Code, Palette } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const careerPaths = {
  'data-scientist': {
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make better decisions',
    growth: '+24%',
    avgSalary: '$105,000',
    matchScore: 92,
    overview: 'Data Scientists are analytical experts who utilize their skills in both technology and social science to find trends and manage data. They use industry knowledge, contextual understanding, and skepticism of existing assumptions to uncover solutions to business challenges.',
    skills: [
      'Python Programming',
      'Statistical Analysis',
      'Machine Learning',
      'Data Visualization',
      'SQL',
      'Big Data Technologies',
      'Deep Learning',
      'Business Intelligence'
    ],
    responsibilities: [
      'Collect and analyze large datasets',
      'Build predictive models',
      'Create data visualizations',
      'Communicate insights to stakeholders',
      'Develop machine learning algorithms',
      'Optimize business processes'
    ],
    education: [
      'Bachelor\'s degree in Computer Science, Statistics, or related field',
      'Master\'s degree in Data Science or related field (recommended)',
      'Certifications in data science tools and platforms'
    ],
    experience: [
      'Entry-level: 0-2 years',
      'Mid-level: 2-5 years',
      'Senior: 5+ years'
    ],
    icon: <Brain className="h-8 w-8" />
  },
  'full-stack-developer': {
    title: 'Full Stack Developer',
    description: 'Build both frontend and backend of web applications',
    growth: '+22%',
    avgSalary: '$97,500',
    matchScore: 88,
    overview: 'Full Stack Developers are versatile professionals who work on both the frontend and backend of web applications. They handle everything from user interface design to server-side logic and database management.',
    skills: [
      'JavaScript/TypeScript',
      'React/Vue/Angular',
      'Node.js',
      'Python/Java/PHP',
      'SQL/NoSQL',
      'Git',
      'Docker',
      'AWS/Azure/GCP'
    ],
    responsibilities: [
      'Develop frontend applications',
      'Build backend services',
      'Design database schemas',
      'Implement security measures',
      'Optimize application performance',
      'Deploy applications to cloud platforms'
    ],
    education: [
      'Bachelor\'s degree in Computer Science or related field',
      'Bootcamp certification (alternative path)',
      'Online courses and self-study'
    ],
    experience: [
      'Entry-level: 0-2 years',
      'Mid-level: 2-5 years',
      'Senior: 5+ years'
    ],
    icon: <Code className="h-8 w-8" />
  },
  'ux-ui-designer': {
    title: 'UX/UI Designer',
    description: 'Create intuitive, accessible interfaces and experiences',
    growth: '+19%',
    avgSalary: '$89,000',
    matchScore: 85,
    overview: 'UX/UI Designers focus on creating user-friendly, visually appealing interfaces that provide excellent user experiences. They combine creativity with user research to design products that are both beautiful and functional.',
    skills: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Interaction Design',
      'Figma/Adobe XD',
      'User Testing',
      'Design Systems'
    ],
    responsibilities: [
      'Conduct user research',
      'Create wireframes and prototypes',
      'Design user interfaces',
      'Test and iterate designs',
      'Create design systems',
      'Collaborate with developers'
    ],
    education: [
      'Bachelor\'s degree in Design, HCI, or related field',
      'UX/UI Design bootcamp',
      'Online design courses'
    ],
    experience: [
      'Entry-level: 0-2 years',
      'Mid-level: 2-5 years',
      'Senior: 5+ years'
    ],
    icon: <Palette className="h-8 w-8" />
  }
};

const CareerPathDetails: React.FC = () => {
  const navigate = useNavigate();
  const { pathId } = useParams();
  const careerPath = careerPaths[pathId as keyof typeof careerPaths];

  if (!careerPath) {
    return <div>Career path not found</div>;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-4 text-ghibli-forest-green hover:text-ghibli-forest-green/80 hover:bg-ghibli-light-green/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center">
            <div className="bg-ghibli-light-green/20 p-2 rounded-full mr-3">
              {careerPath.icon}
            </div>
            <h1 className="text-3xl font-bold text-ghibli-deep-navy">{careerPath.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>{careerPath.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{careerPath.overview}</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>Key technical and soft skills needed for this role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careerPath.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-ghibli-forest-green"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
                <CardDescription>Main duties and tasks in this role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerPath.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="h-2 w-2 rounded-full bg-ghibli-forest-green mt-2"></div>
                      <span>{responsibility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Information</CardTitle>
                <CardDescription>Key metrics and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span>Growth Rate</span>
                    </div>
                    <span className="font-medium">{careerPath.growth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-ghibli-forest-green" />
                      <span>Average Salary</span>
                    </div>
                    <span className="font-medium">{careerPath.avgSalary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-ghibli-forest-green" />
                      <span>Education</span>
                    </div>
                    <span className="font-medium">Bachelor's Degree</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-ghibli-forest-green" />
                      <span>Experience</span>
                    </div>
                    <span className="font-medium">2-5 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education Path</CardTitle>
                <CardDescription>Recommended educational requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careerPath.education.map((edu, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="h-2 w-2 rounded-full bg-ghibli-forest-green mt-2"></div>
                      <span>{edu}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Levels</CardTitle>
                <CardDescription>Career progression stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careerPath.experience.map((exp, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="h-2 w-2 rounded-full bg-ghibli-forest-green mt-2"></div>
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-ghibli-forest-green hover:bg-ghibli-forest-green/90">
              Start Learning Path
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerPathDetails; 