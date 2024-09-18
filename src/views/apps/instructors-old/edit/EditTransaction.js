import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Row,
  Label,
  Form,
  FormGroup,
  Media,
} from "reactstrap";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import ExtensionsHeader from "@components/extensions-header";
import validateOptions from "@constants/validate";
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "react-slidedown/lib/slidedown.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import { convertFileToBase64, uploadImage } from "@helper/common";
import { htmlToDraftUtil } from "@utils";
import draftToHtml from "draftjs-to-html";
import { BG_BLANK } from "@constants/app";
import { update } from "../store/action";
import { useHistory } from "react-router-dom";

const EditTransaction = ({ selected, intl }) => {
  const common = useSelector((state) => state.common);
  const history = useHistory();
  const dataEdit = selected || {};
  const dispatch = useDispatch();
  const StudentOptions = validateOptions.StudentOptions;
  const [disable, setDisable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [avatar, setAvatar] = useState();
  const [fileImage, setFileImage] = useState();
  const [status, setStatus] = useState();
  const [valueBiography, setValueBiography] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (selected) {
      setPhoneNumber(selected?.telephone);
      setValueBiography(htmlToDraftUtil(selected?.biography || " "));
    }
  }, [selected]);

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

  function hanldeError(params) {
    if (!isValidPhoneNumber(phoneNumber)) {
      setInvalidPhone(true);
    }
  }

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

    var urlImage = selected?.instructor_image;
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
    }
    dispatch(
      update({
        id: selected?.id,
        data: {
          first_name: values?.first_name || "",
          last_name: values?.last_name || "",
          contact_email: values?.email || "",
          telephone: phoneNumber || "",
          mobile: phoneNumber || "",
          link_facebook: values?.linkFacebook || "",
          link_linkedin: values?.linkLinkedin || "",
          link_twitter: values?.linkTwiter || "",
          link_googleplus: values?.linkGoogleplus || "",
          biography: biography || "",
          instructor_image: urlImage || "",
          lang: common.language || "vn",
          total_credits: 0,
          status: parseInt(values.status),
        },
      })
    );
    history.goBack();
  };

  return (
    <Card className="invoice-preview-card mb-0 p-3">
      <ExtensionsHeader title={<FormattedMessage id="Edit Instructor" />} />

      <Form onSubmit={handleSubmit(onSubmit, hanldeError)}>
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
            defaultValue={dataEdit?.first_name || ""}
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
            defaultValue={dataEdit?.last_name || ""}
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
            defaultValue={dataEdit?.contact_email || ""}
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
            defaultValue={dataEdit?.link_facebook || ""}
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
            defaultValue={dataEdit?.link_linkedin || ""}
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
            defaultValue={dataEdit?.link_twitter || ""}
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
            defaultValue={dataEdit?.link_googleplus || ""}
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
          <Label for="status">
            <FormattedMessage id="status" />
          </Label>

          <Input
            type="select"
            name="status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
            id="status"
            defaultValue={selected && selected?.status}
            innerRef={register({ required: true })}
          >
            <option value="1">{intl.formatMessage({ id: "Active" })}</option>
            <option value="0">{intl.formatMessage({ id: "Deactive" })}</option>
          </Input>
        </FormGroup>

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
                src={avatar || selected?.instructor_image}
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
    </Card>
  );
};

export default injectIntl(EditTransaction);
