export default function CandidateCard(props: any) {
    return (
        
        <div className="candidate-card">
            <img src={props.avatar_url} alt={`${props.login}'s avatar`} className="candidate-avatar" />
            <h3 className="candidate-name">{props.name || props.login}</h3>
            <p className="candidate-company">{props.company || "No company info"}</p>
            <p className="candidate-location">{props.location || "No location info"}</p>
            {/* Add email if available */}
            {props.email && <p className="candidate-email">Email: {props.email}</p>}
            <p className="candidate-bio">{props.bio || "No bio available"}</p>
            <a href={props.html_url} target="_blank" rel="noopener noreferrer" className="candidate-profile-link">
                View Profile
            </a>
        </div>
    )
};