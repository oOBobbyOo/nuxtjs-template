import type Cropper from 'cropperjs'

export interface CropendResult {
  imgBase64: string
  imgInfo: Cropper.Data
}

export interface UploadParams {
  file: Blob
  filename: string
}

export type { Cropper }
