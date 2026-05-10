interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
  resource_type: string;
  created_at: string;
}

export class CloudinaryService {
  private static CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  private static CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

  static async uploadFile(file: File): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', this.CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload file to Cloudinary');
      }

      return await response.json();
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error((error as Error).message || 'Upload failed');
    }
  }

  static async uploadMultipleFiles(files: File[]): Promise<CloudinaryUploadResponse[]> {
    const uploadPromises = files.map(file => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }

  static validateFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Only JPEG, PNG, WebP, and GIF images are allowed',
      };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size must be less than 5MB',
      };
    }

    return { valid: true };
  }

  static generateSecureUrl(publicId: string, format?: string): string {
    const transformation = format || 'q_auto,f_auto,w_auto';
    return `https://res.cloudinary.com/${this.CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
  }

  static async deleteFile(publicId: string): Promise<void> {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_id: publicId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete file from Cloudinary');
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw new Error((error as Error).message || 'Delete failed');
    }
  }
}
