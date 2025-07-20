// This is a new file
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";

type Message = {
    sender: 'user' | 'bot';
    text: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Hello! I am your SecureBank AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Thank you for your message. I am currently a demo and cannot process requests, but I am learning! How else can I assist?'}]);
        }, 1000);
    }

    return (
        <Card className="flex flex-col h-[calc(100vh-10rem)] max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Chat with our AI for help with your account.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            {msg.sender === 'bot' && (
                                <Avatar>
                                    <AvatarImage src="/img/ai-avatar.png" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-xs ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p>{msg.text}</p>
                            </div>
                             {msg.sender === 'user' && (
                                <Avatar>
                                    <AvatarImage src="/img/user-avatar.png" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
            <div className="p-4 border-t">
                <div className="relative">
                    <Input 
                        placeholder="Type your message..." 
                        className="pr-24"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleSend}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
