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
  