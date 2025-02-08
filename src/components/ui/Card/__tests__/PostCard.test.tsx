import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from '../PostCard';

const mockPost = {
  id: 1,
  title: 'Test Post',
  content: 'Test Content',
  category: 'Test Category',
  created_at: '2024-02-14T00:00:00Z'
};

describe('PostCard', () => {
  it('renders post information correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<PostCard post={mockPost} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Test Post'));
    expect(handleClick).toHaveBeenCalledWith(mockPost);
  });
}); 