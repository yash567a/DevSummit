
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Bot, User, Paperclip, Clock, ChevronsUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your Career Compass AI Assistant. How can I help you with your career journey today?",
      timestamp: new Date(Date.now() - 1000 * 60).toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Suggested questions that the user can ask
  const suggestedQuestions = [
    "What skills should I learn for web development?",
    "How can I prepare for a technical interview?",
    "What career paths are available in data science?",
    "How do I create an effective resume?"
  ];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsSending(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      // This would typically be an API call to get the AI response
      const aiResponse = generateAIResponse(inputMessage);
      
      const newAIMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setIsSending(false);
    }, 1500);
  };
  
  // This function would be replaced with an actual API call to an AI service
  const generateAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('skills') && lowercaseMessage.includes('web')) {
      return "For web development, I recommend focusing on these core skills: HTML, CSS, and JavaScript as your foundation. Then, learn a frontend framework like React, Angular, or Vue. For backend, consider Node.js, Python (Django/Flask), or Ruby on Rails. Don't forget about database knowledge (SQL/NoSQL) and version control with Git. Would you like a more detailed roadmap for any of these areas?";
    } else if (lowercaseMessage.includes('interview')) {
      return "To prepare for a technical interview: 1) Review core concepts in your field, 2) Practice coding problems on platforms like LeetCode or HackerRank, 3) Prepare for behavioral questions using the STAR method, 4) Research the company thoroughly, 5) Prepare thoughtful questions to ask the interviewer. Would you like me to elaborate on any of these points?";
    } else if (lowercaseMessage.includes('resume')) {
      return "For an effective resume: 1) Start with a powerful summary statement, 2) Focus on achievements, not just responsibilities, 3) Quantify your accomplishments with numbers, 4) Tailor your resume for each job application, 5) Keep it concise (1-2 pages), 6) Ensure perfect formatting and no grammatical errors. Would you like help with any specific section of your resume?";
    } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      return "Hello there! I'm your Career Compass AI Assistant. I can help you with career guidance, skill recommendations, job search advice, interview preparation, and more. What would you like assistance with today?";
    } else {
      return "Thank you for your question. I'd be happy to help with that. Could you provide a bit more information so I can give you the most helpful response?";
    }
  };
  
  // Format the timestamp to a readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    // Focus the input field
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-ghibli-clouds bg-cover bg-fixed">
      <Navbar isLoggedIn={true} activeSection="chat" />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="ghibli-card overflow-hidden flex flex-col h-[70vh]">
            <div className="p-4 bg-white bg-opacity-90 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-ghibli-deep-navy flex items-center">
                <Bot className="mr-2 h-5 w-5 text-ghibli-forest-green" />
                Career Compass AI Assistant
              </h1>
              <p className="text-sm text-gray-500">Ask me anything about your career journey</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-white bg-opacity-50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.type === 'user' ? 
                      'bg-ghibli-light-green text-gray-800 rounded-tr-none' : 
                      'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.type === 'assistant' ? (
                        <Bot className="h-4 w-4 mr-1 text-ghibli-forest-green" />
                      ) : (
                        <User className="h-4 w-4 mr-1 text-ghibli-deep-navy" />
                      )}
                      <span className="text-xs text-gray-500">
                        {message.type === 'assistant' ? 'AI Assistant' : 'You'} · {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              
              {isSending && (
                <div className="flex justify-start mb-4">
                  <div className="rounded-lg p-3 bg-white border border-gray-200 text-gray-800 rounded-tl-none max-w-[80%]">
                    <div className="flex items-center mb-1">
                      <Bot className="h-4 w-4 mr-1 text-ghibli-forest-green" />
                      <span className="text-xs text-gray-500">AI Assistant · Typing...</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {messages.length === 1 && (
              <div className="p-4 bg-ghibli-light-green bg-opacity-20">
                <h3 className="text-sm font-medium text-ghibli-deep-navy mb-2">
                  <ChevronsUp className="h-4 w-4 inline mr-1" />
                  Suggested Questions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="text-left px-3 py-2 bg-white bg-opacity-70 rounded-lg text-sm hover:bg-opacity-100 transition-colors"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-4 bg-white bg-opacity-90 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </button>
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Mic className="h-5 w-5 text-gray-500" />
                </button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === '' || isSending}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>AI response time: &lt;1 second</span>
                </div>
                {isSending && (
                  <div className="text-xs text-gray-500">
                    Processing your question...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default Chat;
