import * as yup from "yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormGroup, Row, Col, Button, Label } from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
import { FormattedMessage } from "react-intl";
import { toast, Slide } from "react-toastify";
import api from "../../../constants/api";
import Service from "./../../../services/request";
import { isObjEmpty } from "@utils";
import validateOptions from "../../../constants/validate";

const PasswordTabContent = () => {
  const changePasswordOptions = {
    
    password: {
      required: <FormattedMessage id="The password field is required" />,
      
    },
    newPassword: {
      required: <FormattedMessage id="The password field is required" />,
      
    },
    confirmPassword: {
      required: (
        <FormattedMessage id="The confirm password field is required" />
        
      ),
     
    },
  };
  const { register, errors, handleSubmit, trigger } = useForm();
  const onSubmit = (values) =>{
    if (values?.newPassword!=values?.confirmPassword) {
      toast.error(<FormattedMessage id={"confirm password does not match"}/>)
      return
    }
    if (isObjEmpty(errors)) {
      Service.send({ method: api.CHANGE_PASSWORD_STAFF.method, path: api.CHANGE_PASSWORD_STAFF.path, data:{
        password:values.password,
        newPassword:values.confirmPassword
      } }).then(result => {
        if (result) {
          const { statusCode, data } = result
          if (statusCode === 200) {
            toast.success(
              <FormattedMessage id="Change password successfully"/>
            )
            setTimeout(() => {
              localStorage.clear()
              window.location.href="/"
            }, 2000);
          }
        }
      })
 
 
    }
  }
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label className="form-label" for="password">
              <FormattedMessage id="Old Password" />
            </Label>
            <InputPasswordToggle
              id="password"
              name="password"
              innerRef={register(changePasswordOptions.password)}
              className={classnames({
                "is-invalid": errors["password"],
              })}
            />
            <small className="text-danger">
              {errors?.password && errors.password.message}
            </small>
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="form-label" for="newPassword">
              <FormattedMessage id="New Password" />
            </Label>
            <InputPasswordToggle
              autoFocus
              id="newPassword"
              // label='New Password'
              // htmlFor='new-password'
              name="newPassword"
              innerRef={register(changePasswordOptions.newPassword)}
              className={classnames({
                "is-invalid": errors["newPassword"],
              })}
            />
            <small className="text-danger">
              {errors?.newPassword && errors.newPassword.message}
            </small>
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="form-label" for="confirmPassword">
              <FormattedMessage id="Retype New Password" />
            </Label>
            <InputPasswordToggle
              id="confirmPassword"
              name="confirmPassword"
              innerRef={register(changePasswordOptions.confirmPassword)}
              className={classnames({
                "is-invalid": errors["confirmPassword"],
              })}
            />
            <small className="text-danger">
              {errors?.confirmPassword && errors.confirmPassword.message}
            </small>
          </FormGroup>
        </Col>
        <Col className="mt-1" sm="12">
          <Button.Ripple type="submit" className="mr-1" color="primary">
            <FormattedMessage id ="update"/>
          </Button.Ripple>
          {/* <Button.Ripple color="secondary" outline>
            <FormattedMessage id = "Cancel"/>
          </Button.Ripple> */}
        </Col>
      </Row>
    </Form>
  );
};

export default PasswordTabContent;
