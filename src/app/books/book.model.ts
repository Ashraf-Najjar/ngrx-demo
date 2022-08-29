export interface BookModel {
    id: string;
    name: string;
    earnings: number;
    description?: string;
}

export type BookRequiredProps = Pick<BookModel, 'name' | 'earnings'>;
  
