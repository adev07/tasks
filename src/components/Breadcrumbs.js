// src/components/Breadcrumbs.js
import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  const navigate = useNavigate();

  return (
    <MuiBreadcrumbs style={{fontFamily: "'Neutra Text Alt', sans-serif",}} aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (
            <Link 
              color="inherit" 
              onClick={() => navigate(item.link)}
              sx={{ 
                position: 'relative',
                display: 'inline-block',
                padding: '0 4px', // Padding for spacing
                textDecoration: 'none', // Remove underline
                ...(index === 1 && { // Apply highlight to the second item
                  '& .highlight': {
                    backgroundColor: '#fdc936',
                    padding: '0 4px',
                    borderRadius: '3px',
                  },
                }),
              }}
            >
              <span style={{color:"#322625"}} className={index === 1 ? 'highlight' : ''}>
                {item.label}
              </span>
            </Link>
          ) : (
            <span 
              style={{ 
                position: 'relative',
                display: 'inline-block',
                padding: '0 4px', // Padding for spacing
                textDecoration: 'none', // Remove underline
                ...(index === 1 && {
                  backgroundColor: '#fdc936',
                  padding: '0 4px',
                  borderRadius: '3px',
                }),
              }}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </MuiBreadcrumbs>
  );
}; 

export default Breadcrumbs;
