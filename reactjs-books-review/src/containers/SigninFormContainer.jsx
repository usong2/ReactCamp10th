import SigninForm from "../components/SigninForm";
import { connect } from "react-redux";
import { login } from "../actions";

const mapStateToPRops = (state) => ({
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => {
    dispatch(login(email, password));
  },
});

export default connect(mapStateToPRops, mapDispatchToProps)(SigninForm);
