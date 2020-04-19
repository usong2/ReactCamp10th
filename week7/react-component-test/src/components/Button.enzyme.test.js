import React from "react";
import Button from "./Button";
import { act } from "react-dom/test-utils";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe("Button 컴포넌트 (@testing-library/react)", () => {
  it("컴포넌트가 정상적으로 생성된다.", async () => {
    shallow(<Button />);
  });

  it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
    const wrapper = shallow(<Button />);
    const button = wrapper.find("button");
    expect(button.text()).toBe("button");
  });

  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다`, () => {
    // Given
    const wrapper = shallow(<Button />);

    // When
    const button = wrapper.find("button");
    button.simulate("click");

    // Then
    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 방금 눌렸다.");
  });

  it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    // Given
    const wrapper = shallow(<Button />);

    // Then
    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 눌리지 않았다.");
  });

  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    // Given
    const wrapper = shallow(<Button />);
    const button = wrapper.find("button");
    act(() => {
      button.simulate("click");
    });

    // When
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 눌리지 않았다.");
  });

  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    const wrapper = shallow(<Button />);

    act(() => {
      const button = wrapper.find("button");
      button.simulate("click");
    });

    expect(wrapper.find("button").prop("disabled")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(wrapper.find("button").prop("disabled")).toBeFalsy();
  });
});
