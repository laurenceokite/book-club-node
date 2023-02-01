export interface IUser {
    id: number
    firstName?: string
    lastName?: string
    username: string
    email: string
    password: string
    clubs: IClub[]
    favoriteBooks: IBook[]
    booksRead: IBook[]
    booksInProgress: IBook[]
    createdOn: Date
}

export interface IAuthor {
    id: number;
    firstName?: string;
    lastName?: string;
    bio: string;
    bipoc: boolean;
    lgbtq: boolean;
    genres: string[];
    books: IBook[];
}

export interface IBook {
    id: number
    authorId: number; // has one author
    isbn: number[];
    synopsys: string;
    imageUrl: string;
    genres: string[];
}

export interface IClub {
    id: number;
    clubName: string;
    books: IBook[];
    meetups: number[];
}

export type Meetup = {
    id: number;
    title: string;
    clubId: number; //has one club,
    bookId?: number;
    time: Date[];
    location: string;
    conversationId: number; // always creates a conversation.
}

export type ClubBook = {
    bookId: number; // has one book
    clubId: number; // has one club
    status: 'proposed' 
        | 'inProgress' 
        | 'completed' 
        | 'inQueue'
    upVotes: number;
    startedOn?: Date;
    completedOn?: Date;
    targetDate?: Date;
}

export type Conversation = {
    id: number;
    private: boolean;
    clubId?: number;
    bookId?: number;
    meetupId?: number;
    title?: string;
    body: string;
    responses: Response[];
}

export type Response = {
    id: number;
    userId: number; // has one user 
    conversationId?: number;
    responseId?: number;
    body: string; 
    reactions: number[];
}

export type Reaction = {

}                                                         

