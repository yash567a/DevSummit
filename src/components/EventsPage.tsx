import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  {
    title: 'Networking Mixer',
    date: 'Oct 25, 2023',
    time: '5:00 PM - 7:00 PM',
    location: 'Downtown Conference Center',
  },
  {
    title: 'Industry Panel Discussion',
    date: 'Oct 28, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Virtual',
  },
  {
    title: 'LinkedIn Profile Workshop',
    date: 'Nov 1, 2023',
    time: '11:00 AM - 1:00 PM',
    location: 'Career Center',
  },
  {
    title: 'Mock Interview Day',
    date: 'Nov 5, 2023',
    time: '9:00 AM - 4:00 PM',
    location: 'Career Center',
  },
  {
    title: 'Tech Skills Workshop',
    date: 'Nov 8, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual',
  },
  {
    title: 'Company Information Session',
    date: 'Nov 12, 2023',
    time: '1:00 PM - 2:30 PM',
    location: 'Virtual',
  },
  {
    title: 'Career Development Workshop',
    date: 'Nov 15, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Career Center',
  },
  {
    title: 'Industry Networking Event',
    date: 'Nov 19, 2023',
    time: '6:00 PM - 8:00 PM',
    location: 'Downtown Conference Center',
  },
  {
    title: 'Resume Review Day',
    date: 'Nov 22, 2023',
    time: '10:00 AM - 3:00 PM',
    location: 'Career Center',
  },
  {
    title: 'Tech Industry Meetup',
    date: 'Nov 26, 2023',
    time: '4:00 PM - 6:00 PM',
    location: 'Virtual',
  },
  {
    title: 'Career Planning Workshop',
    date: 'Nov 29, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Career Center',
  },
  {
    title: 'Final Year Project Showcase',
    date: 'Dec 3, 2023',
    time: '1:00 PM - 5:00 PM',
    location: 'University Hall',
  },
];

const EventsPage: React.FC = () => {
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold text-ghibli-deep-navy">All Career Events</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Career Events</CardTitle>
            <CardDescription>Browse through all career development events and workshops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map((event, index) => (
                <div key={index} className={`flex items-start p-4 rounded-lg ${index % 2 === 0 ? 'bg-ghibli-soft-cream/50' : 'bg-white'}`}>
                  <div className="bg-ghibli-light-green/20 p-2 rounded-full mr-3">
                    <Calendar className="h-5 w-5 text-ghibli-forest-green" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="ml-4 ghibli-button"
                  >
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EventsPage; 