import { isObjEmpty, selectThemeColors } from "@utils";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { isValidPhoneNumber } from "react-phone-number-input";
import { useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Row,
} from "reactstrap";
import validateOptions from "../../../../constants/validate";
import { update } from "../store/action";
const StaffAccountTab = ({ selected, intl }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [status, setStatus] = useState();
  const EditStaffOptions = validateOptions.EditStaffOptions;
  const UserOptions = validateOptions.UserOptions;
  const [disable, setDisable] = useState(false);
  const [defaultValueRole, setDefaultValueRole] = useState([]);
  function hanldeError(params) {
    if (!isValidPhoneNumber(phoneNumber)) {
      setInvalidPhone(true);
    }
  }
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
  const [phoneNumber, setPhoneNumber] = useState();
  const store = useSelector((state) => state.staffs);

  const [staffData, setstaffData] = useState(null);
  const dispatch = useDispatch();

  const [role, setRole] = useState();

  const onChaneRole = (e) => {
    setRole(e?.map((item) => item.value)?.join(";"));
    setDefaultValueRole(e);
  };

  const [invalidPhone, setInvalidPhone] = useState(false);
  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

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

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null && staffData !== null && selected.id !== staffData.id)
    ) {
      setstaffData(selected);
    }
  }, [selected]);
  useEffect(() => {
    if (staffData) {
      setStatus(parseInt(staffData.status));
      if (staffData.phone?.includes("+")) {
        setPhoneNumber(staffData.phone.trim());
      } else {
        setPhoneNumber("+" + staffData.phone.trim());
      }
      const listDefaulRole = [];
      const arrRole = staffData?.role?.split(";");
      roleOptions.map((item) => {
        if (arrRole?.includes(item.value)) {
          listDefaulRole.push(item);
        }
      });
      setDefaultValueRole(listDefaulRole);
      onChaneRole(listDefaulRole);
    }
  }, [staffData]);
  const onSubmit = async (values) => {
    if (invalidPhone) {
      setInvalidPhone(true);
    }
    if (isObjEmpty(errors) && !invalidPhone) {
      setDisable(true);
      dispatch(
        update({
          id: parseInt(selected.id),
          data: {
            status,
            ...values,
            phone: phoneNumber || undefined,
            role: role || " ",
          },
        })
      );
    }
  };
  useEffect(() => {
    if (store.status == 200) {
      history.push("/apps/staff/list");
    }
  }, [store.status]);
  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          <Media className="mt-50" body>
            <h4>{selected.username} </h4>
          </Media>
        </Media>
      </Col>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit, hanldeError)}>
          <FormGroup>
            <Label for="last_name">
              <FormattedMessage id="lastName" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="last_name"
              id="last_name"
              placeholder=" Doe"
              innerRef={register(EditStaffOptions.last_name)}
              onBlur={() => {
                let lastNameEl = document.getElementById("last_name");
                if (lastNameEl && lastNameEl.value) {
                  lastNameEl.value = lastNameEl.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["last_name"] })}
              defaultValue={staffData && staffData.last_name}
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
              placeholder="John "
              innerRef={register(EditStaffOptions.first_name)}
              onBlur={() => {
                let firstNameEl = document.getElementById("first_name");
                if (firstNameEl && firstNameEl.value) {
                  firstNameEl.value = firstNameEl.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["first_name"] })}
              defaultValue={staffData && staffData.first_name}
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
            <Label for="email">
              <FormattedMessage id="Email" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              defaultValue={staffData && staffData.email}
              id="email"
              placeholder="john.doe@example.com"
              innerRef={register(EditStaffOptions.email)}
              onBlur={() => {
                let email1 = document.getElementById("email");
                if (email1 && email1.value) {
                  email1.value = email1.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["email"] })}
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
            </small>
            {errors?.email?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid email" />
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
              defaultValue={staffData && staffData.phone}
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
              value={status}
              onChange={(e) => setStatus(e?.target.value)}
              innerRef={register({ required: true })}
            >
              <option value="1">{intl.formatMessage({ id: "Active" })}</option>
              <option value="0">
                {intl.formatMessage({ id: "Deactive" })}
              </option>

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
              placeholder={<FormattedMessage id="Select..." />}
              isMulti
              value={defaultValueRole}
              name="colors"
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
              <FormattedMessage id="update" />
            </Button>

            <Button
              type="reset"
              color="secondary"
              outline
              onClick={() => history.goBack()}
            >
              <FormattedMessage id="Cancel" />
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default injectIntl(StaffAccountTab);
