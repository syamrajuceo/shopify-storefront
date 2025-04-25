import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  const { name, image, path, description } = category;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <RouterLink
        to={path}
        style={{
          textDecoration: 'none',
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 280,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            backgroundColor: '#fff',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 16px 32px rgba(0,0,0,0.16)',
              '& .category-overlay': {
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)',
              }
            }
          }}
        >
          <Box
            component="img"
            src={image}
            alt={name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.6s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          
          <Box
            className="category-overlay"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 3,
              transition: 'all 0.3s ease',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: '#fff',
                fontWeight: 600,
                marginBottom: 0.5,
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              {name}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '90%'
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </RouterLink>
    </motion.div>
  );
};

export default CategoryCard;