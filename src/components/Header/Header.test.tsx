import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <ThemeProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );
  };
  beforeEach(() => {
    // Clear any previous renders
    vi.clearAllMocks();
  });

  it('renders the NoteHub logo', () => {
    renderHeader();
    expect(screen.getByText(/NoteHub/i)).toBeInTheDocument();
  });
  it('renders desktop navigation menu items correctly', () => {
    renderHeader();

    // Check if all menu items are present in desktop view
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/New note/i)).toBeInTheDocument();

    // Verify ThemeToggle is rendered
    // Use the aria-label to find the ThemeToggle
    const themeToggle = screen.getByLabelText(/Toggle theme/i);
    expect(themeToggle).toBeInTheDocument();
  });
});
