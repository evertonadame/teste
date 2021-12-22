import {
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  ReactNode,
} from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from 'next/image';

import Compress from 'browser-image-compression';
import { MdDelete } from 'react-icons/md';
import {
  MultipleContainer,
  ButtonsWrapper,
  StyledButton,
  StyledButtonSemFoto,
} from './styles';

type ImageUploadProps = {
  setImgs(imgs: string[]): void;
  children?: ReactNode | (Element & ReactNode);
  customChild: boolean;
};

export type MultipleHandles = {
  handleClearImgs: () => void;
};

const Multiple: ForwardRefRenderFunction<MultipleHandles, ImageUploadProps> = (
  { setImgs },
  ref,
) => {
  const [images, setImages] = useState<ImageListType>([]);

  const handleClearImgs = (): void => {
    setImages([]);
  };

  useImperativeHandle(ref, () => ({
    handleClearImgs,
  }));

  const getBase64 = (file: File, options: any): any =>
    new Promise((resolve, reject) => {
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

  const onChange = (imageList: ImageListType): void => {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
    };

    if (imageList.length > 0 && imageList[0].file) {
      getBase64(imageList[0].file, options).then((result: string) => {
        const [, formatedBase64Url] = result.split('base64,');

        setImgs([formatedBase64Url]);
      });
    }
    setImages(imageList as never[]);
  };

  return (
    <ImageUploading value={images} onChange={onChange}>
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        isDragging,
        dragProps,
      }) => (
        <MultipleContainer>
          <ButtonsWrapper hasImage={imageList.length > 0}>
            <StyledButton
              style={isDragging ? { color: 'red' } : undefined}
              onClick={() => {
                onImageUpload();
              }}
              type="button"
              className={imageList.length > 0 ? 'photo' : ''}
              {...dragProps}
            >
              <MdDelete
              style={{color: 'var(--aqua)'}}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageRemoveAll();
                }}
                className={imageList.length > 0 ? 'delete-button' : 'delete-button-false'}
              />

              {images.length > 0 ? (
                images.map((img) => (
                  <Image
                    src={img.dataURL ?? ''}
                    className={img.dataURL ? 'tem-foto' : ''}
                    width={250}
                    height={250}
                    layout="intrinsic"
                    key={img.file?.name}
                    alt={img.file?.name}
                  />
                ))
              ) : (
                <>
                  <StyledButtonSemFoto type="button">
                    <p style={{ marginRight: '0.5rem', marginTop: '1rem' }}>
                      ANEXAR IMAGEM
                    </p>
                    <Image
                      src="/assets/svgs/foto.svg"
                      width={20}
                      height={20}
                      layout="fixed"
                      objectFit="contain"
                      className="icon"
                    />
                  </StyledButtonSemFoto>
                </>
              )}
            </StyledButton>
          </ButtonsWrapper>
        </MultipleContainer>
      )}
    </ImageUploading>
  );
};

export default forwardRef(Multiple);
