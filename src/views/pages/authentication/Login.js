import { useState, useEffect, useContext, Fragment } from "react";
import classnames from "classnames";
import { FormattedMessage } from "react-intl";
import Avatar from "@components/avatar";
import IntlDropdown from "./../../../@core/layouts/components/navbar/IntlDropdown";
import { useSkin } from "@hooks/useSkin";
import api from "./../../../constants/api";

import Service from "./../../../services/request";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Slide } from "react-toastify";
// import { handleLogin } from '@store/actions/auth'
import { handleLogin } from "@store/actions/auth";
import { AbilityContext } from "@src/utility/context/Can";
import { format } from "react-intl";
import { useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@utils";
import { Coffee } from "react-feather";
import {
  Row,
  Col,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
} from "reactstrap";

import "@styles/base/pages/page-auth.scss";
import { FORMAT_ERROR } from "../../../constants/status";

const ToastContent = ({ name, roleName }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">
          <FormattedMessage id="Welcome" />, {name}
        </h6>
      </div>
    </div>
    {/* <div className="toastify-body">
      <span>to Kiemdinhoto.vn. Now you can start to explore. Enjoy!</span>
    </div> */}
  </Fragment>
);

const Login = (props) => {
  const [skin] = useSkin();

  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const loginOptions = {
    username: {
      required: <FormattedMessage id="The username field is required" />,
      minLength: {
        value: 6,

        message: (
          <FormattedMessage id="Username must be at least 6 characters" />
        ),
      },
      maxLength: {
        value: 30,
        message: <FormattedMessage id="Username must be 30 characters max" />,
      },
    },
    password: {
      required: <FormattedMessage id="The password field is required" />,
    },
  };

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      Service.send({
        method: api.LOGIN_STAFF.method,
        path: api.LOGIN_STAFF.path,
        data,
      })
        .then((result) => {
          if (result) {
            const { statusCode, data } = result;
            if (statusCode === 200) {
              const newData = {
                ...data,
                accessToken: data.token,
                refreshToken: data.token,
              };
              dispatch(handleLogin(newData));

              // history.push(getHomeRouteForLoggedInUser('admin'))
              toast.success(<ToastContent name={newData.username} />, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000,
              });
              setTimeout(() => {
                window.location.href = getHomeRouteForLoggedInUser("admin");
              }, 1500);
            }
          }
        })
        .catch((result) => {
          setDisable(false);
        });
    }
  };
  return (
    <>
      <div className="auth-wrapper auth-v2">
        <Row className="auth-inner m-0">
          <Col
            className="d-none d-lg-flex align-items-center p-5"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={source} alt="Login V2" />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <div className=" ">
                <CardTitle tag="h2" className="font-weight-bold mb-1">
                  <FormattedMessage id="JTS-ADMIN" />! 👋
                </CardTitle>
                <ul className="nav  navbar-nav  d-inline-block align-items-center ml-auto">
                  <IntlDropdown />
                </ul>
              </div>

              <Form
                className="auth-login-form mt-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormGroup>
                  <Label className="form-label" for="login-username">
                    <FormattedMessage id="username" />
                  </Label>
                  <Input
                    autoFocus
                    type="text"
                    id="login-username"
                    name="username"
                    // placeholder={<FormattedMessage id="Email already exists"/>}
                    className={classnames({
                      "is-invalid": errors["username"],
                    })}
                    innerRef={register(loginOptions.username)}
                  />
                  <small className="text-danger">
                    {errors?.username && errors.username.message}
                  </small>
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      <FormattedMessage id="password" />
                    </Label>
                    {/* <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link> */}
                  </div>
                  <InputPasswordToggle
                    id="login-password"
                    name="password"
                    // className='input-group-merge'
                    className={classnames({ "is-invalid": errors["password"] })}
                    innerRef={register(loginOptions.password)}
                  />{" "}
                  <small className="text-danger">
                    {errors?.password && errors.password.message}
                  </small>
                </FormGroup>
                {/* <FormGroup>s
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup> */}
                <Button.Ripple
                  type="submit"
                  style={{ marginLeft: 0 }}
                  color="primary"
                  block
                  disabled={disable}
                >
                  <FormattedMessage id="Sign in" />
                </Button.Ripple>
              </Form>
              {/* <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div>
          */}
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
