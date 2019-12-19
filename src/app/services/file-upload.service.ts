import { Injectable } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  filesToUpload: NgxFileDropEntry[] = [];

  constructor(private httpClient: HttpClient) { }

  setFiles(files: NgxFileDropEntry[]) {
    this.filesToUpload = files;
  }

  clearFiles() {
    this.filesToUpload = [];
  }

  upload(trip_id: string) {
    let filenames = []
    for (const droppedFile of this.filesToUpload) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const formData = new FormData()
          formData.append('image', file, droppedFile.relativePath)

          this.httpClient.post(`${environment.backendUrl}/trips/${trip_id}/upload`, formData).subscribe(
            data => {
              filenames.push(data)
              console.log(data)
            }
          )
        })

      }
    }
    return filenames
  }
}
