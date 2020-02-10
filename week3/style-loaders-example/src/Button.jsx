import React from "react";
// import { test } from "./Button.module.css";
import styles from "./Button.module.scss";
// import classNames from "classnames";
import classNames from "classnames/bind";

/* 
styles = {
    test: 'Button_test__해시',
    active: 'Button_active__해시
    ...
}
*/

const cx = classNames.bind(styles);

console.log(cx);

export default class Button extends React.Component {
  /*
  console.log(classNames("foo", "bar")); // "foo bar"
  console.log(classNames("foo", "bar", "baz")); // "foo bar baz"

  console.log(classNames({ foo: true }, { bar: true })); // "foo bar"
  console.log(classNames({ foo: true }, { bar: false })); // "foo"

  console.log(
    classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")
  ); // "bar 1"
  console.log(classNames(styles.test, styles.active)); // Button_test__3NBUT Button_active__3xsxf
  */

  state = {
    loading: false
  };

  startLoading = () => {
    console.log("start");
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    return (
      <button
        className={cx("button", { loading })}
        {...this.props}
        onClick={this.startLoading}
      >
        자세히 보기
      </button>
    );
  }
}
