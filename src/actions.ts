import { CloseModal, Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment } from './types/actions.type';
import { SelectPicture } from './types/actions.type';
import { Picture } from './types/picture.type';


const API_KEY = "24523143-8a90135b40ac6e775ba6758cb";
export const selectPicture = (picture: Picture): SelectPicture => ({
  type: 'SELECT_PICTURE',
  picture,
});
export const closeModal = (): CloseModal => ({
  type: 'CLOSE_MODAL',
});

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=${API_KEY}&per_page=${counter}&q=cat`,
});

//export const fetchCatsCommit = (payload: unknown): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload });
export const fetchCatsCommit = (payload: Picture[]): FetchCatsCommit => ({
  type: 'FETCH_CATS_COMMIT',
  payload,
});



export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });
