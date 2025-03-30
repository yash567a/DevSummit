import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, PenSquare, Book, BookOpen, BriefcaseBusiness, Database, Code, Palette } from 'lucide-react';
import { getGeminiResponse } from '@/lib/gemini';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'assistant',
    text: 'Hello! I\'m your AI Career Assistant. How can I help you today with your career journey?',
    timestamp: new Date(),
  },
];

const AICareerSuggestions = [
  "Tell me about data science careers",
  "What skills should I learn for web development?",
  "How can I prepare for a job interview?",
  "Help me create a study plan",
  "What are the highest paying tech jobs?",
];

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await getGeminiResponse(
        `You are a career guidance AI assistant. Provide helpful, concise, and accurate responses about careers, education, and professional development. 
        User's question: ${input.trim()}`
      );
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestionClick = async (suggestion: string) => {
    setInput(suggestion);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: suggestion,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      const response = await getGeminiResponse(
        `You are a career guidance AI assistant. Provide helpful, concise, and accurate responses about careers, education, and professional development. 
        User's question: ${suggestion}`
      );
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed bottom-0 right-0 z-40 mb-4 mr-4 sm:mb-6 sm:mr-6">
      <AnimatePresence>
        {isChatExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="ghibli-card shadow-xl w-full sm:w-96 max-h-[75vh] flex flex-col overflow-hidden"
          >
            <div className="p-3 bg-ghibli-deep-navy text-white flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-medium">AI Career Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsChatExpanded(false)}
                className="text-white hover:bg-ghibli-deep-navy/50 h-8 w-8 p-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
            
            <ScrollArea className="flex-grow p-4 bg-white">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-xl p-3 ${
                      message.sender === 'user' 
                        ? 'bg-ghibli-forest-green text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}>
                      <div className="flex items-start mb-1">
                        <div className={`rounded-full p-1 mr-2 ${
                          message.sender === 'user' 
                            ? 'bg-white/10'
                            : 'bg-ghibli-forest-green/10'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                        </div>
                        <span className="text-xs opacity-75">
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <div className="text-right">
                        <span className="text-xs opacity-50">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl p-3 bg-gray-100 text-gray-800 rounded-tl-none">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-ghibli-forest-green animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-ghibli-forest-green animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-ghibli-forest-green animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="mt-6">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {AICareerSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2 h-auto"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
            
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about your career..."
                  className="ghibli-input"
                />
                <Button 
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="ml-2 bg-ghibli-forest-green hover:bg-ghibli-forest-green/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isChatExpanded && (
        <Button
          onClick={() => setIsChatExpanded(true)}
          className="rounded-full w-16 h-16 shadow-lg bg-ghibli-forest-green hover:bg-ghibli-forest-green/90"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ChatAssistant;
