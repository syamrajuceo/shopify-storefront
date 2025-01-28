import { Box } from '@mui/material';
import { FaGlasses, FaRegEye } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

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
        to="/shop/sunGlasses" 
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
          <FaGlasses style={{ marginRight: '8px' }} />
          Sunglass
        </Box>
      </RouterLink>

      <RouterLink
        to="/shop/eyeGlasses"
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
          <FaGlasses style={{ marginRight: '8px' }} />
          Eye Glass
        </Box>
      </RouterLink>

      <RouterLink
        to="/shop/contactLenses" 
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
          <FaRegEye style={{ marginRight: '8px' }} />
          Contact Lens
        </Box>
      </RouterLink>
    </Box>
  );
};

export default CategoryPage;
