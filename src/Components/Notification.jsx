import React, { useState } from 'react';
import { FaHeart, FaComments } from 'react-icons/fa';
import CONFIG from '../Configuration';

function Notification(props) {

   const StoredData = localStorage.getItem("user");
   const user = JSON.parse(StoredData);

   const IP = CONFIG.IP || 'localhost';
   const PORT = CONFIG.PORT;

   const [showPopup, setShowPopup] = useState(false);
   const [showDelete, setDelete] = useState(false);
   const [isDismissing, setIsDismissing] = useState(false);

   const UserProposal = {
      proposal: props.email,
      proposed: user.email
   };

   const AcceptProposal = async () => {
      const response = await fetch(`http://${IP}:${PORT}/proposals/accept`, {
         method: 'POST',
         body: JSON.stringify(UserProposal),
         headers: {
            'Content-Type': 'application/json'
         }
      });

      if (response.ok) {
         console.log("Proposal Accepted");
      } else {
         console.log("Failed to Accept");
      }
   };

   const RejectProposal = async () => {
      const response = await fetch(`http://${IP}:${PORT}/proposals/reject`, {
         method: 'POST',
         body: JSON.stringify(UserProposal),
         headers: {
            'Content-Type': 'application/json'
         }
      });

      if (response.ok) {
         console.log("Proposal Rejected");
      } else {
         console.log("Failed to Reject");
      }
   };

   const AcceptRequest = async () => {
      try {
          const response = await fetch(`http://${IP}:${PORT}/rooms/deleteRequest`, {
              method: 'POST',
              body: JSON.stringify({ chat1: props.email, chat2: user.email }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });
  
          if (response.ok) {
              console.log("Request Accepted");
              setShowPopup(true);
          } else {
              console.error("Failed to Accept Request");
          }
      } catch (error) {
          console.error("Error in AcceptRequest:", error);
      }
  };
  

   const RejectRequest = async () => {
      const response = await fetch(`http://${IP}:${PORT}/rooms/deleteRequest`, {
         method: 'POST',
         body: JSON.stringify({ chat1: props.email, chat2: user.email }),
         headers: {
            'Content-Type': 'application/json'
         }
      });

      if (response.ok) {
         console.log("Request Rejected");
      } else {
         console.log("Failed to Reject Request");
      }
   };

   const handleAccept = async () => {
      if (props.type === 'proposal') {
          await AcceptProposal();
      } else if (props.type === 'request') {
          await AcceptRequest();
          setShowPopup(true);
          return;
      }
      handleDismiss();
  };

   const handleReject = () => {
      if (props.type === 'proposal') {
         RejectProposal();
      } else if (props.type === 'request') {
         RejectRequest();
      }
      handleDismiss();
   };
   
   const handleBlock = async() => {
      
      const block = {
         blocker: user.email,
         blocked: props.email
      }
      const response = await fetch(`http://${IP}:${PORT}/proposals/block`,{
         method: 'POST',
         body: JSON.stringify(block),
         headers: {'Content-Type':'application/json'}
      });

      if(response.ok){

         setDelete(true);
      }
   }

   const handleDismiss = () => {
      setIsDismissing(true);
      setTimeout(() => {
         props.onDismiss(props.id);
      }, 500);
   };

   return (
      <div
         className={`flex flex-col justify-center items-center w-[20vw] p-[1vh] rounded-[1.2vw] bg-[#ffffff] shadow-2xl mb-[3vh] transition-transform duration-500 ${
            isDismissing ? 'translate-x-[150%] opacity-0' : 'opacity-100'
         }`}
      >
         {props.type === 'proposal' ? (
            <p className="text-clr1 text-[1vw]">
               {props.username} has proposed to you. If you accept, you both can have a physical meeting. Check your email for further details.
            </p>
         ) : (
            <p className="text-clr1 text-[1vw]">
               {props.username} has sent a meeting request. You can accept or reject this request.
            </p>
         )}
         <div className="flex flex-row justify-center items-center gap-[1.6vw] mt-[1vh]">
            <button
               onClick={handleAccept}
               className="text-white bg-green-700 hover:bg-green-900 font-semibold text-[1vw] rounded-[0.8vw] py-[0.8vh] px-[1vw]"
            >
               Accept
            </button>
            <button
               onClick={handleReject}
               className="text-white bg-red-600 hover:bg-red-800 font-semibold text-[1vw] rounded-[0.8vw] py-[0.8vh] px-[1vw]"
            >
               Reject
            </button>

            {props.type === 'proposal' &&
               (<button
               onClick={handleBlock}
               className="text-white bg-red-600 hover:bg-red-800 font-semibold text-[1vw] rounded-[0.8vw] py-[0.8vh] px-[1vw]"
                >
               Block
               </button>)
            }
            
         </div>
         {showPopup && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
               <div className="relative bg-gradient-to-r from-pink-600 to-pink-300 p-6 rounded-lg shadow-lg text-center">
                  <p className="text-clr2 text-2xl font-bold mx-[2vw]">
                     Go to chat with {props.username}
                  </p>
                  <button
                     onClick={() => setShowPopup(false)}
                     className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transform transition-all duration-200 hover:scale-105"
                  >
                     Close
                  </button>
                  <FaHeart className="text-yellow-500 absolute bottom-4 left-4 transform -rotate-12 w-10 h-10" />
                  <FaComments className="text-yellow-500 absolute top-4 right-4 transform rotate-12 w-8 h-8" />
               </div>
            </div>
         )}

         {showDelete && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
               <div className="relative bg-gradient-to-r from-red-500 to-red-300 p-6 rounded-lg shadow-lg text-center">
                     <p className="text-white text-2xl font-bold mb-4">
                        Proposer Blocked
                     </p>
                     <button
                        onClick={() => setDelete(false)}
                        className="mt-4 bg-white text-red-500 font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
                     >
                        OK
                     </button>
               </div>
            </div>
         )}

      </div>
   );
}

export default Notification;
