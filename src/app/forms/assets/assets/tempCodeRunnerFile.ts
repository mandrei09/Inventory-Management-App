        // alasql.promise(`select [ASSET SEQ NO-A] as InvNo1,
        //                     [ASSET SEQ NO] as InvNo2,
        //                     [ASSET COMPONENT] as InvNo3,
        //                     [GENERAL CATEGORY] as AssetCategoryCode,
        //                     [FA ACCOUNT DESCRIPTION] as AssetCategoryName,
        //                     [QUANTITY] as Quantity,
        //                     [BRANCH CODE] as LocationCode,
        //                     [COST CENTER] as CostCenterCode,
        //                     [ASSET DESCRIPTION] as AssetName,
        //                     [ACQUISITION DATE] as PurchaseDate,
        //                     CAST([ORIGINAL COST] AS NUMBER) as [ValueInv],
        //                     [SUPPLIER] as PartnerName,
        //                     [TAX NUMBER] as FiscalCode,
        //                     [DOCUMENT NUMBER] as DocNo1,
        //                     [SERIAL NUMBER] as SerialNumber,
        //                     [DISPOSITION DATE] as AssetState,
        //                     [FA ACCOUNT] as AssetType,
        //                     CAST([NET BOOK VALUE] AS NUMBER) as [ValueRem]
        //                     from FILE(?, {headers: true})`, [this.fileEvent])
        // .then((importLines: Array<AssetImportV1>) => {

        //         this.importDataModal.show();

        //         this.importIndex = 0;
        //         this.importLinesV1 = importLines;
        //         this.noOfItems = importLines.length;
        //    //  console.log(importLines);
        //         this.doImportV1();
        // });