import Sidebar from "@components/sidebar";
import { isObjEmpty, selectThemeColors } from "@utils";
import classnames from "classnames";

import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "../../../../constants/validate";

import { useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { add } from "../store/action";
const SidebarAdd = ({
  open,
  toggleSidebar,
  intl,
  disable,
  setDisable,
  phoneNumber,
  setPhoneNumber,
  invalidPhone,
  setInvalidPhone,
}) => {
  const dispatch = useDispatch();
  const UserOptions = validateOptions.UserOptions;
  const store = useSelector((state) => state.staffs);
  const roleOptions = [
    {
      value: "MANAGE_SYSTEM",
      label: <FormattedMessage id={"Management System"} />,
      color: "#FFC400",
      isFixed: false,
    },
    {
      value: "MANAGE_STAFF",
      label: <FormattedMessage id={"Staff"} />,
      color: "#FF5630",
      isFixed: false,
    },
    {
      value: "MANAGE_USER",
      label: <FormattedMessage id={"User"} />,
      color: "#FF8B00",
      isFixed: false,
    },
  ];

  const { register, errors, handleSubmit } = useForm();
  const StaffOptions = validateOptions.StaffOptions;
  const [role, setRole] = useState();

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  const onSubmit = (values) => {
    if (invalidPhone) {
      setInvalidPhone(true);
      return;
    }
    const check = isValidPhoneNumber(phoneNumber);
    if (!check) {
      setInvalidPhone(true);
      return;
    }
    if (isObjEmpty(errors) && !invalidPhone) {
      setDisable(true);
      dispatch(
        add({
          ...values,
          phone: phoneNumber || undefined,
          role: role || " ",
        })
      );
    }
  };

  const onChaneRole = (e) => {
    setRole(e?.map((item) => item.value)?.join(";"));
  };
  useEffect(() => {
    setRole(["MANAGE_STAFF", "MANAGE_SYSTEM"].join(";"));
  }, []);
  const handleOnchangePhone = (e) => {
    setPhoneNumber(e);
    try {
      const check = isValidPhoneNumber(e);
      if (!check) {
        setInvalidPhone(true);
      } else {
        setInvalidPhone(false);
      }
    } catch (error) {
      console.log(error);
      setInvalidPhone(true);
    }
  };

  function hanldeError(params) {
    if (!isValidPhoneNumber(phoneNumber)) {
      setInvalidPhone(true);
    }
  }

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        {<FormattedMessage id="No options" />}
      </components.NoOptionsMessage>
    );
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add New Staff" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit, hanldeError)}>
        <FormGroup>
          <Label for="last_name">
            <FormattedMessage id="lastName" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="last_name"
            id="last_name"
            placeholder=""
            innerRef={register(StaffOptions.last_name)}
            onBlur={() => {
              let lastNameEl = document.getElementById("last_name");

              if (lastNameEl && lastNameEl.value) {
                lastNameEl.value = lastNameEl.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["last_name"] })}
          />
          <small className="text-danger">
            {errors?.last_name && errors.last_name.message}
          </small>
          {errors?.last_name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid last name" />
            </small>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="first_name">
            <FormattedMessage id="firstName" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="first_name"
            id="first_name"
            placeholder=""
            innerRef={register(StaffOptions.first_name)}
            onBlur={() => {
              let firstNameEl = document.getElementById("first_name");

              if (firstNameEl && firstNameEl.value) {
                firstNameEl.value = firstNameEl.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["first_name"] })}
          />
          <small className="text-danger">
            {errors?.first_name && errors.first_name.message}
          </small>
          {errors?.first_name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid first name" />
            </small>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="username">
            <FormattedMessage id="username" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="username"
            id="username"
            placeholder=""
            innerRef={register(StaffOptions.username)}
            onBlur={() => {
              let userNameEl = document.getElementById("username");

              if (userNameEl && userNameEl.value) {
                userNameEl.value = userNameEl.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["username"] })}
          />
          <small className="text-danger">
            {errors?.username && errors.username.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label for="email">
            <FormattedMessage id="Email" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder=""
            innerRef={register(StaffOptions.email)}
            onBlur={() => {
              let email1 = document.getElementById("email");

              if (email1 && email1.value) {
                email1.value = email1.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["email"] })}
          />
          <small className="text-danger">
            {errors?.email && errors.email.message}
          </small>
          {errors?.email?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid email" />
            </small>
          )}
          {/* <FormText color='muted'>You can use letters, numbers & periods</FormText> */}
        </FormGroup>

        <FormGroup>
          <Label for="password">
            <FormattedMessage id="password" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            innerRef={register(StaffOptions.password)}
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
          <Label for="phone">
            <FormattedMessage id="phoneNumber" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <PhoneInput
            type="text"
            name="phone"
            id="phone"
            placeholder=""
            innerRef={register(UserOptions.phone)}
            onBlur={() => {
              let phone1 = document.getElementById("phone");

              if (phone1 && phone1.value) {
                phone1.value = phone1.value.trim();
              }
            }}
            className={invalidPhone && "is-invalid form-control"}
            value={phoneNumber}
            onChange={(e) => {
              handleOnchangePhone(e);
            }}
          />

          <small className="text-danger">
            {invalidPhone && <FormattedMessage id="Invalid phone number" />}
          </small>
        </FormGroup>
        <FormGroup>
          <Label for="status">
            <FormattedMessage id="status" />{" "}
          </Label>

          <Input
            type="select"
            name="status"
            id="status"
            innerRef={register({ required: true })}
          >
            <option value="1">{intl.formatMessage({ id: "Active" })}</option>
            <option value="0">{intl.formatMessage({ id: "Deactive" })}</option>

            <option value="2">{intl.formatMessage({ id: "Blocked" })}</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="role" />
          </Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            defaultValue={[roleOptions[0], roleOptions[1]]}
            isMulti
            components={{ NoOptionsMessage }}
            name="colors"
            placeholder={<FormattedMessage id="Select..." />}
            options={roleOptions}
            className="react-select"
            classNamePrefix="select"
            onChange={(e) => onChaneRole(e)}
          />
        </FormGroup>
        <div style={{ textAlign: "end" }}>
          <Button
            type="submit"
            className="mr-1"
            color="primary"
            disabled={disable}
          >
            <FormattedMessage id="add" />
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={toggleSidebar}
          >
            <FormattedMessage id="Cancel" />
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default injectIntl(SidebarAdd);
