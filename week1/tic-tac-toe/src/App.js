import React from 'react';
import './App.css';

// class App extends React.Component {
//   _interval;

//   constructor(props) {
//     console.log('App constructor');
//     super(props);
//     this.state = {
//       age: 37,
//     };
//   }

//   // componentWillMount() {
//   //   console.log('App componentWillMount');
//   // }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     console.log(nextProps, prevState);
//     if (prevState.age !== nextProps.age) {
//       return { age: nextProps.age };
//     }

//     return null;
//   }

//   componentDidMount() {
//     console.log('App componentDidMount');
//     this._interval = window.setInterval(() => {
//       this.setState({
//         age: this.state.age + 1,
//       });
//     }, 1000);
//   }

//   componentWillUnmount() {
//     console.log('App componentWillUnmount');
//     clearInterval(this._interval);
//   }

//   // componentWillReceiveProps(nextProps) {
//   //   console.log(
//   //     `App componentWillReceiveProps : ${JSON.stringify(nextProps)}`,
//   //   );
//   // }

//   shouldComponentUpdate(nextProps, nextState): boolean {
//     console.log(
//       `App shouldComponentUpdate : ${JSON.stringify(
//         nextProps,
//       )}, ${JSON.stringify(nextState)}`,
//     );
//     if (nextState.age > 39) {
//       return false;
//     }
//     return true;
//   }

//   componentWillUpdate(nextProps, nextState) {
//     console.log(
//       `App componentWillUpdate : ${JSON.stringify(
//         nextProps,
//       )}, ${JSON.stringify(nextState)}`,
//     );
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log(
//       `App componentDidUpdate : ${JSON.stringify(
//         prevProps,
//       )}, ${JSON.stringify(prevState)}`,
//     );
//   }
  
//   render() {
//     console.log('App render');
//     return (
//       <div>
//         <h2>
//           Hello {this.props.name} - {this.state.age}
//         </h2>
//       </div>
//     );
//   }
// }

class Button extends React.Component {
  render() {
    test();
    return <div>hello</div>;
  }
}

class App extends React.Component {
  state = {
    hasError: false,
  };

  // componentDidCatch(error, info) {
  //   // Display fallback UI
  //   this.setState({ hasError: true });
  //   // You can also log the error to an error reporting service
  //   // logErrorToMyService(error, info);
  // }

  render() {
    if (this.state.hasError) {
      return <div>에러 화면</div>;
    }
    return (
      <div>
        <Button />
      </div>
    );
  }
}


export default App;
