
import React, { useState } from 'react';
import { Search, MapPin, Clock, Star, Filter, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Mock job data that would typically come from an API
  const jobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $110,000",
      posted: "2 days ago",
      description: "We're looking for a Frontend Developer with experience in React and modern CSS frameworks.",
      skills: ["React", "JavaScript", "CSS", "Responsive Design"],
      matchPercentage: 92
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "New York, NY",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      posted: "1 week ago",
      description: "Join our creative team to design beautiful and intuitive user interfaces for web and mobile applications.",
      skills: ["Figma", "UI Design", "User Research", "Prototyping"],
      matchPercentage: 85
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "WebSolutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100,000 - $140,000",
      posted: "3 days ago",
      description: "Looking for a Full Stack Developer who can work with both frontend and backend technologies.",
      skills: ["JavaScript", "Node.js", "React", "MongoDB", "API Development"],
      matchPercentage: 78
    },
    {
      id: 4,
      title: "JavaScript Developer",
      company: "AppWorks",
      location: "Remote",
      type: "Contract",
      salary: "$50 - $70 per hour",
      posted: "Just now",
      description: "Short-term contract for a JavaScript developer to help with an ongoing web application project.",
      skills: ["JavaScript", "ES6", "TypeScript", "Testing"],
      matchPercentage: 88
    },
    {
      id: 5,
      title: "Product Designer",
      company: "InnovateCo",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$40 - $50 per hour",
      posted: "1 day ago",
      description: "Part-time opportunity for a product designer to join our UX team and help shape our mobile app experience.",
      skills: ["UI Design", "User Testing", "Wireframing", "Sketch"],
      matchPercentage: 72
    }
  ];
  
  const filteredJobs = jobListings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-ghibli-clouds bg-cover bg-fixed">
      <Navbar isLoggedIn={true} activeSection="jobs" />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-ghibli-deep-navy mb-4 md:mb-0">Find Your Perfect Job</h1>
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="ghibli-card p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {filtersVisible && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-ghibli-light-green focus:ring focus:ring-ghibli-light-green focus:ring-opacity-50 ghibli-input">
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-ghibli-light-green focus:ring focus:ring-ghibli-light-green focus:ring-opacity-50 ghibli-input">
                    <option value="">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="new-york">New York</option>
                    <option value="san-francisco">San Francisco</option>
                    <option value="chicago">Chicago</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-ghibli-light-green focus:ring focus:ring-ghibli-light-green focus:ring-opacity-50 ghibli-input">
                    <option value="">All Levels</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid-Level</option>
                    <option value="senior">Senior</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12 ghibli-card">
                <p className="text-gray-500 mb-4">No jobs found matching your search criteria.</p>
                <Button onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="mr-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-2">
              1
            </Button>
            <Button variant="default" className="mx-2">
              2
            </Button>
            <Button variant="outline" className="mx-2">
              3
            </Button>
            <Button variant="outline" className="ml-2">
              Next
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  matchPercentage: number;
}

const JobCard = ({ job }: { job: Job }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="ghibli-card overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-ghibli-deep-navy">{job.title}</h2>
            <p className="text-ghibli-forest-green font-medium">{job.company}</p>
            <div className="flex items-center mt-2 text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="mr-4">{job.location}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{job.posted}</span>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              job.matchPercentage >= 85 ? "bg-green-100 text-green-800" :
              job.matchPercentage >= 70 ? "bg-yellow-100 text-yellow-800" :
              "bg-blue-100 text-blue-800"
            }`}>
              {job.matchPercentage}% Match
            </span>
            <p className="text-sm mt-2">{job.type}</p>
            <p className="text-sm font-medium mt-1">{job.salary}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className={`text-gray-600 ${expanded ? '' : 'line-clamp-2'}`}>
            {job.description}
          </p>
          
          {expanded && (
            <div className="mt-4">
              <h3 className="font-medium text-ghibli-deep-navy mb-2">Required Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-ghibli-light-green bg-opacity-20 text-ghibli-forest-green px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={() => setExpanded(!expanded)} variant="outline" size="sm">
              {expanded ? "Show Less" : "Show More"}
            </Button>
            <Button variant="default" size="sm">
              Apply Now
            </Button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <Star className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
