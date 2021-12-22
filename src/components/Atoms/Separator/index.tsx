import { Container } from './styles';

interface SeparatorProps {
  type?: 'vertical' | 'horizontal';
  className?: string;
  customHeight?: number;
  customWidth?: number;
  customColor?: string;

}

export const Separator = ({
  type = 'vertical',
  className,
  customHeight,
  customWidth,
  customColor,
}: SeparatorProps): JSX.Element => (
  <Container
    className={className || ''}
    type={type}
    customHeight={customHeight || 100}
    customWidth={customWidth || 100}
    customColor={customColor && customColor}
  />
);
