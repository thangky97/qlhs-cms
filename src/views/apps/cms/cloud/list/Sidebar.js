import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FormattedMessage } from "react-intl";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import Sidebar from "@components/sidebar";
import "react-phone-number-input/style.css";

import { isObjEmpty } from "@utils";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";

import { useForm } from "react-hook-form";

import classNames from "classnames";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import validateOptions from "../../../../../constants/validate";
import {
  convertFileToBase64,
  formatPhone,
  uploadImage,
} from "../../../../../helper/common";
import { addStaff } from "../store/action";

const SidebarNewAbout = ({
  open,
  toggleSidebar,
  avatar,
  setAvatar,
  phoneNumber,
  setPhoneNumber,
  phoneNumber2,
  setPhoneNumber2,
}) => {
  const dispatch = useDispatch();
  const [fileImage, setFileImage] = useState();
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [valueFooter_text, setvalueFooter_text] = useState(
    EditorState.createEmpty()
  );

  const ProductOptions = validateOptions.ProductOptions;
  const { register, errors, handleSubmit } = useForm();
  const [invalidPhone2, setInvalidPhone2] = useState(false);
  const handleOnchangePhone2 = (e) => {
    setPhoneNumber2(e);
    try {
      const check = isValidPhoneNumber(e);
      if (!check) {
        setInvalidPhone2(true);
      } else {
        setInvalidPhone2(false);
      }
    } catch (error) {
      console.log(error);
      setInvalidPhone2(true);
    }
  };
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

  const onSubmit = async (values) => {
    if (invalidPhone) {
      setInvalidPhone(true);
    }
    if (isObjEmpty(errors) && !invalidPhone) {
      var urlImage = " ";
      let footer_text =
        (valueFooter_text &&
          draftToHtml(convertToRaw(valueFooter_text?.getCurrentContent()))) ||
        null;

      if (avatar) {
        const newData = avatar.replace(/,/gi, "").split("base64");
        if (newData[1]) {
          const data = {
            imageData: newData[1],
            imageFormat: fileImage?.type?.split("/")[1] || "png",
          };
          await uploadImage(data, fileImage).then((res) => {
            urlImage = res?.data;
            if (res) {
              dispatch(
                addStaff({
                  ...values,
                  logo: urlImage,
                  footer_text: footer_text || undefined,
                  phone_1:
                    (phoneNumber != "" && formatPhone(phoneNumber)) ||
                    undefined,
                  phone_2:
                    (phoneNumber2 != "" && formatPhone(phoneNumber2)) ||
                    undefined,
                  email: values?.email || " ",
                })
              );
            }
          });
        }
      }
    }
  };

  const StaffOptions = {
    phone_1: {
      pattern: {
        value:
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,
        message: <FormattedMessage id={"Invalid phone number"} />,
      },
      maxLength: {
        value: 25,
        message: "Số điện thoại tối đa 25 kí tự",
      },
    },
    phone_2: {
      pattern: {
        value:
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,
        message: <FormattedMessage id={"Invalid phone number"} />,
      },
      maxLength: {
        value: 25,
        message: "Số điện thoại tối đa 25 kí tự",
      },
    },
    map_source: {
      required: <FormattedMessage id="The map source field is required" />,
    },
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
      title={<FormattedMessage id="Setting" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="phone_1">
            <FormattedMessage id="phone 1" />{" "}
            <span className="text-danger"></span>
          </Label>
          <PhoneInput
            type="text"
            name="phone_1"
            id="phone_1"
            placeholder=""
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
          <Label for="phone_2">
            <FormattedMessage id="phone 2" />{" "}
            <span className="text-danger"></span>
          </Label>
          <PhoneInput
            type="text"
            name="phone_2"
            id="phone_2"
            placeholder=""
            onBlur={() => {
              let phone1 = document.getElementById("phone");
              if (phone1 && phone1.value) {
                phone1.value = phone1.value.trim();
              }
            }}
            className={invalidPhone && "is-invalid form-control"}
            value={phoneNumber2}
            onChange={(e) => {
              handleOnchangePhone2(e);
            }}
          />
          <small className="text-danger">
            {invalidPhone2 && <FormattedMessage id="Invalid phone number" />}
          </small>
        </FormGroup>
        <FormGroup>
          <Label for="email">
            <FormattedMessage id="email" />{" "}
            <span className="text-danger"></span>
          </Label>
          <PhoneInput
            type="text"
            name="email"
            id="email"
            placeholder=""
            onBlur={() => {
              let phone1 = document.getElementById("email");
              if (phone1 && phone1.value) {
                phone1.value = phone1.value.trim();
              }
            }}
            className={invalidPhone && "is-invalid form-control"}
          />
          <small className="text-danger">
            {invalidPhone2 && <FormattedMessage id="Invalid phone number" />}
          </small>
        </FormGroup>
        <FormGroup>
          <Label for="map_source">
            <FormattedMessage id="Map source" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="map_source"
            id="map_source"
            type="textarea"
            placeholder=""
            innerRef={register(StaffOptions.map_source)}
            onBlur={() => {
              let mapSource1 = document.getElementById("map_source");
              if (mapSource1 && mapSource1.value) {
                mapSource1.value = mapSource1.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["map_source"] })}
          />
          <small className="text-danger">
            {errors?.map_source && errors.map_source.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label for="Image">
            <FormattedMessage id="Logo" />
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
        <FormGroup>
          <Label for="footer text">
            <FormattedMessage id="Footer text" />{" "}
            <span className="text-danger"></span>
          </Label>

          <Editor
            stripPastedStyles={true}
            toolbar={{
              options: ["inline", "textAlign"],
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline"],
              },
            }}
            editorState={valueFooter_text}
            onEditorStateChange={(data) => setvalueFooter_text(data)}
            name="product_description"
            innerRef={register(ProductOptions.description_en)}
            className={classNames({
              "is-invalid": errors["product_description"],
            })}
          />
          <small className="text-danger">
            {errors?.description_en && errors.description_en.message}
          </small>
        </FormGroup>

        <div style={{ textAlign: "end" }}>
          <Button type="submit" className="mr-1" color="primary">
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

export default SidebarNewAbout;
