import {
  useRef, forwardRef, ForwardRefRenderFunction, useImperativeHandle, ReactNode,
} from 'react';

import { ImageListType } from 'react-images-uploading';

import Multiple, { MultipleHandles } from './multiple';
import Simple, { SimpleHandles } from './simple';

type SetImgsFn = (imgs: string[]) => void;
type SetImgFn = (img: string) => void;

type ChildProps =
  | {
    customChild: true;
    children: ReactNode | (Element & ReactNode);
  }
  | {
    customChild: false;
  }

type ImageUploadProps = ChildProps &
{
  type: 'simple';
  customChild?: boolean;
  setImg: SetImgFn;
  setImgs?: never;
} | {
  type: 'multiple';
  customChild?: boolean;
  setImg?: never;
  setImgs: SetImgsFn;
}

export type ImageUploadHanldes = {
  reset: () => void;
  images: ImageListType | undefined;
}

const ImageUpload: ForwardRefRenderFunction<ImageUploadHanldes, ImageUploadProps> = ({
  type,
  setImgs,
  setImg,
  children,
  customChild = false,
}, ref) => {
  const multipleInputRef = useRef<MultipleHandles>(null);
  const simpleInputRef = useRef<SimpleHandles>(null);

  const reset = (): void => {
    multipleInputRef.current?.handleClearImgs();
    simpleInputRef.current?.handleClearImgs();
  };

  useImperativeHandle(ref, () => ({
    reset,
    images: simpleInputRef.current?.images,
  }));

  return (
    type !== 'simple' ? (
      <>
        {setImgs && (
          <Multiple
            setImgs={setImgs}
            ref={multipleInputRef}
            customChild={customChild}
          >
            {customChild && children}
          </Multiple>
        )}
      </>
    ) : (
      <>
        {setImg && (
          <Simple
            setImg={setImg}
            ref={simpleInputRef}
            customChild={customChild}
          >
            {customChild && children}
          </Simple>
        )}
      </>
    )
  );
};

export default forwardRef(ImageUpload);
