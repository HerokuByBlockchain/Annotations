import { createSelector } from '@ngrx/store';
import { Annotations } from './annotation/my-annotations.component';
import { ActionsUnion, ActionTypes } from './annotation.actions';

export interface FeatureState {
    annotations: Annotations;
}

export interface AppState {
    annotations: Annotations;
}

export const selectAnnotations = (state: AppState) => state.annotations;

export const selectFetchedAnnotations = createSelector(
    selectAnnotations,
    (annotations : Annotations) => annotations);

export const initialState = {
    annotations: undefined,
};

export function AnnotationReducer(state = initialState, action: ActionsUnion) {
    switch (action.type) {
      case ActionTypes.LoadAnnotationsSuccess:
        return {
            ...state,
            annotations: [action.payload]
        };

      default:
        return state;
    }
  }