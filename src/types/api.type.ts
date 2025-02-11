import { Picture } from "./picture.type";


export type Loading = { status: "loading" };


export type Success = { status: "success"; pictures: Picture[] };


export type Failure = { status: "failure"; error: string };


export type ApiStatus = Loading | Success | Failure;
