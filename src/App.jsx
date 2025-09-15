
// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';
import ChatBot from './components/ChatBot';
import { Fab, Modal, Box } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

function App() {
  const [openChat, setOpenChat] = useState(false);

  const handleOpenChat = () => setOpenChat(true);
  const handleCloseChat = () => setOpenChat(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Sponsors />
              <Footer />

              {/* Floating Chatbot Button */}
              <Fab
                color="primary"
                onClick={handleOpenChat}
                sx={{
                  position: 'fixed',
                  bottom: 30,
                  right: 30,
                  zIndex: 999,
                }}
              >
                <SmartToyIcon />
              </Fab>

              {/* Chatbot Modal */}
              <Modal
                open={openChat}
                onClose={handleCloseChat}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    width: 400,
                    maxWidth: '90vw',
                    maxHeight: '80vh',
                  }}
                >
                  <ChatBot />
                </Box>
              </Modal>
            </>
          }
        />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/chat-bot" element={<ChatBot />} />
      </Routes>
    </Router>
  );
}

export default App;