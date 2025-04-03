// Create a table prop component to render all of my saved candidated in a table for my savedCandidates page
import React from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

export default function SavedCandidateCard({ candidate }: { candidate: Candidate }) {

    const imgSizing: React.CSSProperties = {
        width: '50px', // Set the width of the avatar image
        height: '50px', // Set the height of the avatar image
        borderRadius: '50%', // Make the image circular
        objectFit: 'cover', // Ensure the image covers the area without distortion
    };
    return (
        // Creating a table row for each saved candidate
        // This will be used in the SavedCandidates page to display saved candidates in a table format
        <tr className="saved-candidate-row">
            <td><img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} style={imgSizing} className="saved-candidate-avatar" /></td>
            <td className="saved-candidate-name">{candidate.name || candidate.login}</td>
            <td className="saved-candidate-company">{candidate.company || "No company info"}</td>
            <td className="saved-candidate-location">{candidate.location || "No location info"}</td>
            <td className="saved-candidate-email">{candidate.email || "No email available"}</td>
            <td className="saved-candidate-profile-link">
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                </a>
            </td>
            <td className="saved-candidate-actions">
                <button
                    onClick={
                        () => {
                            // Remove candidate from localStorage
                            const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
                            const updatedCandidates = savedCandidates.filter((c: Candidate) => c.login !== candidate.login);
                            localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
                            // Rerender the SavedCandidates page to reflect the changes
                            window.location.reload(); // Reload the page to see the updated list
                        }
                    }
                    className="remove-candidate-button">
                    Remove
                </button>
            </td>
        </tr>
    );
};