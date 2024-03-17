import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { SubType } from '../../../model/api/administration/sub-type';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { Type } from '../../../model/api/administration/type';
import { AssetImage, EntityFile } from '../../../model/api/common/entity-file';
import { AppConfig } from '../../../config';


@Component({
    selector: 'sub-type-detail',
    templateUrl: 'sub-type.detail.html',
    providers: [EntityFileHttpService],
    outputs: ['typeNeeded']
})
export class SubTypeDetail extends GenericDetail<SubType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;
    public typeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedType: Type;
    public entityTypeCode: string = 'SUBTYPE';

    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();

    constructor( public entityFileHttpService: EntityFileHttpService) {
        super();

    }

    setItemDefaultValues() {
        this.item = new SubType(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedType == null)) {
            alert('Type este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set type(type: Type) {
        this.setType(type);
    }

    public setType(type: Type) {
        this.selectedType = type;
        this.item.typeId = type != null ? type.id : null;
    }

    public askForType() {
        this.typeNeeded.emit();
    }

    // public refreshEntityFiles() {
    //     let params: Array<Param> = new Array<Param>();
    //     params.push(new Param('entityTypeCode', 'SUBTYPE'));
    //     params.push(new Param('entityId', this.item.id.toString()));
    //     this.entityFileList.refresh(params);

    //     }


        public refreshEntityFiles(loadAssetImages: boolean) {
            this.entityFileHttpService.getByEntity('SUBTYPE', this.item.id, '', 0)
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

            public loadAssetImages() {
                        if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
                            this.imageCount = this.assetImages.length;
                            this.imageIndex = 0;
                            this.imageLoading = true;
                            this.loadAssetImageLoop();
                        }
                    }

        public loadAssetImageLoop() {
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

        public createImageFromBlob(assetImage: AssetImage, image: Blob) {
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

        public loadNextAssetImage() {
                    if (this.imageIndex < (this.assetImages.length - 1)) {
                        this.imageIndex++;
                        this.loadAssetImageLoop();
                    }
                    else {
                        this.imageLoading = false;
                    }
                }

}
