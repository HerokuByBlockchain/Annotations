import { Component, ViewChild, ElementRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_PNG, LoadImageSuccess, LoadAnnotations, DrawImageAndAnnotationsButtonClicked } from '../annotation.actions';
import { AnnotationService } from '../annotation.service';


@Component({
  selector: 'my-annotations',
  templateUrl: './my-annotations.component.html',
})
export class MyAnnotationsComponent {
  protected http: HttpClient;
  protected annotations: Annotations;
  imagePNG: any;

  @ViewChild('image', { static: false }) imageElement: ElementRef;
  @ViewChild('canvas', { static: false }) canvasElement: ElementRef;

  constructor(protected httpClient: HttpClient,
              protected store: Store<{annotations: Annotations }>,
              protected annotationService: AnnotationService) {
    this.http = httpClient;
    this.fetchImagePNG().subscribe();
    // TODO functions fetchImagePNG() should be used yet in the clickDrawAnnotations() function
    //      however actualizing of ViewChild imageElement after successful fetch of the image doesn't work properly at the moment
    //      and fetch of annotations from store doesn't work properly at the moment as well.
    //      Thererfore an workaround has been applied:
    //      1. image is fetched with fetchImagePNG() yet in the constructor
    //      2. annotation is fetched with use of annotation.effects.ts and annotation.service.ts that are being triggered
    //         in ngOnInit() when call of LoadAnnotations() action
    //      3. annotation.service.ts contatins the AnnotationService.getStoredAnnotations() function that is used
    //         in drawImageAndEllipse() properly when 'Draw Annotations' button is clicked, however correct the annotations themself
    //         should be read from the store
  }

  ngOnInit() {
    this.store.dispatch(new LoadAnnotations());
  }

  fetchImagePNG(): Observable<any> {
    return this.http.get(`${URL_PNG}`,  {responseType: 'blob'}).pipe(
      tap((result) => {
        this.imagePNG = URL.createObjectURL(result);
        this.store.dispatch(new LoadImageSuccess());
      }));
  }

  fetchEllipse(): Observable<any> {
    return of(this.annotationService.getStoredAnnotations());
    // TODO fetch of annotations from store doesn't work properly at the moment
    //      and instead of return above there should be following code statement applied
    //      this.store.pipe(select(selectFetchedAnnotations)).subscribe(annotations => this.annotations = annotations);
  }

  drawImageAndEllipse() {
    const ctx = this.canvasElement.nativeElement.getContext("2d") as CanvasRenderingContext2D;
    this.canvasElement.nativeElement.width = this.imageElement.nativeElement.width;
    this.canvasElement.nativeElement.height = this.imageElement.nativeElement.height;

    // Draw on canvas PNG image from API endpoint
    ctx.drawImage(this.imageElement.nativeElement,
      0,
      0,
      this.canvasElement.nativeElement.width,
      this.canvasElement.nativeElement.height);
    // Draw the ellipse
    this.annotations = this.annotationService.getStoredAnnotations();
    // TODO fetch of annotations from store doesn't work properly at the moment
    //      and instead of 'this.annotationService.getStoredAnnotations()' statement above it should be following code statement applied
    //      'this.store.pipe(select(selectFetchedAnnotations)).subscribe(annotations => this.annotations = annotations);'
    ctx.ellipse(this.annotations.annotations[0].x,
      this.annotations.annotations[0].y,
      this.annotations.annotations[0].radiusX,
      this.annotations.annotations[0].radiusY,
      Math.PI * 0.25,
      0,
      Math.PI * 2);
    ctx.stroke();
  }

  clickDrawAnnotations() {
    this.store.dispatch(new DrawImageAndAnnotationsButtonClicked());
    this.fetchImagePNG().pipe(
      tap(() => this.drawImageAndEllipse())
    ).subscribe();
  }
}

export class Annotation {
  id: string = "";
  x: number = NaN;
  y: number = NaN;
  radiusX: number = NaN;
  radiusY: number = NaN;

  constructor() {
  }
}

export class Annotations {
  annotations: Annotation[] = [];

  constructor() {
  }
}