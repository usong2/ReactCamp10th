import React from "react";

export default function withHasMounted(Component) {
  class WrapperComponent extends React.Component {
    state = {
      hasMounted: false,
    };
    componentDidMount() {
      this.setState({ hasMounted: true });
    }
    render() {
      return <Component {...this.props} hasMounted={this.state.hasMounted} />;
    }
  }

  WrapperComponent.displayName = `withHasMounted(${Component.name})`;

  return WrapperComponent;
}
