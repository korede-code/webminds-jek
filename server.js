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

// Store active users
const activeUsers = new Map();
const chatHistory = [];
const contactSubmissions = [];

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER || 'koredejoseph3@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS;

console.log('📧 Email Configuration:');
console.log(`   User: ${EMAIL_USER}`);
console.log(`   Password: ${EMAIL_PASS ? '✅ Set' : '❌ NOT SET'}`);

// Create email transporter with better error handling
let transporter;
let emailConfigured = false;

if (EMAIL_USER && EMAIL_PASS) {
  try {
    // Remove any spaces from password
    const cleanPass = EMAIL_PASS.replace(/\s/g, '');
    
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: cleanPass
      },
      // Add these options for better reliability
      tls: {
        rejectUnauthorized: false
      },
      debug: true // Enable debug logging
    });
    
    console.log('📧 Transporter created, verifying...');
    
    // Verify the connection
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email verification failed:', error.message);
        console.error('   Error details:', error);
        emailConfigured = false;
      } else {
        console.log('✅ Email server ready!');
        emailConfigured = true;
      }
    });
  } catch (error) {
    console.error('❌ Email setup error:', error.message);
    emailConfigured = false;
  }
} else {
  console.log('⚠️ Email credentials not set. Emails will be logged to console only.');
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, projectType, message } = req.body;
  
  console.log('\n📝 Received contact form submission:', { name, email, projectType, message });
  
  // Validation
  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  
  // Save submission locally
  const submission = {
    id: Date.now(),
    name,
    email,
    projectType,
    message,
    timestamp: new Date()
  };
  
  contactSubmissions.push(submission);
  console.log('✅ Contact form saved locally');
  
  // Send email notification
  let emailSent = false;
  let emailError = null;
  
  if (transporter && emailConfigured) {
    try {
      console.log('📧 Attempting to send email...');
      console.log(`   From: ${EMAIL_USER}`);
      console.log(`   To: koredejoseph3@gmail.com`);
      
      const mailOptions = {
        from: `"Web Minds Contact" <${EMAIL_USER}>`,
        to: 'koredejoseph3@gmail.com',
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
      
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
      console.log(`   Message ID: ${info.messageId}`);
      emailSent = true;
      
    } catch (error) {
      console.error('❌ Email sending failed:');
      console.error('   Error:', error.message);
      console.error('   Code:', error.code || 'N/A');
      console.error('   Command:', error.command || 'N/A');
      emailError = error.message;
    }
  } else {
    console.log('⚠️ Email not configured. Message saved locally.');
    console.log('📝 To send email, set EMAIL_USER and EMAIL_PASS environment variables.');
  }
  
  // Return success
  res.status(200).json({ 
    success: true, 
    message: 'Message received successfully! We\'ll get back to you within 24 hours.',
    emailSent: emailSent,
    emailError: emailError || undefined
  });
});

// Get all submissions
app.get('/api/contacts', (req, res) => {
  res.json(contactSubmissions);
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  if (!transporter || !emailConfigured) {
    return res.status(400).json({ 
      error: 'Email not configured. Set EMAIL_USER and EMAIL_PASS environment variables.',
      configured: false
    });
  }
  
  try {
    const testMailOptions = {
      from: `"Test" <${EMAIL_USER}>`,
      to: 'koredejoseph3@gmail.com',
      subject: 'Test Email from Web Minds Server',
      text: 'If you receive this, your email configuration is working!\n\nTime: ' + new Date().toLocaleString()
    };
    
    const info = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully!');
    res.json({ 
      success: true, 
      messageId: info.messageId,
      configured: true
    });
  } catch (error) {
    console.error('❌ Test email failed:', error.message);
    res.status(500).json({ 
      error: error.message,
      configured: false
    });
  }
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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📡 Chat server: ws://localhost:${PORT}`);
  console.log(`📝 Contact form: POST http://localhost:${PORT}/api/contact`);
  console.log(`📊 View submissions: GET http://localhost:${PORT}/api/contacts`);
  console.log(`🧪 Test email: POST http://localhost:${PORT}/api/test-email\n`);
});