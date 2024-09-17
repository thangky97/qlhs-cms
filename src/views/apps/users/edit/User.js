import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import avatarBlank from "./../../../../assets/images/avatars/avatar-blank.png";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { isObjEmpty } from "@utils";

import classnames from "classnames";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
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
import { convertFileToBase64, uploadImage } from "../../../../helper/common";
import { updateUser } from "../store/action";

const UserTab = ({ selected, intl }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [staffData, setstaffData] = useState(null);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [avatar, setAvatar] = useState();
  const store = useSelector((state) => state.users);
  const [fileImage, setFileImage] = useState();
  const common = useSelector((state) => state.common);
  const UserOptions = validateOptions.UserOptions;
  const [phoneNumber, setPhoneNumber] = useState();
  const [disable, setDisable] = useState(false);
  const { id } = useParams();
  const EditUserOptions = validateOptions.EditUserOptions;
  const [invalidPhone, setInvalidPhone] = useState(false);

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  const handleOnchangePhone = (e) => {
    setPhoneNumber(e);
    if (e !== undefined) {
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
    } else {
      setInvalidPhone(false);
    }
  };

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null && staffData !== null && selected.id !== staffData.id)
    ) {
      setstaffData(selected.data);
    }
  }, [selected, staffData]);
  useEffect(() => {
    if (staffData) {
      setAvatar(staffData.avatar || avatarBlank);
      setStatus(staffData.status);
      setPhoneNumber(staffData.phone.trim());
    }
  }, [staffData]);
  useEffect(() => {
    if (store.status == 200) {
      history.push("/apps/users/list");
    }
  }, [store.status, history]);

  const onSubmit = async (values) => {
    if (invalidPhone) {
      setInvalidPhone(true);
    }
    if (isObjEmpty(errors) && !invalidPhone) {
      setDisable(true);

      var urlImage = " ";
      if (avatar) {
        const newData = avatar.replace(/,/gi, "").split("base64");
        if (newData[1]) {
          const data = {
            imageData: newData[1],
            imageFormat: fileImage?.type?.split("/")[1] || "png",
          };
          await uploadImage(data, fileImage).then((res) => {
            urlImage = res?.data;
          });
        } else {
          urlImage = avatar;
        }

        if (urlImage) {
          dispatch(
            updateUser({
              id: parseInt(id),
              data: {
                ...values,
                avatar: urlImage,
                phone: phoneNumber || " ",
                email: values.email || "",
                password: staffData?.password || selected?.data?.password,
              },
            })
          );
        }
      }
    }
  };
  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="last_name">
              <FormattedMessage id="lastName" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="last_name"
              id="last_name"
              innerRef={register(EditUserOptions.last_name)}
              onBlur={() => {
                let lastNameEl = document.getElementById("last_name");
                if (lastNameEl && lastNameEl.value) {
                  lastNameEl.value = lastNameEl.value.trim();
                }
              }}
              className={classnames({ "is-invalid": errors["last_name"] })}
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
              innerRef={register(EditUserOptions.first_name)}
              onBlur={() => {
                let firstNameEl = document.getElementById("first_name");
                if (firstNameEl && firstNameEl.value) {
                  firstNameEl.value = firstNameEl.value.trim();
                }
              }}
              className={classnames({ "is-invalid": errors["first_name"] })}
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
              <FormattedMessage id="Email" />
              <span className="text-danger"></span>
            </Label>
            <Input
              type="email"
              name="email"
              defaultValue={staffData && staffData.email}
              id="email"
              innerRef={register(EditUserOptions.email)}
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
          </FormGroup>

          <FormGroup>
            <Label for="phone">
              <FormattedMessage id="phoneNumber" />{" "}
              <span className="text-danger"></span>
            </Label>
            <PhoneInput
              type="text"
              name="phone"
              id="phone"
              defaultValue={staffData && staffData.phone.trim()}
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
              <FormattedMessage id="Status" />
            </Label>

            <Input
              type="select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status"
              defaultValue={staffData && staffData.status}
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
            <Label for="Image">
              <FormattedMessage id="avatar" />
            </Label>
            <Row className="align-items-end p-1">
              <Media className="mr-25" left>
                <Media
                  object
                  className="rounded mr-50 objectFit-contain"
                  src={avatar}
                  height="100"
                  width="100"
                />
              </Media>{" "}
              <Row className="flex-column px-1">
                <Button.Ripple tag={Label} className="mt-1" color="primary">
                  <FormattedMessage id="Upload" />
                  <Input
                    type="file"
                    onChange={(e) => onChange(e)}
                    hidden
                    accept="image/*"
                  />
                </Button.Ripple>
              </Row>
            </Row>
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
export default injectIntl(UserTab);
