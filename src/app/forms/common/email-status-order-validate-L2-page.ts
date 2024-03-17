import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { OrderHttpService } from '../../services/http/administration/order.http.service';
import { CreateAssetSAPResult } from '../../model/api/result/create-asset-SAP-result';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'app-email-status-order-validate-L2-page',
    templateUrl: 'email-status-order-validate-L2-page.html'
})
export class EmailStatusOrderValidateL2PageComponent implements OnInit {
  position: string;
  reason: string = '';
  guid: string = '';
  success: boolean = false;

    constructor(
      private dialogService: DialogService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private orderHttpService: OrderHttpService,
      private route: ActivatedRoute) {
      this.route.params.subscribe((params: Params) => {
        if (params['guid']) {
            this.guid = params['guid'];
            console.log(this.guid);
        }
    });
    }
  ngOnInit(): void {
    this.confirmPosition('bottom');
  }

  confirmPosition(position: string) {
      this.position = position;

      this.dialogService
        .confirmDialog({
          title: 'Confirm Action',
          message: 'Doriti sa aprobati aceasta comanda?',
          confirmCaption: 'Da',
          cancelCaption: 'Nu',
        })
        .subscribe((confirmed: any) => {
          if (confirmed) {
            this.orderHttpService.validateMobileLevel2(this.guid).subscribe( (res: CreateAssetSAPResult)=> {
              if(res.success){
                this.messageService.add({severity:'info', summary:'Aprobare', detail:'Comanda a fost aprobata cu sucess!'});
              } else {
                this.messageService.add({severity:'error', summary:'Aprobare', detail:res.errorMessage});
              }
            });
          } else {
            const type = 1;
            switch(type) {
              case ConfirmEventType.REJECT:
                this.orderHttpService.rejectMobileLevel2(this.guid).subscribe( (res: CreateAssetSAPResult) => {
                  if(res.success){
                    this.messageService.add({severity:'error', summary:'Refuz', detail:'Comanda a fost refuzata'});
                  } else {
                    this.messageService.add({severity:'error', summary:'Refuz', detail:res.errorMessage});
                  }
                });

                break;
              // @ts-ignore
              case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Anulare', detail:'Aprobare anulata'});
                break;
            }
          }
        });

      // this.confirmationService.confirm({
      //     message: 'Doriti sa aprobati aceasta comanda?',
      //     header: 'Confirma',
      //     icon: 'pi pi-info-circle',
      //     accept: () => {
      //       this.orderHttpService.validateMobileLevel2(this.guid).subscribe( (res: CreateAssetSAPResult)=> {
      //         if(res.success){
      //           this.messageService.add({severity:'info', summary:'Aprobare', detail:'Comanda a fost aprobata cu sucess!'});
      //         } else {
      //           this.messageService.add({severity:'error', summary:'Aprobare', detail:res.errorMessage});
      //         }
      //       })
      //
      //     },
      //     reject: (type) => {
      //         switch(type) {
      //             case ConfirmEventType.REJECT:
      //                 this.orderHttpService.rejectMobileLevel2(this.guid).subscribe( (res: CreateAssetSAPResult) => {
      //                   if(res.success){
      //                     this.messageService.add({severity:'error', summary:'Refuz', detail:'Comanda a fost refuzata'});
      //                   } else {
      //                     this.messageService.add({severity:'error', summary:'Refuz', detail:res.errorMessage});
      //                   }
      //                 })
      //
      //             break;
      //             case ConfirmEventType.CANCEL:
      //                 this.messageService.add({severity:'warn', summary:'Anulare', detail:'Aprobare anulata'});
      //             break;
      //         }
      //     },
      //     key: "positionDialog"
      // });
  }
}
