import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingContainer({ rating, setRating }) {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        precision={0.5}
        size="large" 
      />
    </Stack>
  );
}
