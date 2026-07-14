import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store active users
const activeUsers = new Map();

// Store chat history
const chatHistory = [];

// Store contact form submissions
const contactSubmissions = [];

// Configure email transporter
// For Gmail:
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'koredejoseph3@gmail.com',  // Replace with your Gmail address
    pass: 'mngqunyifznolxjn'       // Replace with your Gmail app password
  }
});

// Contact form endpoint with email
app.post('/api/contact', async (req, res) => {
  const { name, email, projectType, message } = req.body;
  
  console.log('📝 Received contact form submission:', { name, email, projectType, message });
  
  // Validation
  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  
  // Save submission
  const submission = {
    id: Date.now(),
    name,
    email,
    projectType,
    message,
    timestamp: new Date()
  };
  
  contactSubmissions.push(submission);
  console.log('✅ Contact form saved:', submission);
  
  // Send email notification
  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'koredejoseph3@gmail.com', // Your email address where you want to receive messages
      subject: `New Contact: ${projectType} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #00c2ff; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f5f5f5; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #333; }
            .value { margin-top: 5px; color: #666; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Project Type:</div>
                <div class="value">${projectType}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>Sent from Web Minds website contact form</p>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: email
    };
    
    await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully to koredejoseph3@gmail.com');
    
    res.status(200).json({ 
      success: true, 
      message: 'Message received successfully! We\'ll get back to you within 24 hours.'
    });
  } catch (emailError) {
    console.error('❌ Email sending failed:', emailError);
    // Still return success even if email fails, but log the error
    res.status(200).json({ 
      success: true, 
      message: 'Message received successfully! We\'ll get back to you within 24 hours.'
    });
  }
});

// Get all submissions (for testing)
app.get('/api/contacts', (req, res) => {
  res.json(contactSubmissions);
});

// Socket.io chat handling
io.on('connection', (socket) => {
  console.log('🟢 New user connected:', socket.id);
  
  // Send chat history to new user
  socket.emit('chat history', chatHistory);
  
  // User joins with their name
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
  
  // Handle user messages
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
    
    // Generate bot response
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
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
    activeUsers.delete(socket.id);
  });
});

// Bot response generator
async function generateBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
    return "Our pricing starts from $2,000 for basic websites and goes up based on features. Would you like a custom quote?";
  } else if (msg.includes('timeline') || msg.includes('how long') || msg.includes('when')) {
    return "Typical projects take 4-12 weeks depending on complexity. I can give you a more accurate timeline if you share your requirements!";
  } else if (msg.includes('portfolio') || msg.includes('examples')) {
    return "You can check our portfolio at webminds.com/portfolio. We've worked with 50+ clients across various industries!";
  } else if (msg.includes('contact') || msg.includes('call') || msg.includes('phone')) {
    return "You can reach us at +234-8124461183 or email hello@webminds.com. Our office hours are Monday-Friday, 9am-5pm.";
  } else if (msg.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with?";
  } else if (msg.includes('bye') || msg.includes('goodbye')) {
    return "Thank you for chatting! Feel free to come back if you have more questions. Have a great day!";
  } else {
    return "Thanks for your message! Our team will review it and get back to you shortly. In the meantime, do you have any specific questions about our services?";
  }
}

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n🚀 Server is running!`);
  console.log(`📡 Chat server: http://localhost:${PORT}`);
  console.log(`📝 Contact form API: http://localhost:${PORT}/api/contact`);
  console.log(`📊 View submissions: http://localhost:${PORT}/api/contacts\n`);
});