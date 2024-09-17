import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";
import validateOptions from "../../../../constants/validate";
import { addUser } from "../store/action";
import { convertFileToBase64, uploadImage } from "../../../../helper/common";

const SidebarNewUsers = ({
  open,
  toggleSidebar,
  avatar,
  setAvatar,
  intl,
  disable,
  phoneNumber,
  setPhoneNumber,
  setDisable,
}) => {
  const [fileImage, setFileImage] = useState();
  const store = useSelector((state) => state.users);

  const [invalidPhone, setInvalidPhone] = useState(false);
  const UserOptions = validateOptions.UserOptions;
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

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
          const res = await uploadImage(data, fileImage).then((res) => {
            urlImage = res?.data;
            if (res) {
              try {
                dispatch(
                  addUser({
                    ...values,
                    avatar: urlImage,
                    phone: phoneNumber || undefined,
                    email: values.email || undefined,
                  })
                );
              } catch (error) {
                console.log(error);
              }
            }
          });
        }
      }
    }
  };
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

  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add New User" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="last_name">
            <FormattedMessage id="lastName" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="last_name"
            id="last_name"
            placeholder=""
            innerRef={register(UserOptions.last_name)}
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
            innerRef={register(UserOptions.first_name)}
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
            innerRef={register(UserOptions.username)}
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
          <Label for="password">
            <FormattedMessage id="password" />{" "}
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
          <Label for="email">
            <FormattedMessage id="Email" />
            <span className="text-danger"></span>
          </Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder=""
            innerRef={register(UserOptions.email)}
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
          {errors?.phone?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid phone number" />,
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="Image">
            <FormattedMessage id="Image" />
          </Label>
          <Row className="align-items-end p-1">
            <Media className="mr-25" left>
              <Media
                object
                className="rounded mr-50"
                src={avatar}
                height="100"
                width="100"
              />
            </Media>{" "}
            <Row className="flex-column px-1">
              <Button.Ripple
                tag={Label}
                className="mt-1"
                outline
                color="primary"
              >
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
            <FormattedMessage id="Save" />
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

export default injectIntl(SidebarNewUsers);
