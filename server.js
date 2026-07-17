import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store data
const activeUsers = new Map();
const chatHistory = [];
const contactSubmissions = [];


// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    emailConfigured,
    timestamp: new Date().toISOString()
  });
});

// Get all submissions
app.get('/api/contacts', (req, res) => {
  res.json(contactSubmissions);
});

// Socket.io chat handling
io.on('connection', (socket) => {
  console.log('🟢 New user connected:', socket.id);
  
  socket.emit('chat history', chatHistory);
  
  socket.on('user join', (userName) => {
    activeUsers.set(socket.id, userName);
    const welcomeMessage = {
      id: Date.now().toString(),
      type: 'bot',
      message: `Welcome ${userName}! How can I help you today?`,
      timestamp: new Date()
    };
    socket.emit('bot message', welcomeMessage);
    chatHistory.push(welcomeMessage);
  });
  
  socket.on('user message', async (data) => {
    const messageId = Date.now().toString();
    const userMessage = {
      id: messageId,
      type: 'user',
      message: data.message,
      userId: socket.id,
      userName: activeUsers.get(socket.id),
      timestamp: new Date()
    };
    
    chatHistory.push(userMessage);
    io.emit('new message', userMessage);
    
    const botResponse = await generateBotResponse(data.message);
    const botMessageId = (Date.now() + 1).toString();
    const botMessage = {
      id: botMessageId,
      type: 'bot',
      message: botResponse,
      timestamp: new Date()
    };
    
    chatHistory.push(botMessage);
    socket.emit('bot message', botMessage);
  });
  
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
    activeUsers.delete(socket.id);
  });
});

async function generateBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
    return "Our pricing starts from $2,000 for basic websites and goes up based on features. Would you like a custom quote?";
  } else if (msg.includes('timeline') || msg.includes('how long') || msg.includes('when')) {
    return "Typical projects take 4-12 weeks depending on complexity. I can give you a more accurate timeline if you share your requirements!";
  } else {
    return "Thanks for your message! Our team will review it and get back to you shortly. In the meantime, do you have any specific questions about our services?";
  }
}

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📡 Chat server: ws://localhost:${PORT}`);
  console.log(`📝 Contact form: POST http://localhost:${PORT}/api/contact`);
  console.log(`📊 View submissions: GET http://localhost:${PORT}/api/contacts`);
  console.log(`🧪 Test email: POST http://localhost:${PORT}/api/test-email`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health\n`);
});