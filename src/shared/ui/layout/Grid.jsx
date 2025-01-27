// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\ui\layout\Grid.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\ui\layout\Grid.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\ui\layout\Grid.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\ui\layout\Grid.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\ui\layout\Grid.jsx
import React from 'react';

export const Container = ({ children, className = '' }) => {
    return (
        <div className={`container mx-auto px-4 ${className}`}>
            {children}
        </div>
    );
};

export const Grid = ({ children, cols = 1, gap = 'grid', className = '' }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-${gap} ${className}`}>
            {children}
        </div>
    );
};

export const GridItem = ({ children, className = '' }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
}; 