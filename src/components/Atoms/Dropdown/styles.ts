import styled, { css } from 'styled-components';

interface DropdownHeaderActionProps {
  open?: boolean;
  hasValue?: boolean;
  textColor?: string;
  arrowColor?: string;
  customFontSize?: number;
}

interface DropdownHeaderProps {
  isLoading: boolean;
  backgroundColor?: string;
  customRadius?: number;
  customHeight?: number;
  customWidth?: number;
  customFontSize?: number;
}

interface DropdownWrapperProps {
  customWidth?: number;
  customHeight?: number;
}

interface DropDownItemListProps {
  size: string;
  customFontSize?: number;
}

export const DropdownWrapper = styled.div<DropdownWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 30px;
  flex-wrap: wrap;

  font-family: 'Raleway';

  width: ${(props) => props.customWidth && `${props.customWidth}%`};
  height: ${(props) => props.customHeight && `${props.customHeight}rem`};
`;

export const DropdownHeader = styled.div<DropdownHeaderProps>`
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'transparent')};
  border-radius: 4px;
  border-radius: ${(props) => (props.customRadius ? `${props.customRadius}px` : '4px')};

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.customWidth && `${props.customWidth}%`};
  height: ${(props) => props.customHeight && `${props.customHeight}rem`};
  padding: 0 8px;

  border: solid 0.6px inherit;

  transition: border-color 0.4s, box-shadow 0.4s;

  ${(props) => props.customHeight
    && css`
      padding: 16px;
    `};

  ${(props) => props.isLoading
    && css`
      pointer-events: none;
      opacity: 0.4;
    `}

  ${(props) => !props.isLoading
    && css`
      &:hover {
        cursor: pointer;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
      }
    `}
`;

export const DropdownHeaderTitle = styled.div<DropdownHeaderActionProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-right: 12px;

    ${(props) => (props.customFontSize
    ? css`
            font-size: ${props.customFontSize}px;
          `
    : css`
            font-size: 14px;
          `)}
    font-weight: bold;

    ${(props) => props.hasValue
      && css`
        color: ${props.textColor ? props.textColor : 'var(--white)'};
        opacity: 1;
      `};

    ${(props) => !props.hasValue
      && css`
        color: var(--white);
        opacity: 0.5;
      `};
  }
`;

export const DropdownHeaderAction = styled.div<DropdownHeaderActionProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  .chevron {
    transition: 0.4s;
    color: ${(props) => (props.arrowColor ? props.arrowColor : 'var(--white)')};
  }

  ${(props) => props.open
    && css`
      .chevron {
        transform: rotate(-180deg);
      }
    `}
`;

export const ItemsList = styled.ul<DropDownItemListProps>`
  position: absolute;
  z-index: 999;
  overflow-y: auto;

  ${(props) => props.size === 'small'
    && css`
      max-height: 340px;
    `}

  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
  padding: 0;
  margin: 0;
  left: 0;
  width: 100%;
  min-width: 180px;
  margin-top: 30px;

  scrollbar-width: thin !important;

  &::-webkit-scrollbar {
    height: 8px !important;
    display: unset;
    width: 4px !important;
    /* max-width: 10px !important; */
  }
  &::-webkit-scrollbar-track {
    background: var(--gray-800) !important;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--purple-150);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #161a21 !important;
    width: 1px !important;
  }

  li {
    list-style-type: none;
    z-index: 1000;
    ${(props) => (props.customFontSize
    ? css`
            font-size: ${props.customFontSize};
          `
    : css`
            font-size: 14px;
          `)}

    &:first-of-type {
      > button {
        border-top: 1px solid var(--gray-150);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }

    &:last-of-type > button {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    button {
      display: flex;
      justify-content: space-between;
      background-color: white;
      ${(props) => (props.customFontSize
    ? css`
              font-size: ${props.customFontSize}px;
            `
    : css`
              font-size: 14px;
            `)}
      padding: 15px 20px 15px 20px;
      border: 0;
      border-bottom: 1px solid var(--gray-150);
      width: 100%;
      text-align: left;
      border-left: 1px solid var(--gray-150);
      border-right: 1px solid var(--gray-150);

      transition: background-color 0.4s;

      span{
        color: var(--black);
      }

      &:hover,
      &:focus {
        cursor: pointer;
        font-weight: bold;
        background-color: var(--gray-150);
      }
    }
  }
`;

export const SelectedItems = styled.p`
  background: rgba(0, 0, 0, 0.2);
  height: 20px;

  padding: 0 8px;

  border-radius: 4px;
`;
