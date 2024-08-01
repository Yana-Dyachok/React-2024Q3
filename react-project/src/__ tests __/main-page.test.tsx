// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { ReactNode } from 'react';

// const MockHeader = () => <div>Header Component</div>;
// MockHeader.displayName = 'MockHeader';
// jest.mock('../components/header/header', () => MockHeader);

// const MockMainContent = () => <div>Main Content Component</div>;
// MockMainContent.displayName = 'MockMainContent';
// jest.mock('../components/main-content/main-content', () => MockMainContent);

// type ErrorBoundaryProps = {
//   children: ReactNode;
// };

// const MockErrorBoundary = ({ children }: ErrorBoundaryProps) => (
//   <div>{children}</div>
// );
// MockErrorBoundary.displayName = 'MockErrorBoundary';
// jest.mock(
//   '../components/error-boundary/error-boundary',
//   () => MockErrorBoundary,
// );

// import MainPage from '../pages';
// describe('MainPage', () => {
//   it('should render Header and MainContent components inside ErrorBoundary', () => {
//     render(<MainPage />);
//     expect(screen.getByText('Header Component')).toBeInTheDocument();
//     expect(screen.getByText('Main Content Component')).toBeInTheDocument();
//   });
// });
