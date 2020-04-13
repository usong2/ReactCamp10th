import { connect } from "react-redux";
import Books from "../components/Books";
import { setBooksThunk, setBooksPromise } from "../actions";

const mapStateToProps = (state) => ({
  books: state.books,
  loading: state.loading,
  error: state.error,
});

const mapDispatchProps = (dispatch) => ({
  requestBooksThunk: (token) => {
    dispatch(setBooksThunk(token));
  },

  requestBooksPromise: (token) => {
    dispatch(setBooksPromise(token));
  },
});

export default connect(mapStateToProps, mapDispatchProps)(Books);
