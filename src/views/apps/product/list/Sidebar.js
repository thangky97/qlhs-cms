import Sidebar from "@components/sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "../../../../constants/validate";
import { convertFileToBase64, uploadImage } from "../../../../helper/common";
import { add } from "../store/action";
import * as yup from "yup";
import classNames from "classnames";
import avatarBlank from "../../../../assets/images/avatars/bg-blank.png";
import "./style.scss";
import Image from "../../../../assets/images/avatars/9.png";

const SidebarAdd = ({
  open,
  toggleSidebar,
  avatar,
  intl,
  disable,
  setDisable,
}) => {
  const [productData, setProductData] = useState(null);
  const [fileImage, setFileImage] = useState();
  const ProductOptions = validateOptions.ProductOptions;
  const store = useSelector((state) => state.products);
  const { instractors } = useSelector((state) => state.products);
  const lang = useSelector((state) => state.common.language);
  const dispatch = useDispatch();
  const cate = yup.object({
    product_name: yup
      .string()
      .required(<FormattedMessage id="The product's name field is required" />)
      .min(
        3,
        <FormattedMessage id="Product name must be at least 3 characters" />
      ),
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
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  const onSubmit = async (values) => {
    const product_description =
      (valueDescription &&
        draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
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
            product_name: values?.product_name || "",
            sort_product_description: "",
            product_description: product_description || "",
            status: parseInt(values.status) || 1,
            allow_display: parseInt(values.allow_display),
            product_type: parseInt(values.product_type) || 0,
            url_ytb: "",
            url_demo: "",
            url_tutorial: "",
            instructorId: null,
            lang,
            image: urlImage || Image,
            number_trial: 0,
            link_trial: "",
            link_download: "", //cancel
            open: 1,
            is_monitor: 0,
            vat: 0,
          })
        );
      }
    }
  };
  const uploadCallback = async (file) => {
    var linkImg = avatarBlank;
    const imageBase64 = await convertFileToBase64(file);
    if (imageBase64) {
      const newData = imageBase64.replace(/,/gi, "").split("base64");
      if (newData[1]) {
        const data = {
          imageData: newData[1],
          imageFormat: file?.type?.split("/")[1] || "png",
        };
        await uploadImage(data, file).then((res) => {
          linkImg = res?.data;
        });
      }
    }
    return new Promise((resolve, reject) => {
      resolve({ data: { link: linkImg } });
    });
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="New Product" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="product_name">
            <FormattedMessage id="product name" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="product_name"
            id="product_name"
            innerRef={register(ProductOptions.product_name)}
            className={classNames({ "is-invalid": errors["product_name"] })}
            onBlur={() => {
              let productName1 = document.getElementById("product_name");
              if (productName1 && productName1.value) {
                productName1.value = productName1.value.trim();
              }
            }}
          />
          <small className="text-danger">
            {errors?.product_name && errors.product_name.message}
          </small>
          {errors?.product_name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid product's name" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="product_description">
            <FormattedMessage id="Description" />{" "}
            <span className="text-danger"></span>
          </Label>

          <Editor
            stripPastedStyles={true}
            toolbar={{
              image: { uploadCallback: uploadCallback },
            }}
            editorState={valueDescription}
            onEditorStateChange={(data) => setValueDescription(data)}
            name="product_description"
            innerRef={register(ProductOptions.description_en)}
          />
          <small className="text-danger">
            {errors?.description_en && errors.description_en.message}
          </small>
        </FormGroup>

        {/* <FormGroup>
          <Label for="status">
            <FormattedMessage id="status" />
          </Label>

          <Input
            type="select"
            name="status"
            id="status"
            defaultValue={productData && productData.status}
            innerRef={register({ required: true })}
          >
            <option value="1">{intl.formatMessage({ id: "Active" })}</option>
            <option value="2">
              {intl.formatMessage({ id: "OutOfStock" })}
            </option>
          </Input>
        </FormGroup> */}

        <FormGroup>
          <Label for="allow_display">
            <FormattedMessage id="Allow" />
          </Label>

          <Input
            type="select"
            name="allow_display"
            id="allow_display"
            defaultValue={productData && productData.allow_display}
            innerRef={register({ required: true })}
          >
            <option value="1">{intl.formatMessage({ id: "Allow" })}</option>
            <option value="0">
              {intl.formatMessage({ id: "Do not allow" })}
            </option>
          </Input>
        </FormGroup>

        {/* {isCourse && (
          <FormGroup>
            <Label>
              <FormattedMessage id="instructors" />
            </Label>
            <Controller
              control={control}
              name="instructorId"
              render={({ field }) => {
                return (
                  <Select
                    id="instructorId"
                    innerRef={register}
                    name="instructorId"
                    // placeholder={<FormattedMessage id="Select..." />}
                    className={classnames(
                      "react-select",
                      !changeSelect
                        ? {
                            "is-invalid": errors["instructorId"],
                          }
                        : ""
                    )}
                    options={instractors?.map((item, index) => {
                      return {
                        value: item?.id,
                        label: `${item?.last_name} ${item?.first_name}`,
                        number: index + 1,
                      };
                    })}
                    classNamePrefix="select"
                    {...field}
                    onChange={(e) => {
                      setError("instructorId", "");
                      setValue("instructorId", e?.value);
                    }}
                  />
                );
              }}
            ></Controller>
            <small className="text-danger">
              {errors?.instructorId && errors.instructorId.message}
            </small>
          </FormGroup>
        )} */}

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
