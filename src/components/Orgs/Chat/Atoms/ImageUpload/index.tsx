import { useCallback } from 'react';

import ImageUploader from 'react-images-upload';
import Compress from 'browser-image-compression';

interface ImageUploadProps {
  sendMessage: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ sendMessage }) => {
  const getBase64 = (file: File, options: any): any => new Promise((resolve, reject) => {
    Compress(file, options).then((compressedBlob) => {
      const convertedBlobFile = new File([compressedBlob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });
      const reader = new FileReader();

      reader.readAsDataURL(convertedBlobFile);
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  });

  const handleChange = useCallback(
    async (files: File[], pictures: any[]) => {
      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      };

      getBase64(files[0], options).then((result: any) => {
        // eslint-disable-next-line no-param-reassign
        pictures[0] = result;
      });

      sendMessage('image', pictures[0]);
    },
    [sendMessage],
  );

  const containerStyle = {
    background: 'rgba(0, 0, 0, 0)',
    width: 24,
    margin: 0,
    padding: 0,
    right: 40,
    display: 'flex',
    position: 'static',
    boxShadow: '0px 0px 0px #FFFFFF',
  } as React.CSSProperties;

  const buttonStyle = {
    background: 'rgba(0, 0, 0, 0)',
    zIndex: 999,
  } as React.CSSProperties;

  return (
    <ImageUploader
      withIcon={false}
      buttonText=""
      onChange={handleChange}
      imgExtension={['.jpg', '.png', '.jpeg']}
      maxFileSize={5242880}
      withPreview={false}
      withLabel={false}
      singleImage
      fileContainerStyle={containerStyle}
      buttonStyles={buttonStyle}
    />
  );
};

export default ImageUpload;
