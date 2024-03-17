// import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import { Subject } from 'rxjs';

// @Injectable()
// export class ProgressBarService {
//     public uploadProgress: Subject<any>;

//     startTracking() {
//         this.uploadProgress = new Subject();
//         return this.uploadProgress;
//     }

//     notify(progress) {
//         this.uploadProgress.next(progress);
//     }

//     endTracking() {
//         this.uploadProgress.complete();
//     }
// }

// @Injectable()

// export class BrowserXhrWithProgress extends BrowserXhr {

//     constructor(public service: ProgressBarService) {
//         super();
//      }

//      build(): XMLHttpRequest {
//         const xhr: XMLHttpRequest = super.build();

//         // xhr.onprogress = (event) => {
//         //     this.service.downloadProgress.next(this.createProgress(event));
//         // }

//         xhr.upload.onprogress = (event) => {
//             this.service.notify(this.createProgress(event));
//         };

//         xhr.upload.onloadend = () => {
//             this.service.endTracking();
//         }

//         return xhr;
//      }

//     public createProgress(event) {
//         return {
//             total: event.total,
//             percentage: Math.round(event.loaded / event.total * 100)
//         }
//     }
// }
