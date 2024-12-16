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
        height: '100vh',
        padding: 2,
        gap: 2,
      }}
    >
      <RouterLink
        to="/sunglasses" 
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
            backgroundColor: '#1d4ed8',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#1d4ed8', 
            },
            color: 'white',
          }}
        >
          <FaGlasses style={{ marginRight: '8px' }} />
          Sunglass
        </Box>
      </RouterLink>

      <RouterLink
        to="/eyeglasses"
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
            backgroundColor: '#16a34a',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#16a34a', 
            },
            color: 'white',
          }}
        >
          <FaGlasses style={{ marginRight: '8px' }} />
          Eye Glass
        </Box>
      </RouterLink>

      <RouterLink
        to="/contactLenses" 
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
            backgroundColor: '#9333ea',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#9333ea', 
            },
            color: 'white',
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
