import { Action } from '@ngrx/store';
import { Annotations } from './annotation/my-annotations.component';

export const URL_PNG = 'https://image.dummyjson.com/512x512';
export const URL_ANNOTATION = 'https://dummyjson.com/http/200/%7B%22id%22:%22a1%22,%22radiusX%22:20,%22radiusY%22:25,%22x%22:50,%22y%22:60%7D';     

export enum ActionTypes {
    DrawImageAndAnnotationsButtonClicked = '[Image] Draw Annotations button clicked',
    LoadImageSuccess = '[Image] Load image success',
    LoadImageError = '[Image] Load image error',
    LoadAnnotationsSuccess = '[Annotations] Load annotation success',
    LoadAnnotationsError = '[Annotations] Load annotation error',
    LoadAnnotation = '[Annotations] Load annotation',
    LoadImage = '[Image] Load image'
  }

export class LoadAnnotations implements Action {
    readonly type = ActionTypes.LoadAnnotation;

    constructor() {
      console.log("LoadAnnotation action");
    }
  }

export class DrawImageAndAnnotationsButtonClicked implements Action {
    readonly type = ActionTypes.DrawImageAndAnnotationsButtonClicked;

    constructor() {
      console.log("DrawImageAndAnnotationsButtonClicked action");
    }
  }

export class LoadImageSuccess implements Action {
    readonly type = ActionTypes.LoadImageSuccess;

    constructor() {
      console.log("LoadImageSuccess action");
    }
}

export class LoadImageError implements Action {
    readonly type = ActionTypes.LoadImageError;

    constructor() {
      console.log("LoadImageError action");
    }
}

export class LoadAnnotationsSuccess implements Action {
    readonly type = ActionTypes.LoadAnnotationsSuccess;

    constructor(public payload: { annotations: Annotations }) {
      console.log("LoadAnnotationsSuccess action");
    }
  }

export class LoadAnnotationsError implements Action {
    readonly type = ActionTypes.LoadAnnotationsError;

    constructor() {
      console.log("LoadAnnotationsError action");
    }
}

export type ActionsUnion = LoadAnnotations
                            | DrawImageAndAnnotationsButtonClicked
                            | LoadImageSuccess
                            | LoadImageError
                            | LoadAnnotationsSuccess
                            | LoadAnnotationsError;