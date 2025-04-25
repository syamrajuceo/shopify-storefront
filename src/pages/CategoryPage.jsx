// import { Box } from '@mui/material';
// import { FaGlasses, FaRegEye } from 'react-icons/fa';
// import { Link as RouterLink } from 'react-router-dom';
// import {
//   EyeglassesIcon,
//   ViewIcon
// } from '@shopify/polaris-icons';

// const CategoryPage = () => {
  
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: '50vh',
//         padding: 2,
//         gap: 2,
//       }}
//     >
//       <RouterLink
//         to="/shop/Sunglasses" 
//         style={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textDecoration: 'none',
//         }}
//       >
//         <Box
//           sx={{
//             width: { xs: '100%', sm: 'auto' }, 
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 2,
//             padding: '12px 24px',
//             fontSize: '16px',
//             backgroundColor: '',
//             boxShadow: 3,
//             '&:hover': {
//               backgroundColor: '#', 
//             },
//             color: 'black',
//           }}
//         >
//           <EyeglassesIcon className='w-9 h-9 mr-[8px]' />
//           Sunglasses
//         </Box>
//       </RouterLink>

//       <RouterLink
//         to="/shop/Eyeglasses"
//         style={{
//           width: '100%', 
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textDecoration: 'none',
//         }}
//       >
//         <Box
//           sx={{
//             width: { xs: '100%', sm: 'auto' },
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 2,
//             padding: '12px 24px',
//             fontSize: '16px',
//             backgroundColor: '',
//             boxShadow: 3,
//             '&:hover': {
//               backgroundColor: '', 
//             },
//             color: 'black',
//           }}
//         >
//           <EyeglassesIcon className='w-9 h-9 mr-[8px]' />
//           Eyeglasses
//         </Box>
//       </RouterLink>

//       <RouterLink
//         to="/shop/ContactLenses" 
//         style={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textDecoration: 'none',
//         }}
//       >
//         <Box
//           sx={{
//             width: { xs: '100%', sm: 'auto' }, 
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 2,
//             padding: '11px 24px',
//             fontSize: '16px',
//             backgroundColor: '',
//             boxShadow: 3,
//             '&:hover': {
//               backgroundColor: '', 
//             },
//             color: 'black',
//           }}
//         >
//           <ViewIcon className='w-9 h-9 mr-[6px]' />
//           Contact Lenses
//         </Box>
//       </RouterLink>

//       {/* 
      
//       remaining cards
      
//       clip-on
//       safety glasses
//       reading glasses
      
//       */}
//     </Box>
//   );
// };

// export default CategoryPage;



import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CategoryGrid from '../components/category/CategoryGrid';
import { categories } from '../data/categoryData';


const CategoryPage = () => {
  // Group categories by type and demographics
  const typeCategories = categories.slice(0, 6); 
  const demographicCategories = categories.slice(6);

  return (
    <Box component="main" sx={{ py: 4, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              mb: 2, 
              color: '#1a1a1a'
            }}
          >
            Shop Eyewear
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ 
              mb: 5, 
              color: '#555',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Discover our premium collection of eyewear for every need and style preference.
            From fashion-forward designs to functional classics, find your perfect match.
          </Typography>
        </motion.div>

        <CategoryGrid title="Shop by Product Type" categories={typeCategories} />
        
        <Box sx={{ my: 6 }}>
          <CategoryGrid title="Shop by Category" categories={demographicCategories} />
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryPage;