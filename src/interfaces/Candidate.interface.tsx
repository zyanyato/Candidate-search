// TODO: Create an interface for the Candidate objects returned by the API
export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
    site_admin: boolean;
    score: number;
}