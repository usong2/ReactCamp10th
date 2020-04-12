import { connect } from "react-redux";
import Books from "../components/Books";
import axios from "axios";
import {
  startLoading,
  endLoading,
  setError,
  clearError,
  setBooks,
} from "../actions/index";

const mapStateToProps = (state) => ({
  books: state.books,
  loading: state.loading,
  error: state.error,
});

const mapDispatchProps = (dispatch) => ({
  requestBooks: (token) => {
    dispatch(startLoading());
    dispatch(clearError());
    axios
      .get("https://api.marktube.tv/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setBooks(res.data));
        dispatch(endLoading());
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError(error));
        dispatch(endLoading());
      });
  },
});

export default connect(mapStateToProps, mapDispatchProps)(Books);
