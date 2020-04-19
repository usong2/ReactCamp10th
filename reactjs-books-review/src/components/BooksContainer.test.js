import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import BooksContainer from "../containers/BooksContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("BooksContainer", () => {
  it("renders properly", () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      books: [],
      loading: false,
      error: null,
    });

    const component = mount(<BooksContainer store={store} />);
    expect(component).toMatchSnapshot();
  });
});
