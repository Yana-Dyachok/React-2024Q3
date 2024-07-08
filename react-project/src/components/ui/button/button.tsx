import React from 'react';
import styles from './btn.module.css';

type ButtonProps = {
  btnType: 'button' | 'submit';
  children: string;
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
};

class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    btnType: 'button',
    disabled: false,
  };

  handleClick = () => {
    const { to, onClick } = this.props;
    if (to) {
      window.location.href = to;
    }
    if (onClick) {
      onClick();
    }
  };

  render() {
    const { btnType, children, disabled } = this.props;
    return (
      <button
        className={styles.btn}
        type={btnType === 'button' ? 'button' : 'submit'}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default Button;
