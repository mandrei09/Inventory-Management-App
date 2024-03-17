export class DataImportProgress {
    importType: string = '';
    fileName: string = '';
    startedAt: Date | null = null;
    total: number = 0;
    current: number = 0;
    stateCode: string = '';

    constructor(importType: string, fileName: string, startedAt: Date, 
        total: number, current: number, stateCode: string) {

        this.importType = importType;
        this.fileName = fileName;
        this.startedAt = startedAt;
        this.total = total;
        this.current = current;
        this.stateCode = stateCode;
    }
}

export class FileUploadProgress {
    fileName: string = '';
    progress: number = 0;

    constructor(fileName: string, progress: number) {
        this.fileName = fileName;
        this.progress = progress;
    }
}
