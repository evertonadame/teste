import {
  useState, useImperativeHandle, forwardRef, ForwardRefRenderFunction, ReactNode,
} from 'react';
import { FiEdit } from 'react-icons/fi';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from 'next/image';

import Compress from 'browser-image-compression';

import {
  SimpleContainer, ButtonsWrapper, StyledButton,
} from './styles';

type ImageUploadProps = {
  setImg(b64Img: string): void;
  children?: ReactNode | (Element & ReactNode);
  customChild: boolean;
 }

export type SimpleHandles = {
  handleClearImgs: ()=> void;
  images: ImageListType;
}

const Simple:ForwardRefRenderFunction<SimpleHandles, ImageUploadProps> = ({
  setImg,
  customChild = false,
  children,
}, ref) => {
  const [images, setImages] = useState<ImageListType>([]);

  const handleClearImgs = (): void => {
    setImages([]);
  };

  useImperativeHandle(ref, () => ({
    handleClearImgs,
    images,
  }));

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

  const onChange = (
    imageList: ImageListType,
  ): void => {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
    };

    if (imageList.length > 0 && imageList[0].file) {
      getBase64(imageList[0].file, options).then((result: string) => {
        const [, formatedBase64Url] = result.split('base64,');
        setImg(formatedBase64Url);
      });
    }
    setImages(imageList as never[]);
  };

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
    >
      {({
        imageList,
        onImageUpload,
        isDragging,
        dragProps,
      }) => (
        <SimpleContainer>
          <ButtonsWrapper
            hasImage={imageList.length > 0}
            customChild={customChild}
          >
            <StyledButton
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              type="button"
              className="imgButton"
              {...dragProps}
            >
              {customChild ? (
                <>
                  { children }
                </>
              ) : (
                <>
                  {imageList.length > 0 ? (
                    images[0].dataURL && (
                      <Image
                        src={images[0].dataURL}
                        width={96}
                        height={96}
                        layout="intrinsic"
                        className="profileUrl"
                      />
                    )
                  ) : (
                    <Image
                      src="https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png"
                      width={96}
                      height={96}
                      layout="intrinsic"
                      className="profileUrl"
                    />
                  )}
                  <FiEdit size={20} />
                </>
              )}
            </StyledButton>
          </ButtonsWrapper>
        </SimpleContainer>
      )}
    </ImageUploading>
  );
};

export default forwardRef(Simple);
