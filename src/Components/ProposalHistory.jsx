import { useState, useEffect } from "react";
import CONFIG from '../Configuration';

function ProposalHistory() {
  const [history, setHistory] = useState([]);

  const StoredData = localStorage.getItem("user");
  const user = JSON.parse(StoredData);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const email = user.email;

  const FetchProposalHistory = async () => {
    const response = await fetch(
      `http://${IP}:${PORT}/proposals/getProposals`
    );
    const result = await response.json();

    const filteredProposals = result.filter((prps) => email === prps.proposal);
    console.log(filteredProposals);
    setHistory(filteredProposals);
  };

  useEffect(() => {
    FetchProposalHistory();
  }, []);

  return (
    <div className="flex p-[6vh] h-[80vh]">
      <table className="text-left bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg text-white">
        <thead>
          <tr className="border-b border-white">
            <th className="px-[2vw] py-[1vh]">Proposed To</th>
            <th className="px-[2vw] py-[1vh]">Date</th>
            <th className="px-[2vw] py-[1vh]">State</th>
          </tr>
        </thead>
        <tbody>
          {history.map((proposal, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-[2vw] py-[1vh]">{proposal.proposedProfile.username}</td>
              <td className="px-[2vw] py-[1vh]">{new Date(proposal.date).toLocaleDateString()}</td>
              <td className="px-[2vw] py-[1vh]">{proposal.state=='A'?'Accepted':'Rejected'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProposalHistory;
