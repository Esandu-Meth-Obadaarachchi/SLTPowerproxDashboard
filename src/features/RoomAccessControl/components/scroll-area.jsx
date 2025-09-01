// src/components/ui/scroll-area.jsx
import React from 'react';

export const ScrollArea = ({ children, className = '' }) => (
  <div className={`scroll-area ${className}`} style={{ overflowY: 'auto', maxHeight: '300px' }}>
    {children}
  </div>
);
