import React, { useState, useEffect } from "react";
import { FaHeart, FaSmile, FaKissWinkHeart } from "react-icons/fa";
import CONFIG from "../Configuration";

function GuruForm() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questionMode, setQuestionMode] = useState("custom");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [animatedText, setAnimatedText] = useState("");

  const IP = CONFIG.IP || "localhost";
  const PORT = CONFIG.PORT;
  const StoredData = localStorage.getItem("user");
  const user = JSON.parse(StoredData);

  const topics = [
    "Breakups", "Commitments", "Communication", "Compatibility",
    "Conflict Resolution", "Dating", "Family Approval", "Financial Harmony",
    "Forgiveness", "Intimacy", "Life", "Long-Distance Relationship", "Love",
    "Loyalty", "Marriage", "Personal Growth in Relationship", "Pickup Lines",
    "Relationship", "Respect", "Romance", "Trust",
  ];

  const fetchQuestions = async () => {
    if (selectedTopic) {
      try {
        const response = await fetch(
          `http://${IP}:${PORT}/loveGuru/getQuestions?topic=${selectedTopic}`
        );
        const questions = await response.json();
        setFetchedQuestions(questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setFetchedQuestions([]);
      }
    }
  };

  useEffect(() => {
    if (questionMode === "predefined") {
      fetchQuestions();
    }
  }, [selectedTopic, questionMode]);

  useEffect(() => {
    if (showPopup && popupContent) {
      setAnimatedText("");
      let index = 0;
      const interval = setInterval(() => {
        setAnimatedText((prev) => prev + popupContent[index]);
        index++;
        if (index === popupContent.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showPopup, popupContent]);

  const handleAskGuru = async () => {
    if (questionMode === "custom") {
      
      const prompt = `topic: ${selectedTopic}, question: ${customQuestion}, give a short one-line answer in the form of a quote, just like a Love Guru`;

      const response = await fetch(`http://${IP}:${PORT}/loveGuru/customQuestion?prompt=${prompt}`);
      const result = await response.json();
      const answer = result.answer;
      console.log("Answer:" +answer);
      setPopupContent(answer);
      setShowPopup(true);
      
      const newQuestion = {
         topic: selectedTopic,
         question: customQuestion,
         answer: answer
      }

      const saveResponse = await fetch(`http://${IP}:${PORT}/loveGuru/customAnswer`,{
        method: 'POST',
        body: JSON.stringify(newQuestion),
        headers: {'Content-Type':'application/json'}
      });

      if(saveResponse.ok){
          console.log("Questions Updated");
      }else{
        console.log("Quesions Not Saved");
      }
      
    } else if (questionMode === "predefined") {
      const Qs = {
        topic: selectedTopic,
        question: selectedQuestion,
      };
      const response = await fetch(`http://${IP}:${PORT}/loveGuru/giveAnswer`, {
        method: "POST",
        body: JSON.stringify(Qs),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        const answer = result[0].answer;
        setPopupContent(answer);
        setShowPopup(true);
      }
    }
  };

  const HighRate = async() => {
    
    const Rate = {
      email: user.email,
      topic: selectedTopic,
      question: customQuestion,
      
    }
    setShowPopup(false);
    const response = await fetch(`http://${IP}:${PORT}/loveGuru/highRate`,{
      method: 'POST',
      body: JSON.stringify(Rate),
      headers: {'Content-Type':'application/json'}
    });

    if(response.ok){
      console.log("Feedback Submitted");
      
    }
  };

  const LowRate = async() => {
    
    const Rate = {
      email: user.email,
      topic: selectedTopic,
      question: customQuestion
    }
    setShowPopup(false);
    const response = await fetch(`http://${IP}:${PORT}/loveGuru/lowRate`,{
      method: 'POST',
      body: JSON.stringify(Rate),
      headers: {'Content-Type':'application/json'}
    });

    if(response.ok){
      console.log("Feedback Submitted");
      
    }
  };

  return (
    <div className="relative">
      <div className="w-[30vw] h-auto max-w-lg mt-[3vw] mb-[2vw] ml-[2vw] p-6 rounded-3xl bg-white bg-opacity-10 backdrop-blur-md shadow-lg border border-lightGray">
        <h1 className="text-3xl font-bold text-center text-clr1 mb-6 drop-shadow-lg">
          Ask Guru
        </h1>

        <div className="mb-6">
          <label
            htmlFor="topic"
            className="block text-[lightGray] text-[1vw] font-semibold mb-2"
          >
            Select Topic:
          </label>
          <select
            id="topic"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-60 border border-[lightGray] rounded-lg shadow-md text-[Gray] focus:outline-none focus:ring-4 focus:ring-clr2"
          >
            <option value="" disabled>
              -- Choose a Topic --
            </option>
            {topics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {selectedTopic && (
          <>
            <div className="mb-6">
              <label
                htmlFor="questionMode"
                className="block text-clr1 text-lg font-semibold mb-2"
              >
                How would you like to ask?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="questionMode"
                    value="custom"
                    checked={questionMode === "custom"}
                    onChange={(e) => setQuestionMode(e.target.value)}
                    className="form-radio text-clr1 focus:ring-clr2"
                  />
                  <span className="text-[lightGray]">Write your own</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="questionMode"
                    value="predefined"
                    checked={questionMode === "predefined"}
                    onChange={(e) => setQuestionMode(e.target.value)}
                    className="form-radio text-clr1 focus:ring-clr2"
                  />
                  <span className="text-[lightGray]">Common Questions</span>
                </label>
              </div>
            </div>

            {questionMode === "predefined" && (
              <div className="mb-6">
                <label
                  htmlFor="predefinedQuestion"
                  className="block text-clr1 text-lg font-semibold mb-2"
                >
                  Choose a Question:
                </label>
                <select
                  id="predefinedQuestion"
                  value={selectedQuestion}
                  onChange={(e) => setSelectedQuestion(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-lightGray rounded-lg shadow-md text-[Gray] focus:outline-none focus:ring-4 focus:ring-clr2"
                >
                  <option value="" disabled>
                    -- Choose a Question --
                  </option>
                  {fetchedQuestions.length > 0 ? (
                    fetchedQuestions.map((item, index) => (
                      <option key={index} value={item.question}>
                        {item.question}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No questions available for this topic
                    </option>
                  )}
                </select>
              </div>
            )}  
          </>
        )}

        {questionMode == 'custom' && 
        
        <div className="mb-6">
        <label
          htmlFor="customQuestion"
          className="block text-clr1 text-lg font-semibold mb-2"
        >
          Enter Your Custom Question:
        </label>
        <input
          type="text"
          id="customQuestion"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-lightGray rounded-lg shadow-md text-[Gray] focus:outline-none focus:ring-4 focus:ring-clr2"
          placeholder="Type your question here..."
        />
      </div>
        }

        {selectedTopic && (
          <div className="text-center">
            <button
              onClick={handleAskGuru}
              className="px-6 py-3 mt-[2vw] bg-gradient-to-r from-clr1 to-clr2 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-[0_4px_15px_rgba(106,90,205,0.5)] transition transform hover:scale-105"
            >
              Ask AI LoveGuru
            </button>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
          <div className="absolute inset-0">
            <FaHeart className="absolute text-red-500 opacity-70 text-[7rem] rotate-45 top-[10%] left-[10%]" />
            <FaKissWinkHeart className="absolute text-pink-400 opacity-70 text-[3rem] -rotate-12 bottom-[15%] left-[35%]" />
            <FaSmile className="absolute text-yellow-300 opacity-80 text-[5rem] rotate-[30deg] top-[10%] right-[40%]" />
            <FaHeart className="absolute text-red-500 opacity-60 text-[6rem] -rotate-45 bottom-[10%] right-[20%]" />
          </div>
          

          <div className="relative w-[90%] md:w-[50%] p-8 rounded-xl shadow-xl bg-gradient-to-r from-clr1 to-clr2 text-white text-center transform transition-all scale-105">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <FaHeart className="mr-2 text-[1.5em]" /> Guru Says:
            </h2>
            <p className="mt-4 text-lg leading-7 font-medium drop-shadow-sm">
              {animatedText}
            </p>
            <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={HighRate}
              className="px-6 py-2 bg-[rgba(255,255,255,0.3)] border border-white rounded-full text-white font-semibold text-lg hover:scale-110 hover:bg-[rgba(255,255,255,0.5)] transition-transform duration-300"
            >
              <FaKissWinkHeart className="inline-block mr-2" /> I Love it
            </button>
            <button
              onClick={LowRate}
              className="px-6 py-2 bg-white text-clr1 font-semibold text-lg rounded-full hover:scale-110 hover:bg-[rgba(255,255,255,0.8)] transition-transform duration-300"
            >
              <FaSmile className="inline-block mr-2" /> OK, But I am Not Satisfied
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuruForm;
