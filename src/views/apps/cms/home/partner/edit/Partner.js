import { isObjEmpty } from "@utils";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
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
import validateOptions from "../../../../../../constants/validate";
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../helper/common";
import { update } from "../store/action";

const PartneTab = ({ selected }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [sliderData, seSliderData] = useState(null);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const PartnerOptions = validateOptions.PartnerOptions;
  const [avatar, setAvatar] = useState();

  const [fileImage, setFileImage] = useState();
  const store = useSelector((state) => state.partners);
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
  useEffect(() => {
    if (store.status == 200) {
      history.goBack();
    }
  }, [store.status]);
  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        sliderData !== null &&
        selected.id !== sliderData.id)
    ) {
      seSliderData(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (sliderData) {
      setAvatar(sliderData.image);
    }
  }, [sliderData]);

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      var urlImage = "";
      if (avatar) {
        const newData = avatar.replace(/,/gi, "").split("base64");
        if (newData.length > 1 && newData[1]) {
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
            update({
              id: parseInt(sliderData.id),
              data: {
                ...values,
                image: urlImage,
                priority_index: parseInt(values?.priority_index),
              },
            })
          );
        }
      }
    }
  };
  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          <Media className="mt-50" body></Media>
        </Media>
      </Col>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="name">
              <FormattedMessage id="name" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="name"
              id="name"
              placeholder=" "
              innerRef={register(PartnerOptions.name)}
              onBlur={() => {
                let partnerName2 = document.getElementById("name");
                if (partnerName2 && partnerName2.value) {
                  partnerName2.value = partnerName2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["name"] })}
              defaultValue={sliderData && sliderData.name}
            />
            <small className="text-danger">
              {errors?.name && errors.name.message}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for="index">
              <FormattedMessage id="index" />{" "}
            </Label>
            <Input
              name="priority_index"
              id="priority_index"
              placeholder=" "
              innerRef={register({
                required: false,
              })}
              onBlur={() => {
                let title = document.getElementById("priority_index");
                if (title && title.value) {
                  title.value = title.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["priority_index"] })}
              defaultValue={selected?.priority_index}
            />
            <small className="text-danger">
              {errors?.title && errors.title.message}
            </small>
          </FormGroup>
          <FormGroup>
            <Label for="Image">
              <FormattedMessage id="Image" />
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
              <FormattedMessage id="cancel" />
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default PartneTab;
