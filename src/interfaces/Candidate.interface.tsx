// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    company?: string;
    location?: string;
    email?: string;
    bio?: string;
};