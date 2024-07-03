import { Component } from 'react';
import Loading from '../ui/loading/loading';

class MainContent extends Component<Record<string, never>> {
  constructor(props: Record<string, never>) {
    super(props);
  }

  render() {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}

export default MainContent;
