import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { DocumentType } from '../../../model/api/documents/document-type';

@Component({
    selector: 'app-document-type-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html',
  styleUrls: ['../../generic/generic.drop-down.list.scss']
})
export class DocumentTypeDropDownListComponent extends GenericDropDownList<DocumentType, number> {
    constructor() {
        super('name', 'asc');
    }
}
