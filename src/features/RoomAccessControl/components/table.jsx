// src/components/ui/table.jsx
import React from 'react';

export const Table = ({ children, className = '' }) => (
  <table className={`table ${className}`}>
    {children}
  </table>
);
