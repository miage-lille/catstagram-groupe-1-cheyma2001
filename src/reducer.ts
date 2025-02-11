import { Cmd, Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import { Option, none, some } from 'fp-ts/Option';
import { fetchCatsRequest } from './actions';
import { cmdFetch } from './commands'; // ✅ Importation correcte
import { ApiStatus } from './types/api.type';
import { failure, loading, success } from './api';

export type State = {
  counter: number;
  pictures: ApiStatus;
  pictureSelected: Option<Picture>;
};

export const defaultState: State = {
  counter: 3,
  pictures: loading(),
  pictureSelected: none,
};

export const selectPictures = (state: State): Picture[] => {
  if (state.pictures.status === "success") {
      return state.pictures.pictures;
  }
  return []; 
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return loop(
        {
          ...state,
          counter: state.counter + 1,
        },
        Cmd.action(fetchCatsRequest(state.counter + 1)) // ✅ Déclenche un nouvel appel API
      );

    case 'DECREMENT':
      if (state.counter > 3) {
        return loop(
          {
            ...state,
            counter: state.counter - 1,
          },
          Cmd.action(fetchCatsRequest(state.counter - 1)) // ✅ Déclenche un nouvel appel API
        );
      }
      return state;

    case 'SELECT_PICTURE':
      return {
        ...state,
        pictureSelected: some(action.picture), // ✅ Sélection de l’image correcte
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        pictureSelected: none, // ✅ Ferme la modale proprement
      };

      case 'FETCH_CATS_REQUEST':
        return loop(
          {
            ...state,
            pictures: loading(),  // ✅ Ajoute l'état "loading" lorsque l'appel API démarre
          },
          cmdFetch(action)  // ✅ Déclenche la commande pour récupérer les images
        );
      

        case 'FETCH_CATS_COMMIT':
          console.log("🐱 Images récupérées :", action.payload);
          return {
            ...state,
            pictures: success(action.payload), // ✅ Stocke bien les images dans l'état "success"
          };
        
        case 'FETCH_CATS_ROLLBACK':
          console.error("❌ Erreur API :", action.error);
          return {
            ...state,
            pictures: failure(action.error.message), // ✅ Stocke l'erreur en état "failure"
          };
        
      

    default:
      return state;
  }
};

export const counterSelector = (state: State): number => state.counter;
// export const picturesSelector = (state: State): Picture[] => {
//   if (state.pictures.status === "success") {
//       return state.pictures.pictures;
//   }
//   return []; 
// };
export const picturesSelector = (state: State): ApiStatus => state.pictures; 

export const picturesStateSelector = (state: State): ApiStatus => state.pictures;
export const getSelectedPicture = (state: State): Option<Picture> => state.pictureSelected;

export default compose(liftState, reducer);
