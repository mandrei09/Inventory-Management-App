import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { AppConfig } from 'app/config';
import { EntityFileHttpService } from 'app/services/http/common/entity-file.http.service';
import { EntityFileList } from 'app/forms/common/entity-file.list';
import { AssetImage, EntityFile } from 'app/model/api/common/entity-file';
import { SubTypePartner } from 'app/model/api/administration/sub-type-partner';
import { Partner } from 'app/model/api/documents/partner';
import { SubType } from 'app/model/api/administration/sub-type';

@Component({
    selector: 'sub-type-partner-detail',
    templateUrl: 'sub-type-partner.detail.html',
    providers: [EntityFileHttpService],
    outputs: ['partnerNeeded', 'subTypeNeeded']
})
export class SubTypePartnerDetail extends GenericDetail<SubTypePartner, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    @ViewChild('entityFileList') public entityFileList: EntityFileList;
    protected partnerNeeded: EventEmitter<void> = new EventEmitter<void>();
    protected subTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedPartner: Partner;
    private selectedSubType: SubType;
    private entityTypeCode: string = 'SUBTYPEPARTNER';

    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();

    constructor( private entityFileHttpService: EntityFileHttpService) {
        super();

    }

    setItemDefaultValues() {
        this.item = new SubTypePartner(0, 0, 0);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedPartner == null) && (this.selectedSubType == null)) {
            alert('Furnizorul si caytegoria sunt obligatorii!');
        }
        else {
            super.saveItem();
        }
    }

    public set partner(partner: Partner) {
        this.setPartner(partner);
    }

    private setPartner(partner: Partner) {
        this.selectedPartner = partner;
        this.item.partnerId = partner != null ? partner.id : null;
    }

    private askForPartner() {
        this.partnerNeeded.emit();
    }


    public set subType(subType: SubType) {
      this.setSubType(subType);
  }

  private setSubType(subType: SubType) {
      this.selectedSubType = subType;
      this.item.subTypeId = subType != null ? subType.id : null;
  }

  private askForSubType() {
      this.subTypeNeeded.emit();
  }

    // private refreshEntityFiles() {
    //     let params: Array<Param> = new Array<Param>();
    //     params.push(new Param('entityTypeCode', 'SUBTYPE'));
    //     params.push(new Param('entityId', this.item.id.toString()));
    //     this.entityFileList.refresh(params);

    //     }


        private refreshEntityFiles(loadAssetImages: boolean) {
            this.entityFileHttpService.getByEntity('SUBTYPE', this.item.id)
            .subscribe((entityFiles: Array<EntityFile>) => {
                this.existingAssetImages.splice(0, this.existingAssetImages.length);
                this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
                this.assetImages.splice(0, this.assetImages.length);
                this.assetFiles.splice(0, this.assetFiles.length);
                // this.entityFileMemoryDataSource.clear();
                entityFiles.forEach((entityFile: EntityFile) => {
                    if (entityFile.fileType.startsWith('image/')) {
                        let fileContent: any = null;
                        this.existingAssetImages.forEach((assetImage: AssetImage) => {
                            console.log(JSON.stringify(assetImage));
                            if (assetImage.entityFile.id === entityFile.id) {
                                fileContent = assetImage.fileContent;
                            }
                        });
                        this.assetImages.push(new AssetImage(entityFile, fileContent));
                    }
                    else {
                        this.assetFiles.push(entityFile);
                        // this.entityFileMemoryDataSource.addItem(entityFile);
                    }
                });
               // this.fileList.refresh(null);
                if (loadAssetImages) this.loadAssetImages();
            });
        }

            private loadAssetImages() {
                        if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
                            this.imageCount = this.assetImages.length;
                            this.imageIndex = 0;
                            this.imageLoading = true;
                            this.loadAssetImageLoop();
                        }
                    }

        private loadAssetImageLoop() {
                    if (this.assetImages.length > this.imageIndex) {
                        let assetImage: AssetImage = this.assetImages[this.imageIndex];
                        if (assetImage.fileContent === null) {
                            this.entityFileHttpService.download(assetImage.entityFile.id).subscribe((image) => {
                                this.createImageFromBlob(assetImage, image);
                                this.loadNextAssetImage();
                            });
                        }
                        else {
                            this.loadNextAssetImage();
                        }
                    }
                }

        private createImageFromBlob(assetImage: AssetImage, image: Blob) {
                    let reader = new FileReader();
                    reader.addEventListener('load', () => {
                    // this.images.push(reader.result);
                    assetImage.fileContent = reader.result;
                    console.log(assetImage);
                    }, false);
                    if (image) {
                    reader.readAsDataURL(image);
                    }
                }

        private loadNextAssetImage() {
                    if (this.imageIndex < (this.assetImages.length - 1)) {
                        this.imageIndex++;
                        this.loadAssetImageLoop();
                    }
                    else {
                        this.imageLoading = false;
                    }
                }

}
