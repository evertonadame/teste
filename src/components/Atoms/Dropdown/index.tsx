import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { FaChevronDown, FaRegDotCircle } from 'react-icons/fa';

import { Loading } from 'components/Atoms/Loading';

import {
  DropdownWrapper,
  DropdownHeader,
  DropdownHeaderTitle,
  DropdownHeaderAction,
  ItemsList,
  SelectedItems,
} from './styles';

interface Item {
  key: string;
  value: string;
}

interface DropdownProps {
  title: string;
  items: Array<Item>;
  multiSelect?: boolean;
  textColor?: string;
  arrowColor?: string;
  backgroundCollor?: string;
  customRadius?: number;
  defaultValue?: Item;
  customHeight?: number;
  customWidth?: number;
  isLoading?: boolean;
  placeholder?: boolean;
  size?: string;
  customFontSize?: number;
  onChange?(item: Item | Array<Item>): void;
}

export const Dropdown = ({
  title,
  items = [],
  multiSelect = false,
  textColor,
  arrowColor,
  backgroundCollor,
  customRadius,
  customHeight,
  customWidth,
  defaultValue,
  placeholder = false,
  isLoading = false,
  size = '',
  customFontSize,
  onChange = () => console.log('default'),
}:DropdownProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<Item[]>([{ key: '', value: '' }]);

  const firstSelectedItem = useMemo<Item>(() => {
    if (defaultValue && selection[0] && selection[0].key === '') {
      return defaultValue;
    }
    return { key: '', value: '' };
  }, [defaultValue, selection]);

  const dropdownContentWrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownContentWrapperRef.current
      && !dropdownContentWrapperRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleOnClick = useCallback(
    (item: Item) => {
      if (!selection.some((current) => current.key === item.key)) {
        if (!multiSelect) {
          setSelection([item]);
          onChange(item);
        } else {
          setSelection([...selection, item]);
          onChange([...selection, item]);
        }
      } else {
        let selectionAfterRemoval = selection;
        selectionAfterRemoval = selectionAfterRemoval.filter(
          (current) => current.key !== item.key,
        );
        setSelection([...selectionAfterRemoval]);
        onChange(selectionAfterRemoval);
      }
      setOpen(false);
    },
    [multiSelect, selection, onChange],
  );

  const isItemSelected = useCallback(
    (item: Item) => selection.find((current) => current.key === item.key),
    [selection],
  );

  useEffect(() => {
    if (
      defaultValue
      && firstSelectedItem.key !== ''
      && firstSelectedItem.key !== selection[0].key
    ) {
      setSelection([firstSelectedItem]);
      onChange(firstSelectedItem);
    }
  }, [firstSelectedItem, onChange, selection, defaultValue, placeholder]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownWrapper
      ref={dropdownContentWrapperRef}
      className="helper"
      customWidth={customWidth && customWidth}
      customHeight={customHeight && customHeight}
    >
      <DropdownHeader
        tabIndex={0}
        role="button"
        onKeyPress={() => setOpen(!open)}
        onClick={() => setOpen(!open)}
        isLoading={isLoading}
        backgroundColor={backgroundCollor && backgroundCollor}
        customHeight={customHeight && customHeight}
        customWidth={customWidth && customWidth}
        customRadius={customRadius && customRadius}
        customFontSize={customFontSize && customFontSize}
      >
        <DropdownHeaderTitle
          customFontSize={customFontSize && customFontSize}
          hasValue={selection.length > 0 && selection[0].key !== ''}
          textColor={textColor || 'rbga(255,255,255,0.4)'}
        >
          {!isLoading && !multiSelect && (
            <>
              <p>
                {selection.length > 0 && selection[0].key !== ''
                  ? selection[0].value
                  : `${title}`}
              </p>
            </>
          )}
          {!isLoading
            && multiSelect
            && (selection.length > 0 ? (
              selection.map((item) => (
                <SelectedItems key={item.key}>{item.value}</SelectedItems>
              ))
            ) : (
              <p>{title}</p>
            ))}
          {isLoading && !multiSelect && (
            <div>
              <Loading size={1} />
            </div>
          )}
        </DropdownHeaderTitle>
        <DropdownHeaderAction open={open} arrowColor={arrowColor}>
          <FaChevronDown className="chevron" size={18} />
        </DropdownHeaderAction>
      </DropdownHeader>
      {open && (
        <ItemsList size={size}>
          {items.map((item) => (
            <li key={`${item.key}-${item.value}`}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span className="dropdown-item">{item.value}</span>
                <span>
                  {isItemSelected(item) && <FaRegDotCircle size={10} />}
                </span>
              </button>
            </li>
          ))}
        </ItemsList>
      )}
    </DropdownWrapper>
  );
};
