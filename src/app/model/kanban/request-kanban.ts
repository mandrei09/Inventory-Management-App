export interface Comment {
  id: number,
  text: string,
}

export interface Card {
  id: number,
  text: string,
  like: number,
  comments: Comment[]
}

export interface RequestKanban {
  id: number,
  status: string,
  color: string,
  list: Card[]
}
