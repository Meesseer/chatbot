import React, { useState, useRef } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, Button, TextField, IconButton, Modal, Rating } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import bigicon from "../../Assets/bigicon.png"; 
import data from "../../aidata/sampleData.json"; 
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';

const Home = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [showCards, setShowCards] = useState(true);
  const [savedChats, setSavedChats] = useState([]);
  const [openRating, setOpenRating] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showPastConversations, setShowPastConversations] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);
  const chatEndRef = useRef(null);

  const handleCardClick = (input) => {
    setShowCards(false);
    setChatStarted(true);
    addMessageToChat(input, true);
    handleResponse(input);
  };

  const handleResponse = (input) => {
    const foundResponse = data.find(item => input.toLowerCase() === item.question.toLowerCase());
    const responseText = foundResponse ? foundResponse.response : "Sorry, the answer doesn't exist!";
    addMessageToChat(responseText, false);
  };

  const addMessageToChat = (message, isUser) => {
    setChatMessages(prevMessages => [
      ...prevMessages,
      { text: message, isUser },
    ]);
    scrollToBottom();
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleInputSubmit = () => {
    if (!userInput.trim()) return;
    setShowCards(false);
    setChatStarted(true); // Set chat started to true
    addMessageToChat(userInput, true);
    handleResponse(userInput);
    setUserInput('');
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSaveChat = () => {
    setSavedChats(prevChats => [...prevChats, { messages: chatMessages, rating: starRating }]);
    addMessageToChat("Chat saved successfully!", false);
    setStarRating(0); // Reset star rating after saving
  };

  const handleThumbsUpClick = () => {
    setOpenRating(true);
  };

  const handleRatingSubmit = () => {
    addMessageToChat(`Rating: ${starRating} star${starRating > 1 ? 's' : ''}`, false);
    setOpenRating(false);
  };

  const handleThumbsDownClick = () => {
    setOpenFeedbackModal(true);
  };

  const handleFeedbackSubmit = () => {
    addMessageToChat(`Feedback: ${feedbackText}`, false);
    setFeedbackText('');
    setOpenFeedbackModal(false);
  };

  const handleShowPastConversations = () => {
    setShowPastConversations(true); 
  };
  const resetChat = () => {
    setUserInput('');
    setChatMessages([]);
    setShowCards(true);
    setChatStarted(false);
    setShowPastConversations(false)
  };

  const filteredChats = savedChats.filter(chat => chat.rating >= filterRating);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ color: "#D7C7F4", fontSize: 40, fontWeight: 800, textAlign: 'left' }}>
        Bot Ai
      </Box>

      <Box sx={{
        height: "40vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {!chatStarted && (
          <>
            <Typography sx={{ fontSize: 40, fontWeight: 800, mb: 2 }}>
              How Can I Help You Today?
            </Typography>
            <Box component="img" src={bigicon} alt="Big Icon" sx={{ width: '8em', height: '8em' }} />
          </>
        )}
      </Box>

      {showCards && !chatStarted && (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
          <Grid container spacing={2} sx={{ width: '100%', maxWidth: '600px' }}>
            {/* Example Cards */}
            <Grid item xs={6}>
              <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', textAlign: 'center', borderRadius: 1 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => handleCardClick("Hi, what is the weather")}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Hi, what is the weather
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Get immediate AI generated response
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', textAlign: 'center', borderRadius: 1 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => handleCardClick("Hi, what is my location")}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Hi, what is my location
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Get immediate AI generated response
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', textAlign: 'center', borderRadius: 1 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => handleCardClick("Hi, what is the temperature")}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Hi, what is the temperature
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Get immediate AI generated response
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', textAlign: 'center', borderRadius: 1 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => handleCardClick("Hi, how are you doing today?")}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Hi, how are you doing today?
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Get immediate AI generated response
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {showPastConversations ? (
        <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 2 }}>
          <Typography variant="h6">Filter by Star Rating:</Typography>
          <Rating
            name="filter-rating"
            value={filterRating}
            onChange={(event, newValue) => setFilterRating(newValue)}
          />
          {filteredChats.map((chat, index) => (
            <Box key={index} sx={{ mb: 1, padding: 1, border: '1px solid #ccc', borderRadius: 1 }}>
              {chat.messages.map((message, msgIndex) => (
                <Box
                  key={msgIndex}
                  sx={{
                    display: 'flex',
                    justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: message.isUser ? '#D7C7F4' : '#f0f0f0',
                      borderRadius: 1,
                      padding: 1,
                      maxWidth: '70%',
                      wordWrap: 'break-word',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: message.isUser ? '#000' : '#000' }}>
                      {message.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Typography variant="caption">Rating: {chat.rating} star{chat.rating > 1 ? 's' : ''}</Typography>
            </Box>
          ))}
          <Button onClick={() => setShowPastConversations(false)}>Close</Button>
        </Box>
      ) : (
        <>
          {chatMessages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: message.isUser ? '#D7C7F4' : '#f0f0f0',
                  borderRadius: 1,
                  padding: 1,
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="body2" sx={{ color: message.isUser ? '#000' : '#000' }}>
                  {message.text}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={chatEndRef} />
        </>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          fullWidth
          disabled={showPastConversations} 
        />
        <Button onClick={handleInputSubmit} disabled={showPastConversations}>Send</Button>
        <IconButton onClick={handleThumbsUpClick}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton onClick={handleThumbsDownClick}>
          <ThumbDownIcon />
        </IconButton>
        <Button onClick={handleSaveChat} disabled={showPastConversations}>Save Chat</Button>
      </Box>

      {/* Rating Modal */}
      <Modal open={openRating} onClose={() => setOpenRating(false)}>
        <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6">Rate this conversation:</Typography>
          <Rating
            name="star-rating"
            value={starRating}
            onChange={(event, newValue) => setStarRating(newValue)}
          />
          <Button onClick={handleRatingSubmit}>Submit</Button>
        </Box>
      </Modal>

      {/* Feedback Modal */}
      <Modal open={openFeedbackModal} onClose={() => setOpenFeedbackModal(false)}>
        <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6">Leave Feedback:</Typography>
          <TextField
            value={feedbackText}
            onChange={(event) => setFeedbackText(event.target.value)}
            placeholder="Your feedback..."
            fullWidth
            multiline
            rows={4}
          />
          <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
        </Box>
      </Modal>
      <ResponsiveDrawer onShowPastConversations={() => setShowPastConversations(true)} onNewChat={resetChat}/>
    </Box>
  );
}

export default Home;
