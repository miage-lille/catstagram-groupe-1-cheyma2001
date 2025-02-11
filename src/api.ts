import { Picture } from "./types/picture.type";
import { Loading, Success, Failure } from "./types/api.type";


export const loading = (): Loading => ({ status: "loading" });


export const success = (pictures: Picture[]): Success => ({
  status: "success",
  pictures,
});


export const failure = (error: string): Failure => ({
  status: "failure",
  error,
});

export const parsePictures = async (response: Response): Promise<Picture[]> => {
    const data = await response.json(); 
    return data.hits.map((item: any) => ({
        previewFormat: item.previewURL,
        webFormat: item.webformatURL,
        author: item.user,
        largeFormat: item.largeImageURL || item.webformatURL, 
    }));
};
