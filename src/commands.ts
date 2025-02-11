import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';
import { Picture } from './types/picture.type';


const parsePictures = async (response: Response): Promise<Picture[]> => {
  const data = await response.json(); 
  if (!data.hits) {
    throw new Error("Réponse API invalide : 'hits' manquant"); 
  }
  return data.hits.map((item: any) => ({
    previewFormat: item.previewURL,
    webFormat: item.webformatURL,
    author: item.user,
    largeFormat: item.largeImageURL || item.webformatURL,
  }));
};


export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => fetch(action.path, { method: action.method }).then(parsePictures), 
    {
      successActionCreator: fetchCatsCommit, 
      failActionCreator: fetchCatsRollback, 
    }
  );
