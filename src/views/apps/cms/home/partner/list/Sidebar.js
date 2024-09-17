import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";
import validateOptions from "../../../../../../constants/validate";
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../helper/common";
import { add } from "../store/action";

const SidebarAdd = ({
  open,
  toggleSidebar,
  avatar,
  setAvatar,
  disable,
  setDisable,
}) => {
  const store = useSelector((state) => state.partners);
  const [partnerData, setPartnerData] = useState(null);

  const [fileImage, setFileImage] = useState();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const PartnerOptions = validateOptions.PartnerOptions;
  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      var urlImage = "";
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
          dispatch(add({ ...values, image: urlImage }));
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
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="New Partner" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
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
              let partnerName = document.getElementById("name");
              if (partnerName && partnerName.value) {
                partnerName.value = partnerName.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["name"] })}
            defaultValue={partnerData && partnerData.name}
          />
          <small className="text-danger">
            {errors?.name && errors.name.message}
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
            <FormattedMessage id="cancel" />
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarAdd;
