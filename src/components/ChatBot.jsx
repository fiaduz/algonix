
// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './ChatBot.css';

const ChatBot = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your Gemini API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your **physiotherapy assistant**. Ask me anything about **exercises**, **rehab**, **posture**, or **physiotherapy care**.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const listRef = useRef(null);

  // Scroll to bottom when messages, typingMessage, or isThinking change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typingMessage, isThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a professional physiotherapy assistant. ONLY answer questions related to physiotherapy (exercises, rehab, posture, patient education). User asked: "${input}"`,
            },
          ],
        },
      ],
    };

    try {
      const res = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      const generatedText =
        res.data.candidates?.[0]?.content?.[0]?.text ||
        res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry — I can only answer **physiotherapy-related** questions.";

      setIsThinking(false);

      // Simulate typing animation
      setTypingMessage({ sender: 'bot', text: '' });
      let typedText = '';
      for (let i = 0; i < generatedText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 20));
        typedText += generatedText[i];
        setTypingMessage({ sender: 'bot', text: typedText });
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: generatedText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setTypingMessage(null);
    } catch (error) {
      console.error('Error:', error);
      setIsThinking(false);
      const botReply = {
        sender: 'bot',
        text: 'Error generating response. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <Paper
      elevation={3}
      className="w-full max-w-md h-[500px] flex flex-col bg-gradient-to-b from-blue-100 to-white rounded-xl shadow-lg"
      sx={{ maxHeight: '80vh' }}
    >
      <Typography
        variant="h6"
        className="text-primary font-bold mb-2 text-center p-2 border-b border-gray-200"
      >
        Physio ChatBot
      </Typography>

      {/* Scrollable Messages */}
      <Box
        className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100 rounded-lg"
        ref={listRef}
        sx={{ maxHeight: 'calc(100% - 100px)' }} // Reserve space for header and input
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Box className="flex flex-col max-w-[80%]">
              <Box
                className={`inline-block p-3 rounded-[3px] break-words ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-yellow-100 text-gray-800'
                }`}
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
              />
              <Typography variant="caption" className={`text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp}
              </Typography>
            </Box>
          </Box>
        ))}
        {isThinking && (
          <Box className="flex justify-start">
            <Box className="inline-block p-3 rounded-[3px] max-w-[80%] bg-yellow-100 text-gray-800 animate-pulse break-words">
              Thinking<span className="thinking-dots"></span>
            </Box>
          </Box>
        )}
        {typingMessage && (
          <Box className="flex justify-start">
            <Box className="inline-block p-3 rounded-[3px] max-w-[80%] bg-yellow-100 text-gray-800 animate-pulse break-words">
              {typingMessage.text}
              <span className="inline-block w-2 h-4 bg-gray-500 animate-blink"></span>
            </Box>
          </Box>
        )}
      </Box>

      {/* Sticky Input */}
      <Box className="flex items-center gap-2 p-2 border-t border-gray-200">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Ask a physiotherapy question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-lg"
          InputProps={{
            className:
              'bg-white border border-gray-300 rounded-lg focus:ring-primary focus:border-primary',
          }}
        />
        <IconButton
          onClick={handleSend}
          className="bg-primary text-white rounded-full p-2 hover:bg-secondary"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatBot;