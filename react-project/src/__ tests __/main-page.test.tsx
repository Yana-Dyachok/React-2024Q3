// import '@testing-library/jest-dom';
// import MainPage from '../pages/main-page/main-page';
// import { render, screen } from '@testing-library/react';
// import { ReactNode } from 'react';

// jest.mock('../components/header/header', () => () => (
//   <div>Header Component</div>
// ));
// jest.mock('../components/main-content/main-content', () => () => (
//   <div>Main Content Component</div>
// ));

// type ErrorBoundaryProps = {
//   children: ReactNode;
// };

// jest.mock('../components/error-boundary/error-boundary', () => {
//   return ({ children }: ErrorBoundaryProps) => <div>{children}</div>;
// });

// describe('MainPage', () => {
//   it('should render Header and MainContent components inside ErrorBoundary', () => {
//     render(<MainPage />);
//     expect(screen.getByText('Header Component')).toBeInTheDocument();
//     expect(screen.getByText('Main Content Component')).toBeInTheDocument();
//   });
// });
