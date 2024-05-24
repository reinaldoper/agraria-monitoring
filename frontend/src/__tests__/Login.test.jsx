import LogiIn from '../pages/LogiIn';
import { render, screen } from '@testing-library/react';


describe('Login', () => {
  it('should render the login component', () => {
    render(<LogiIn />);

    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();

    const loginSenha = screen.getByPlaceholderText(/senha/i)

    expect(loginSenha).toBeInTheDocument();
  });
});