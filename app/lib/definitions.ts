//Todo: use an ORM so we don't need to define these?
export type TestData = {
  id: number;
  name: string;
  releasedate: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Game = {
  id: string;
  name: string;
  release_year: number;
  platform: string;
}

export type GameTable = {
  id: string;
  name: string;
  release_year: number;
  platform: string;
}

export type GameForm = {
  id: string;
  name: string;
  release_year: number;
  platform: string;
};

export type GameField = {
  id: string;
  name: string;
}
  
export type Player = {
  id: string;
  user_name: string;
  email: string;
  created_date: string;
  modified_date: string;
};

export type PlayerTable = {
  id: string;
  user_name: string;
  email: string;
  created_date: string;
};

export type PlayerForm = {
  id: string;
  user_name: string;
  email: string;
  created_date: string;
  modified_date: string;
};

export type PlayerField = {
  id: string;
  user_name: string;
};

export type Runs = {
  id: string;
  player_id: string;
  game_id: string;
  duration: string;
  video_link: string;
  run_date: string;
  created_date: string;
  modified_date: string;
};

export type RunTable = {
  id: string;
  player_id: string;
  game_id: string;
  duration: string;
  video_link: string;
  run_date: string;
  game_name: string;
  player_name: string;
};

export type RunForm = {
  id: string;
  player_id: string;
  game_id: string;
  duration: string;
  video_link: string;
  run_date: string;
};