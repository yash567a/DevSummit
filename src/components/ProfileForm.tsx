
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProfileFormProps {
  onComplete: (data: any) => void;
  userType: 'student' | 'jobSeeker';
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onComplete, userType }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    location: '',
    phone: '',
    interests: [],
    
    // Student specific
    educationLevel: '',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
    
    // Job seeker specific
    currentRole: '',
    yearsOfExperience: '',
    skills: [],
    preferredIndustries: [],
    resume: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultipleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      interests: value.split(',').map(item => item.trim())
    }));
  };

  const handleMultipleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      skills: value.split(',').map(item => item.trim())
    }));
  };

  const handleMultipleIndustriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      preferredIndustries: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onComplete(formData);
    }, 1500);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStudentForm = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  className="ghibli-input"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  className="ghibli-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interests">Career Interests (comma separated)</Label>
                <Input
                  id="interests"
                  name="interests"
                  className="ghibli-input"
                  onChange={handleMultipleInterestsChange}
                  placeholder="e.g. Data Science, Web Development, Marketing"
                  required
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Education Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('educationLevel', value)}
                  value={formData.educationLevel}
                >
                  <SelectTrigger className="ghibli-input">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="associates">Associate's Degree</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD or Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  className="ghibli-input"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science, Business, etc."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  name="institution"
                  className="ghibli-input"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Your school or university"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('graduationYear', value)}
                  value={formData.graduationYear}
                >
                  <SelectTrigger className="ghibli-input">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderJobSeekerForm = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  className="ghibli-input"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  className="ghibli-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentRole">Current Role</Label>
                <Input
                  id="currentRole"
                  name="currentRole"
                  className="ghibli-input"
                  value={formData.currentRole}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer, Marketing Manager"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('yearsOfExperience', value)}
                  value={formData.yearsOfExperience}
                >
                  <SelectTrigger className="ghibli-input">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Career Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  className="ghibli-input"
                  onChange={handleMultipleSkillsChange}
                  placeholder="e.g. JavaScript, Project Management, Data Analysis"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredIndustries">Preferred Industries (comma separated)</Label>
                <Input
                  id="preferredIndustries"
                  name="preferredIndustries"
                  className="ghibli-input"
                  onChange={handleMultipleIndustriesChange}
                  placeholder="e.g. Tech, Healthcare, Finance"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interests">Career Interests (comma separated)</Label>
                <Input
                  id="interests"
                  name="interests"
                  className="ghibli-input"
                  onChange={handleMultipleInterestsChange}
                  placeholder="e.g. Leadership, Remote Work, Startups"
                  required
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const maxSteps = 2;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="ghibli-card px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-ghibli-deep-navy">Complete Your Profile</h2>
          <div className="text-sm text-gray-500">
            Step {step} of {maxSteps}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-ghibli-forest-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / maxSteps) * 100}%` }}
          ></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {userType === 'student' ? renderStudentForm() : renderJobSeekerForm()}
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="ghibli-button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            {step < maxSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-ghibli-forest-green hover:bg-ghibli-forest-green/90 text-white ghibli-button"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-ghibli-forest-green hover:bg-ghibli-forest-green/90 text-white ghibli-button"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Complete Profile'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfileForm;
