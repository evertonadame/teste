/* eslint-disable react/no-array-index-key */
import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

import { Container } from './styles';

type RatingProps = {
  ratingNote: number;
  isLoading?: boolean;
  starsSize?: number;
  onChange(value: number): void;
}

export const Rating = ({
  ratingNote,
  isLoading = false,
  starsSize,
  onChange,
}: RatingProps): JSX.Element => {
  const handleChangePoints = (index: number): void => {
    onChange(index + 1);
  };

  return (
    <Container isLoading={isLoading}>
      {Array.from({ length: 5 }).map((i, index) => {
        if (ratingNote > index) {
          return <FaStar key={`${i}-${index}-rating`} onClick={() => handleChangePoints(index)} size={starsSize || 32} />;
        }
        return <FiStar key={`${i}-${index}-rating`} onClick={() => handleChangePoints(index)} size={starsSize || 32} />;
      })}
    </Container>
  );
};
