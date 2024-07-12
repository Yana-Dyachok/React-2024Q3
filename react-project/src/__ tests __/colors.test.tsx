import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
const TestComponent = () => (
  <div data-testid="test-component">
    Test Component
    <style>
      {`
        :root {
          --c-white: #ffffff;
          --c-red: #c72931;
          --c-gray: #8a8787;
          --c-grey-700: #303a40;
          --c-grey-900: #283035;
          --c-green-900: #354249;
          --c-black: black;
        }
        
        .styled-element {
          color: var(--c-white);
          background-color: var(--c-grey-900);
        }
      `}
    </style>
    <div className="styled-element">Styled Element</div>
  </div>
);

describe('TestComponent', () => {
  it('renders with correct CSS variables', () => {
    const { getByTestId } = render(<TestComponent />);
    const styledElement =
      getByTestId('test-component').querySelector('.styled-element');
    expect(styledElement).toHaveStyle(`
      color: #ffffff;
      background-color: #283035;
    `);
  });
});
