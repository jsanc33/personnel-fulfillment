import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface.jsx';
import CandidateCard from '../components/CandidateCard.jsx';

// Save + / Next - candidate to iterate candidate index
// Save candidate to localStorage

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  const saveCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    console.log(`Saved candidate: ${candidate.login}`);
  };
  const fetchCandidates = async () => {
    const data = await searchGithub();
    if (Array.isArray(data) && data.length > 0) {
      const enrichedCandidates = await Promise.all(
        data.map(async (candidate: Candidate) => {
          const detailedCandidate = await searchGithubUser(candidate.login);
          return {
            ...candidate,
            ...detailedCandidate,
          };
        }
      ));
      setCandidates(enrichedCandidates);
    } else {
      console.error("No candidates found or invalid data format");
      setCandidates([]);
    }
  };
  useEffect(() => {
    fetchCandidates();
  }
  , []); // Empty dependency array means this effect runs once on mount
  if (candidates.length === 0) {
    return <h2>Loading candidates...</h2>;
  }
  // Render the list of CandidateCard components
  const candidateCards = candidates.map((candidate: Candidate) => (
    <CandidateCard
      key={candidate.login}
      login={candidate.login}
      avatar_url={candidate.avatar_url}
      html_url={candidate.html_url}
      name={candidate.name || candidate.login}
      company={candidate.company}
      location={candidate.location}
      email={candidate.email}
      bio={candidate.bio}
    />
  ));
  return( 
  <>
    <h1>Candidate Search</h1>
    {candidateCards.length > 0 ? (
      <div className="candidate-list">
        {candidateCards[currentCandidateIndex] || <h2>Loading candidate...</h2>}
        <div>
          <button onClick={() => {
            saveCandidate(candidates[currentCandidateIndex]); // Save the current candidate
            if (currentCandidateIndex < candidates.length - 1) {
              setCurrentCandidateIndex(currentCandidateIndex + 1); // Iterate index to move on to the next candidate
            } else {
              console.log("No more candidates to show");
            }
          }} disabled={currentCandidateIndex >= candidates.length - 1}>
            + Save Candidate
          </button>
          <button onClick={() => {
            if (currentCandidateIndex < candidates.length - 1) {
              setCurrentCandidateIndex(currentCandidateIndex + 1); // Move to the next candidate
            } else {
              console.log("No more candidates to show");
            }
          }} disabled={currentCandidateIndex >= candidates.length - 1 || candidates.length === 0}>
            {/* Disable the button if there are no more candidates */}
            {/* If we are at the last candidate, disable the button */}
            {/* Otherwise, enable it */}
            {/* This ensures that the user cannot go beyond the last candidate */}
            - Next Candidate
          </button>
        </div>
      </div>
    ) : (
      <h2>No candidates found</h2>
    )}
  </>
  );
};

export default CandidateSearch;
