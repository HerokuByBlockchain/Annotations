import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_ANNOTATION } from './annotation.actions';
import { Annotation, Annotations } from './annotation/my-annotations.component';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AnnotationService {
    protected annotations: Annotations;

    constructor(private httpClient: HttpClient) {}

    getAnnotation(): Observable<Annotations> {
        return this.httpClient.get(`${URL_ANNOTATION}`).pipe(
            map((value) => {
              /*
                given API returns JSON in form of
                {
                  "status": "200",
                  "message": "[{\"id\":\"a1\",\"radiusX\":20,\"radiusY\":25,\"x\":50,\"y\":60"
                }
                and there is a need to assign the correct Annotations object created from "message" property
              */
              const message = JSON.parse(JSON.parse(JSON.stringify(value)).message);
              const annotation: Annotation = new Annotation();
              const annotations: Annotations = new Annotations();
              annotation.id = message.id;
              annotation.x = message.x;
              annotation.y = message.y;
              annotation.radiusX = message.radiusX;
              annotation.radiusY = message.radiusY;
              annotations.annotations.push(annotation);
              this.storeAnnotations(annotations);
              return annotations;
          }));
    }

    private storeAnnotations(annotations: Annotations) {
        this.annotations = annotations;
    }

    getStoredAnnotations(): Annotations {
        return this.annotations;
    }

}