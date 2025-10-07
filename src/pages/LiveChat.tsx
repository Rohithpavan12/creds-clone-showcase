import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Send, User, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LiveChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your UniCreds loan assistant. How can I help you today?", sender: "bot", time: "10:30 AM" },
    { id: 2, text: "I have questions about education loans.", sender: "user", time: "10:31 AM" },
    { id: 3, text: "I'd be happy to help! What would you like to know about our education loans?", sender: "bot", time: "10:31 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: "Thanks for your message! Our loan experts will get back to you within 24 hours. You can also check our FAQ section for immediate answers.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UC</span>
            </div>
            <span className="text-xl font-bold text-text-primary">UniCreds</span>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-t-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Live Chat Support</h1>
                  <p className="text-text-secondary">Get instant help from our loan experts</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-success text-white">
                Online
              </Badge>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-white border-x border-border h-96 overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-primary' : 'bg-gray-200'}`}>
                      {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-text-primary'}`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-text-secondary'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white rounded-b-lg p-6 border border-t-0 border-border">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Our team typically responds within 5 minutes during business hours.
            </p>
          </div>

          {/* Alternative Contact Options */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">📞</span>
                </div>
                <h3 className="text-lg font-semibold">Phone Support</h3>
                <p className="text-text-secondary">Call us at 1800-XXX-XXXX</p>
                <p className="text-sm text-text-secondary">Mon-Fri: 9AM-6PM</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">📧</span>
                </div>
                <h3 className="text-lg font-semibold">Email Support</h3>
                <p className="text-text-secondary">Email: support@unicreds.com</p>
                <p className="text-sm text-text-secondary">24/7 Response</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
