import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActionTypes, LoadAnnotationsError, LoadAnnotationsSuccess } from './annotation.actions';
import { AnnotationService } from './annotation.service';


@Injectable()
export class AnnotationsEffects {
    constructor(
        private actions$: Actions,
        private annotationService: AnnotationService) {}

        loadAnnotations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LoadAnnotation),
            mergeMap(() =>
                this.annotationService.getAnnotation().pipe(
                    map((annotations) => {
                        return new LoadAnnotationsSuccess({annotations});
                      }),
                    catchError(() => of(new LoadAnnotationsError()))
                )
            )
        )).subscribe();
}