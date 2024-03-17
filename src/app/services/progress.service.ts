import {Subject} from 'rxjs';
import { DataProgress } from '../model/api/common/data-progress';

export class ProgressService {

  progress: number = 0;
  data: DataProgress = null;
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  emitModelChange(change: DataProgress) {
    this.emitChangeSource.next(change);
  }

  constructor() { }
}
