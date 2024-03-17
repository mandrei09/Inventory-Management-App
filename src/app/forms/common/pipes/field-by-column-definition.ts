import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { BoolPipeState } from './bool.pipe_state';
import { MergeRoom } from './merge-room.pipe';
import { BoolPipeInventory } from './bool-pipe.inventory';
import { HighlightPipe } from './highlight-pipe ';
import { BoolPipe } from './bool.pipe';
import { MergePipe } from './merge.pipe';
import { ColumnDefinition } from '../../../model/common/column-definition';
import {DomSanitizer} from '@angular/platform-browser';
import { BoolWFHStatePipe } from './boolWFHState.pipe';
import { BoolPipeSapValidation } from './bool-pipe_sap_validaton';


@Pipe({ name: 'fieldByColumnDefinition' })
export class FieldByColumnDefinitionPipe implements PipeTransform {

    public yesNo: string = '';

    constructor(
        public datePipe: DatePipe,
        public decimalPipe: DecimalPipe,
        public boolPipe: BoolPipe,
        public boolPipeState: BoolPipeState,
        public boolPipeInventory: BoolPipeInventory,
        private _sanitizer: DomSanitizer,
        public mergePipe: MergePipe,
        public mergeRoom: MergeRoom,
        public highlightPipe: HighlightPipe,
        public boolWFHState : BoolWFHStatePipe,
        public boolPipeSapValidation: BoolPipeSapValidation) {
    }

    // transform(value: any, columnDefinition: ColumnDefinition): any {
    //     let result: any = value;
    //     let employeeFullName: any = value;
    //     let room: any = value;
    //     const paths: Array<string> = columnDefinition.property.split('.');
    //     paths.forEach((path: string) => {
    //         result = result === null ? null : result[path];

    //     });

    //     if (paths[0] === 'employeeInitial') {

    //         employeeFullName = employeeFullName === null ? '' :
    //         employeeFullName.employeeInitial != null ? ' ' +
    //         employeeFullName.employeeInitial.internalCode + ' - ' +
    //         employeeFullName.employeeInitial.firstName
    //          + ' ' + employeeFullName.employeeInitial.lastName : '';
    //     }
    //     if (paths[0] === 'employeeFinal') {

    //         employeeFullName = employeeFullName === null ? '' :
    //         employeeFullName.employeeFinal != null ? ' ' +
    //         employeeFullName.employeeFinal.internalCode + ' - ' +
    //         employeeFullName.employeeFinal.firstName
    //          + ' ' + employeeFullName.employeeFinal.lastName : '';
    //     }

    //     if (paths.length > 1) {

    //         if ( paths[1] === 'employee') {

    //             employeeFullName = employeeFullName === null ? '' :
    //             employeeFullName.adm == null ? null :  employeeFullName.adm.employee != null ?
    //              ' ' + employeeFullName.adm.employee.internalCode + ' - ' + employeeFullName.adm.employee.firstName
    //              + ' ' + employeeFullName.adm.employee.lastName : '';
    //         }
    //     }

    //     if (paths[0] === 'roomInitial') {

    //         room = room === null ? '' :
    //         room.roomInitial != null ? ' ' + room.roomInitial.code
    //          + ' - ' + room.roomInitial.name : '';
    //     }
    //     if (paths[0] === 'roomFinal') {

    //         room = room === null ? '' :
    //         room.roomFinal != null ? ' ' + room.roomFinal.code
    //          + ' - ' + room.roomFinal.name : '';
    //     }

    //     if (paths.length > 1) {

    //         if ( paths[1] === 'room') {

    //             room = room === null ? '' :
    //             room.adm == null ? null :  room.adm.room != null ?
    //              ' ' + room.adm.room.code
    //              + ' - ' + room.adm.room.name : '';
    //         }
    //     }

    //     if (columnDefinition.pipe) {

    //         switch (columnDefinition.pipe) {
    //             case 'date':
    //                 return this.datePipe.transform(result, columnDefinition.format);
    //             case 'number':
    //                 return this.decimalPipe.transform(result, columnDefinition.format);
    //             case 'bool':
    //                 return this.boolPipe.transform(result, this.yesNo);
    //             case 'boolstate':
    //                 return this.boolPipeState.transform(result, this.yesNo);
    //             case 'boolinv':
    //                 return this.boolPipeInventory.transform(result, this.yesNo);
    //             case 'merge':
    //                 // return this.mergePipe.transform(result + ' - ', employeeFullName, true);
    //                 return this.mergePipe.transform('', employeeFullName, true);
    //             case 'mergeRoom':
    //             // return this.mergePipe.transform(result + ' - ', employeeFullName, true);
    //                 return this.mergePipe.transform('', room, true);
    //             case 'highlightPipe':
    //                 // return this.mergePipe.transform(result + ' - ', employeeFullName, true);
    //                 return this.highlightPipe.transform('', '|');
    //             default: return;
    //         }
    //     }
    //     return result;
    // }

    transform(value: any, columnDefinition: ColumnDefinition): any {
        let result: any | null = value;
        const paths: Array<string> = columnDefinition.property.split('.');

        paths.forEach((path: string) => {
          result = result === null || result === undefined ? null : result[path];
        });

        if (columnDefinition.pipe) {
            switch (columnDefinition.pipe) {
                case 'date':
                    // return this.datePipe.transform(result, columnDefinition.format, '+0600');
                    let format;
                    let timezone;

                    if (columnDefinition.format.length > 0) {
                        const sepIndex = columnDefinition.format.indexOf('|');
                        if (sepIndex > 0) {
                            format = columnDefinition.format.substr(0, sepIndex);
                            if (columnDefinition.format.length > sepIndex) { timezone = columnDefinition.format.substr(sepIndex + 1); }
                        } else {
                            format = columnDefinition.format;
                        }
                    }

                    return this.datePipe.transform(result, format, timezone);
                case 'number':
                    return this.decimalPipe.transform(result, columnDefinition.format);
                case 'bool':
                    // return this.boolPipe.transform(result, this.yesNo);
                    return this.boolPipe.transform(result, columnDefinition.format);
                case 'boolstate':
                    return this.boolPipeState.transform(result, this.yesNo);
                case 'boolinv':
                    return this.boolPipeInventory.transform(result, this.yesNo);
                case 'boolsapvalidation':
                        return this.boolPipeSapValidation.transform(result, this.yesNo);
                case 'status':
                  if (result.badgeIcon) {
                    const val = '<div class="table-row_status"><div style="background:' + result.badgeColor + ' !important;" class="badge custom-badge rounded-pill"><i class="material-icons">' + result.badgeIcon + '</i><span>' + result.name + '</span></div></div>';
                    return this._sanitizer.bypassSecurityTrustHtml(val);
                  } else {
                    const val = '<div class="table-row_status"><div style="background:' + result.badgeColor + ' !important;" class="badge custom-badge rounded-pill"><span>' + result.name + '</span></div></div>';
                    return this._sanitizer.bypassSecurityTrustHtml(val);
                  }
                case 'percentage':
                  const val = '<div class="table-row_status"><div class="badge custom-badge rounded-pill"><span>' + result + '</span></div></div>';
                  return this._sanitizer.bypassSecurityTrustHtml(val);
                case 'boolWFH':
                    return this.boolWFHState.transform(result, this.yesNo);
                // case 'states':
                //     return this.statesPipe.transform(result, this.translocoService);
            }
        }
        return result;
    }
}
