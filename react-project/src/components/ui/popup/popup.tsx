import React from 'react';
import styles from './popup.module.css';

interface PopUpProps {
  text: string;
  duration?: number;
}

interface PopUpState {
  isVisible: boolean;
}

class PopUp extends React.Component<PopUpProps, PopUpState> {
  static defaultProps = {
    duration: 15000,
  };

  timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(props: PopUpProps) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  componentDidMount() {
    const { duration } = this.props;
    if (duration) {
      this.timeoutId = setTimeout(() => {
        this.setState({ isVisible: false });
      }, duration);
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { text } = this.props;
    const { isVisible } = this.state;

    if (!isVisible) return null;

    return (
      <div className={styles.popup}>
        <div className={styles.popupBody}>
          <div className={styles.popupContent}>
            <p className={styles.popupText}>{text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp;
