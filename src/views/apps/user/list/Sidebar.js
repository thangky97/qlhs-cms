import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classnames from "classnames";

import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";
import validateOptions from "../../../../constants/validate";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { convertFileToBase64, uploadImage } from "../../../../helper/common";
import { useEffect, useState } from "react";
import { add } from "../store/action";
import REGEX from "../../../../constants/regex";
import { BG_BLANK } from "./../../../../constants/app";
import { toast } from "react-toastify";

const SidebarAdd = ({
  open,
  toggleSidebar,
  avatar,
  setAvatar,
  disable,
  setDisable,
}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.staffs);

  const { terms } = useSelector((state) => state.staffs);
  const StaffOptions = validateOptions.StaffOptions;

  const [fileImage, setFileImage] = useState();

  const cate = yup.object({
    code: yup.string().required(<FormattedMessage id="Mã là bắt buộc" />),
    last_name: yup
      .string()
      .required(<FormattedMessage id="The last name field is required" />),
    last_name: yup
      .string()
      .required(<FormattedMessage id="The last name field is required" />),
    first_name: yup
      .string()
      .required(<FormattedMessage id="The first name field is required" />),
    username: yup
      .string()
      .required(<FormattedMessage id="The username field is required" />)
      .min(6, <FormattedMessage id="Username must be at least 6 characters" />)
      .matches(REGEX.USERNAME, <FormattedMessage id="Invalid username" />),
    email: yup
      .string()
      .required(<FormattedMessage id="The email field is required" />)
      .email(<FormattedMessage id="Invalid email" />),
    password: yup
      .string()
      .required(<FormattedMessage id="The password field is required" />)
      .min(8, <FormattedMessage id="Password minimum 8 characters" />),
    phone: yup
      .string()
      .required(<FormattedMessage id="The phone number field is required" />)
      .min(10, <FormattedMessage id="Số điện thoại tối thiểu 10 ký tự" />),
    // curriculumSectionId: yup
    //   .number()
    //   .required(<FormattedMessage id="Vui lòng chọn lớp học" />),
  });

  const { register, errors, control, setError, setValue, handleSubmit } =
    useForm({
      resolver: yupResolver(cate),
      mode: "all",
    });

  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    setDisable(true);

    var urlImage = " ";
    if (avatar) {
      const newData = avatar.replace(/,/gi, "").split("base64");
      if (newData[1]) {
        if (newData[1] == BG_BLANK) {
          toast.error(<FormattedMessage id="Image is required" />);
          setDisable(false);
          return;
        }
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
          add({
            ...values,
            code: values?.code,
            phone: values?.phone || undefined,
            role: "MANAGE_USER",
            status: 1,
            avatar: urlImage,
            // curriculumSectionId: parseInt(values?.curriculumSectionId),
          })
        );
      }
    }
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
          <Label for="code">
            <FormattedMessage id="student_code" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="code"
            id="code"
            placeholder=""
            innerRef={register(StaffOptions.code)}
            onBlur={() => {
              let lastNameEl = document.getElementById("code");

              if (lastNameEl && lastNameEl.value) {
                lastNameEl.value = lastNameEl.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["code"] })}
          />
          <small className="text-danger">
            {errors?.code && errors.code.message}
          </small>
          {errors?.code?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid last name" />
            </small>
          )}
        </FormGroup>

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
          <Input
            type="phone"
            name="phone"
            id="phone"
            placeholder=""
            innerRef={register(StaffOptions.phone)}
            onBlur={() => {
              let phone1 = document.getElementById("phone");

              if (phone1 && phone1.value) {
                phone1.value = phone1.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["phone"] })}
          />
          <small className="text-danger">
            {errors?.phone && errors.phone.message}
          </small>
          {errors?.phone?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid phone number" />
            </small>
          )}
        </FormGroup>

        {/* <FormGroup>
          <Label for="status">
            <FormattedMessage id="status" />{" "}
          </Label>

          <Input
            type="select"
            name="status"
            id="status"
            innerRef={register({ required: true })}
          >
            <option value="2">{intl.formatMessage({ id: "Joined" })}</option>
            <option value="3">
              {intl.formatMessage({ id: "Not yet joined" })}
            </option>
          </Input>
        </FormGroup> */}

        <FormGroup>
          <Label for="Image">
            <FormattedMessage id="Image" />
            <span className="text-danger"> *</span>
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
