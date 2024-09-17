import { isObjEmpty } from "@utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FormattedMessage, injectIntl } from "react-intl";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import classNames from "classnames";
import draftToHtml from "draftjs-to-html";
import { isValidPhoneNumber } from "react-phone-number-input";
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
import avatarBlank from "../../../../../assets/images/avatars/bg-blank.png";
import validateOptions from "../../../../../constants/validate";
import {
  convertFileToBase64,
  formatPhone,
  uploadImage,
} from "../../../../../helper/common";
import { htmlToDraftUtil } from "../../../../../utility/Utils";
import { update } from "../store/action";
const SettingTab = ({ selected, store, intl }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [settingData, setsettingData] = useState(null);
  const [avatar, setAvatar] = useState(avatarBlank);
  const [fileImage, setFileImage] = useState();
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidPhone2, setInvalidPhone2] = useState(false);
  const [valueFooter_text, setvalueFooter_text] = useState(
    EditorState.createEmpty()
  );

  const [disable, setDisable] = useState(false);
  const ProductOptions = validateOptions.ProductOptions;

  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumber2, setPhoneNumber2] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        settingData !== null &&
        selected.id !== settingData.id)
    ) {
      setsettingData(selected);

      setvalueFooter_text(htmlToDraftUtil(selected.footer_text || " "));
    }
  }, [selected]);
  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
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
  const handleOnchangePhone2 = (e) => {
    setPhoneNumber2(e);
    if (e !== undefined) {
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
    } else {
      setInvalidPhone2(false);
    }
  };
  useEffect(() => {
    if (settingData) {
      setAvatar(settingData?.logo);
      setPhoneNumber(settingData.phone_1);
      setPhoneNumber2(settingData.phone_2);
    }
  }, [settingData]);
  const onSubmit = async (values) => {
    if (invalidPhone) {
      setInvalidPhone(true);
    }
    if (isObjEmpty(errors) && !invalidPhone) {
      let footer_text =
        (valueFooter_text &&
          draftToHtml(convertToRaw(valueFooter_text?.getCurrentContent()))) ||
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
        dispatch(
          update({
            ...values,
            logo: urlImage,
            footer_text: footer_text || undefined,
            phone_1:
              (phoneNumber != "" && formatPhone(phoneNumber)) || undefined,
            phone_2:
              (phoneNumber2 != "" && formatPhone(phoneNumber2)) || undefined,
            email: values?.email || " ",
          })
        );
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
    email: {},
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
            <Label for="phone_1">
              <FormattedMessage id="phone 1" />
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
              <FormattedMessage id="phone 2" />
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
              className={invalidPhone2 && "is-invalid form-control"}
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
              <FormattedMessage id="Email" />{" "}
              <span className="text-danger"></span>
            </Label>
            <Input
              name="email"
              id="email"
              placeholder=""
              innerRef={register(StaffOptions.email)}
              onBlur={() => {
                let mapSource = document.getElementById("email");
                if (mapSource && mapSource.value) {
                  mapSource.value = mapSource.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["email"] })}
              defaultValue={settingData?.email}
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
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
                let mapSource = document.getElementById("map_source");
                if (mapSource && mapSource.value) {
                  mapSource.value = mapSource.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["map_source"] })}
              defaultValue={settingData?.map_source}
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
                  className="rounded mr-50 objectFit-contain"
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
export default injectIntl(SettingTab);
