import React, { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

const CandidateSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [candidates, setCandidates] = useState<GitHubUser[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (candidates && candidates.length > 0) {
      setCurrentCandidate(candidates[0]);
    }
  }, [candidates]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub(searchTerm);
      console.log('API Response:', data);
      setCandidates(data.items); // Assuming 'items' is the array of results from the API response
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, currentCandidate]));
      moveToNextCandidate();
    }
  };

  const handleDislike = () => {
    moveToNextCandidate();
  };

  const moveToNextCandidate = () => {
    setCandidates((prevCandidates) => prevCandidates.slice(1));
    setCurrentCandidate(candidates.length > 1 ? candidates[1] : null);
  };

  return (
    <div>
      <h1>CandidateSearch</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GitHub users"
      />
      <button onClick={handleSearch} disabled={loading || !searchTerm}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p>{error}</p>}

      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width={100} />
          <p>{currentCandidate.login}</p>
          <div>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDislike}>Dislike</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available. Please search again.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
