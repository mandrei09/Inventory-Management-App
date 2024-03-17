import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;

  constructor(public notifyService: NotifyService) {
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(`${environment.apiRoot}/notify`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

      this.hubConnection.onclose = (error) => {
        console.log(error)
      }
  }

  public newAssetCreateListener = () => {
    this.hubConnection.on('newAssetCreateListener', (data) => {
      // console.log(JSON.stringify(data));
      this.notifyService.notifyDataCreateAssetAsync(data);
    });
  }

  public newAssetRetireListener = () => {
    this.hubConnection.on('newAssetRetireListener', (data) => {
      // console.log(JSON.stringify(data));
      this.notifyService.notifyDataRetireAssetAsync(data);
    });
  }

  public newAssetStornoListener = () => {
    this.hubConnection.on('newAssetStornoListener', (data) => {
      // console.log(JSON.stringify(data));
      this.notifyService.notifyDataStornoAssetAsync(data);
    });
  }

  public newAssetAcquisitionStornoListener = () => {
    this.hubConnection.on('newAssetStornoAcquisitionListener', (data) => {
      // console.log(JSON.stringify(data));
      this.notifyService.notifyDataStornoAssetAcquisitionAsync(data);
    });
  }

  public newAssetTransferListener = () => {
    this.hubConnection.on('newAssetTransferListener', (data) => {
      // console.log(JSON.stringify(data));
      this.notifyService.notifyDataTransferAssetAsync(data);
    });
  }

  public newAssetInvMinusListener = () => {
    this.hubConnection.on('newAssetInvMinusListener', (data) => {
      // console.log(JSON.stringify(data));
      this.notifyService.notifyDataAssetInvMinusAsync(data);
    });
  }

  public newAssetInvPlusListener = () => {
    this.hubConnection.on('newAssetInvPlusListener', (data) => {
      // console.log(JSON.stringify(data));
      this.notifyService.notifyDataAssetInvPlusAsync(data);
    });
  }

  public orderItemDeleteListener = () => {
    this.hubConnection.on('orderItemDeleteListener', (data) => {
      this.notifyService.notifyDataOrderItemDeleteAsync(data);
    });
  }

  public editAssetListener = () => {
    this.hubConnection.on('editAssetListener', (data) => {
      this.notifyService.notifyDataEditAssetAsync(data);
    });
  }

  public createAssetSAPListener = () => {
    this.hubConnection.on('createAssetSAPListener', (data) => {
      this.notifyService.notifyDataCreateAssetSAPAsync(data);
    });
  }

  public changeAssetSAPListener = () => {
    this.hubConnection.on('changeAssetSAPListener', (data) => {
      this.notifyService.notifyDataChangeAssetSAPAsync(data);
    });
  }

  public acquisitionAssetSAPListener = () => {
    this.hubConnection.on('acquisitionAssetSAPListener', (data) => {
      this.notifyService.notifyDataAcquisitionAssetSAPAsync(data);
    });
  }

  public wfhValidateListener = () => {
    this.hubConnection.on('wfhValidateListener', (data) => {
      this.notifyService.notifyDataWFHValidateAsync(data);
    });
  }
}
