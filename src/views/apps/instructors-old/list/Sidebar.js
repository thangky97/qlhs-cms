import Sidebar from "@components/sidebar";
import classnames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";
import validateOptions from "@constants/validate";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { getDataUser } from "../store/action";
import { convertFileToBase64, uploadImage } from "@helper/common";
import { add } from "../store/action";

const SidebarNewInstructors = ({
  open,
  toggleSidebar,
  disable,
  setDisable,
  avatar,
  setAvatar,
  phoneNumber,
  setPhoneNumber,
  invalidPhone,
  setInvalidPhone,
}) => {
  const store = useSelector((state) => state.category);

  const StudentOptions = validateOptions.StudentOptions;
  const common = useSelector((state) => state.common);

  const [fileImage, setFileImage] = useState();

  const dispatch = useDispatch();
  const cate = yup.object({
    first_name: yup
      .string()
      .required(<FormattedMessage id="The first name field is required" />)
      .max(70, <FormattedMessage id="First name up to 25 characters" />),
    last_name: yup
      .string()
      .required(<FormattedMessage id="The last name field is required" />)
      .max(25, <FormattedMessage id="Last name up to 25 characters" />),
    email: yup
      .string()
      .required(<FormattedMessage id="The email field is required" />)
      .email(<FormattedMessage id="Invalid email" />),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(cate),
    mode: "all",
  });

  useEffect(() => {
    dispatch(
      getDataUser({
        filter: {
          status: 1,
        },
        skip: 0,
        limit: 100,
        order: {
          key: "createdAt",
          value: "DESC",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const [valueBiography, setValueBiography] = useState(
    EditorState.createEmpty()
  );

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

  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };

  const onSubmit = async (values) => {
    const biography =
      (valueBiography &&
        draftToHtml(convertToRaw(valueBiography?.getCurrentContent()))) ||
      null;

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
          add({
            first_name: values?.first_name || "",
            last_name: values?.last_name || "",
            contact_email: values?.email || "",
            telephone: phoneNumber || "",
            mobile: phoneNumber || "",
            link_facebook: values?.linkFacebook || "fb",
            link_linkedin: values?.linkLinkedin || " ",
            link_twitter: values?.linkTwiter || " ",
            link_googleplus: values?.linkGoogleplus || " ",
            biography: biography || " ",
            instructor_image: urlImage || " ",
            lang: common.language || "vn",
            total_credits: 0,
            status: 1,
          })
        );
        toggleSidebar();
      }
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add New Instructor" />}
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
            innerRef={register(StudentOptions.name)}
            onBlur={() => {
              let last_name = document.getElementById("last_name");
              if (last_name && last_name.value) {
                last_name.value = last_name.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["last_name"] })}
          />
          <small className="text-danger">
            {errors?.last_name && errors.last_name.message}
          </small>
          {errors?.last_name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid name" />
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
            innerRef={register(StudentOptions.name)}
            onBlur={() => {
              let name = document.getElementById("first_name");
              if (name && name.value) {
                name.value = name.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["first_name"] })}
          />
          <small className="text-danger">
            {errors?.first_name && errors.first_name.message}
          </small>
          {errors?.first_name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid name" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="email">
            <FormattedMessage id="Email" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="email"
            id="email"
            placeholder=""
            innerRef={register(StudentOptions.email)}
            onBlur={() => {
              let email = document.getElementById("email");
              if (email && email.value) {
                email.value = email.value.trim();
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
            <span className="text-danger">*</span>
          </Label>
          <PhoneInput
            type="text"
            name="phone"
            id="phone"
            placeholder=""
            innerRef={register(StudentOptions.phone)}
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
          <Label for="linkFacebook">
            <FormattedMessage id="system_facebook" />{" "}
          </Label>
          <Input
            name="linkFacebook"
            id="linkFacebook"
            placeholder=""
            innerRef={register}
          />
        </FormGroup>

        <FormGroup>
          <Label for="linkLinkedin">
            <FormattedMessage id="system_linkedin" />{" "}
          </Label>
          <Input
            name="linkLinkedin"
            id="linkLinkedin"
            placeholder=""
            innerRef={register}
          />
        </FormGroup>

        <FormGroup>
          <Label for="linkTwiter">
            <FormattedMessage id="system_twiter" />{" "}
          </Label>
          <Input
            name="linkTwiter"
            id="linkTwiter"
            placeholder=""
            innerRef={register}
          />
        </FormGroup>

        <FormGroup>
          <Label for="linkGoogleplus">
            <FormattedMessage id="system_googleplus" />{" "}
          </Label>
          <Input
            name="linkGoogleplus"
            id="linkGoogleplus"
            placeholder=""
            innerRef={register}
          />
        </FormGroup>

        <FormGroup>
          <Label for="biography">
            <FormattedMessage id="biography" />{" "}
          </Label>

          <Editor
            stripPastedStyles={true}
            editorState={valueBiography}
            onEditorStateChange={(data) => setValueBiography(data)}
            name="biography"
            innerRef={register}
          />
        </FormGroup>

        <FormGroup>
          <Label for="Image">
            <FormattedMessage id="Image" />
            {/* <span className="text-danger"> *</span> */}
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

export default injectIntl(SidebarNewInstructors);
