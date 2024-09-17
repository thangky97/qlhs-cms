import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "../../../../constants/validate";
import { updatePasswordUser } from "../store/action";

const SidebarUserPassword = ({
  open,
  toggleSidebarPassword,
  disablePassword,
  setDisablePassword,
  idPassword,
}) => {
  const { register, errors, handleSubmit, watch } = useForm();
  const UserOptions = validateOptions.UserOptions;

  UserOptions.confirm_password = {
    required: <FormattedMessage id="The password field is required" />,
    minLength: {
      value: 8,
      message: <FormattedMessage id="Password minimum 8 characters" />,
    },
    validate: (val) => {
      if (watch("password") != val) {
        return "";
      }
    },
  };
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisablePassword(true);
      if (values?.password && idPassword) {
        dispatch(
          updatePasswordUser({
            id: parseInt(idPassword),
            password: values?.password,
          })
        );
      }
    }
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Re-issue password" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => toggleSidebarPassword(null)}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="password">
            <FormattedMessage id="New Password" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            innerRef={register(UserOptions.password)}
            onBlur={() => {
              let pass = document.getElementById("password");
              if (pass && pass.value) {
                pass.value = pass.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["password"] })}
          />
          <small className="text-danger">
            {errors?.password && errors.password.message}
          </small>
          {errors?.password?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid password" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="confirm_password">
            <FormattedMessage id="Retype New Password" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            type="password"
            name="confirm_password"
            id="confirm_password"
            innerRef={register(UserOptions.confirm_password)}
            onBlur={() => {
              let pass = document.getElementById("confirm_password");
              if (pass && pass.value) {
                pass.value = pass.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["confirm_password"] })}
          />
          <small className="text-danger">
            {errors?.confirm_password && errors.confirm_password.message}
          </small>
          {errors?.confirm_password?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="confirm password does not match" />
            </small>
          )}
        </FormGroup>

        <div style={{ textAlign: "end" }}>
          <Button
            type="submit"
            className="mr-1"
            color="primary"
            disabled={disablePassword}
          >
            <FormattedMessage id="Save" />
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={() => toggleSidebarPassword(null)}
          >
            <FormattedMessage id="Cancel" />
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default injectIntl(SidebarUserPassword);
