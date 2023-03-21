export type User = {
  id: string;
  name: string;
  avatar_url: string;
  html_url: string;
  login: string;
};

export type Repository = {
  id: string;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
};
