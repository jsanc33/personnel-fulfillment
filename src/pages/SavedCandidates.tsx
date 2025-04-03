import SavedCandidateCard from "../components/SavedCandidateCard";

const SavedCandidates = () => {
  // Display saved candidates from localStorage
  const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  if (savedCandidates.length === 0) {
    return <h2>No saved candidates found.</h2>;
  }
  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="candidate-list">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Company</th>
            <th>Location</th>
            <th>Email</th>
            <th>Profile Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        {savedCandidates.map((candidate: any) => (
          <SavedCandidateCard
            key={candidate.login}
            candidate={candidate}
          />
        ))}
      </table>
      {savedCandidates.length > 0 && (
        <div className="saved-candidates-footer">
          <p>Total saved candidates: {savedCandidates.length}</p>
        </div>
      )}
    </>
  );
};

export default SavedCandidates;
