
import React, { useState } from 'react';
import { Search, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Technical Skills']);
  
  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(cat => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };
  
  const skillCategories = [
    {
      name: "Technical Skills",
      skills: [
        { name: "JavaScript", progress: 65, level: "Intermediate" },
        { name: "React.js", progress: 42, level: "Beginner" },
        { name: "HTML & CSS", progress: 80, level: "Advanced" },
        { name: "Node.js", progress: 28, level: "Beginner" },
      ]
    },
    {
      name: "Design Skills",
      skills: [
        { name: "UI/UX Design", progress: 35, level: "Beginner" },
        { name: "Adobe Photoshop", progress: 50, level: "Intermediate" },
        { name: "Figma", progress: 60, level: "Intermediate" },
      ]
    },
    {
      name: "Soft Skills",
      skills: [
        { name: "Communication", progress: 75, level: "Advanced" },
        { name: "Team Collaboration", progress: 85, level: "Advanced" },
        { name: "Problem Solving", progress: 70, level: "Intermediate" },
        { name: "Time Management", progress: 60, level: "Intermediate" },
      ]
    }
  ];
  
  const filteredCategories = skillCategories.map(category => ({
    ...category,
    skills: category.skills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.skills.length > 0);

  return (
    <div className="min-h-screen bg-ghibli-clouds bg-cover bg-fixed">
      <Navbar isLoggedIn={true} activeSection="skills" />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-ghibli-deep-navy mb-4 md:mb-0">My Skills</h1>
            <div className="flex w-full md:w-auto space-x-2">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search skills..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredCategories.map((category, index) => (
              <div key={index} className="ghibli-card overflow-hidden">
                <div 
                  className="p-4 bg-white bg-opacity-90 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCategory(category.name)}
                >
                  <h2 className="text-xl font-semibold text-ghibli-deep-navy">{category.name}</h2>
                  {expandedCategories.includes(category.name) ? 
                    <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </div>
                
                {expandedCategories.includes(category.name) && (
                  <div className="p-6 bg-white bg-opacity-50">
                    <div className="space-y-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-ghibli-deep-navy">{skill.name}</h3>
                              <p className="text-sm text-gray-500">{skill.level}</p>
                            </div>
                            <span className="text-sm font-medium">{skill.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`rounded-full h-2.5 ${
                                skill.level === "Beginner" ? "bg-ghibli-dusty-rose" :
                                skill.level === "Intermediate" ? "bg-ghibli-warm-amber" :
                                "bg-ghibli-forest-green"
                              }`}
                              style={{ width: `${skill.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        Edit Skills
                      </Button>
                      <Button variant="default" size="sm">
                        Practice Skills
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No skills found matching your search.</p>
                <Button onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-10 ghibli-card p-6">
            <h2 className="text-xl font-semibold text-ghibli-deep-navy mb-4">Recommended Skills to Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RecommendedSkill name="TypeScript" relevance="High" reason="Complements your JavaScript skills" />
              <RecommendedSkill name="GraphQL" relevance="Medium" reason="Growing demand in web development" />
              <RecommendedSkill name="Docker" relevance="Medium" reason="Essential for DevOps workflows" />
              <RecommendedSkill name="AWS" relevance="High" reason="Leading cloud platform for deployment" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const RecommendedSkill = ({ name, relevance, reason }: { name: string, relevance: string, reason: string }) => (
  <div className="border border-gray-200 bg-white bg-opacity-70 rounded-lg p-4">
    <h3 className="font-medium text-ghibli-deep-navy">{name}</h3>
    <div className="flex items-center mt-1">
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        relevance === "High" ? "bg-green-100 text-green-800" :
        relevance === "Medium" ? "bg-yellow-100 text-yellow-800" :
        "bg-blue-100 text-blue-800"
      }`}>
        {relevance} Relevance
      </span>
    </div>
    <p className="text-sm text-gray-600 mt-2">{reason}</p>
    <Button variant="outline" size="sm" className="mt-3 w-full">
      Start Learning
    </Button>
  </div>
);

export default Skills;
