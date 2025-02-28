import { Box } from '@mui/material';
import { FaGlasses, FaRegEye } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import {
  EyeglassesIcon,
  ViewIcon
} from '@shopify/polaris-icons';

const CategoryPage = () => {
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50vh',
        padding: 2,
        gap: 2,
      }}
    >
      <RouterLink
        to="/shop/Sunglasses" 
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 'auto' }, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#', 
            },
            color: 'black',
          }}
        >
          <EyeglassesIcon className='w-9 h-9 mr-[8px]' />
          Sunglasses
        </Box>
      </RouterLink>

      <RouterLink
        to="/shop/Eyeglasses"
        style={{
          width: '100%', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 'auto' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '', 
            },
            color: 'black',
          }}
        >
          <EyeglassesIcon className='w-9 h-9 mr-[8px]' />
          Eyeglasses
        </Box>
      </RouterLink>

      <RouterLink
        to="/shop/ContactLenses" 
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 'auto' }, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            padding: '11px 24px',
            fontSize: '16px',
            backgroundColor: '',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '', 
            },
            color: 'black',
          }}
        >
          <ViewIcon className='w-9 h-9 mr-[6px]' />
          Contact Lenses
        </Box>
      </RouterLink>
    </Box>
  );
};

export default CategoryPage;
