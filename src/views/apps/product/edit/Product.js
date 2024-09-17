import { isObjEmpty } from "@utils";
import classNames from "classnames";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
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
import validateOptions from "../../../../constants/validate";
import { htmlToDraftUtil } from "../../../../utility/Utils";
import { update, getInstractors } from "../store/action";
import avatarBlank from "../../../../assets/images/avatars/bg-blank.png";
import "./style.scss";

const ProductTab = ({ selected, intl }) => {
  const store = useSelector((state) => state.products);
  const { instractors } = useSelector((state) => state.products);
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [productData, setProductData] = useState(null);
  const lang = useSelector((state) => state.common.language);
  const [status, setStatus] = useState();
  const [allow, setAllow] = useState();

  const [type, setType] = useState();

  const instructorOption = {
    value: productData?.instructor?.id,
    label: `${productData?.instructor?.last_name}  ${productData?.instructor?.first_name}`,
  };

  const [InstractorValue, setInstractors] = useState();
  const [disable, setDisable] = useState(false);
  const ProductOptions = validateOptions.ProductOptions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (store) {
      setInstractors(instructorOption);
    }
  }, [store]);

  useEffect(() => {
    dispatch(
      getInstractors({
        filter: {},
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        productData !== null &&
        selected.id !== productData.id)
    ) {
      setProductData(selected);
    }
  }, [selected, productData]);

  const [valueDescription, setValueDescription] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    const product_description = draftToHtml(
      convertToRaw(valueDescription.getCurrentContent())
    );

    if (isObjEmpty(errors)) {
      setDisable(true);
      dispatch(
        update({
          id: parseInt(productData.id),
          data: {
            product_name: values?.product_name,
            allow_display: parseInt(allow),
            status: parseInt(values.status) || 1,
            product_type: parseInt(type) || 0,
            product_description:
              product_description ||
              productData?.product_descriptions[0]?.product_description,
            sort_product_description: "",
            url_ytb: "",
            url_demo: "",
            url_tutorial: "",
            lang,
            image: avatarBlank,
            priority_index: 1,
            instructorId: undefined,
            number_trial: 0,
            link_trial: "",
            link_download: "", //cancel
            open: 1,
            is_monitor: 0,
            vat: 0,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (productData) {
      setStatus(parseInt(productData.status));
      setAllow(parseInt(productData.allow_display));
      setType(parseInt(productData.product_type));
      setValueDescription(
        htmlToDraftUtil(
          productData?.product_descriptions[0]?.description || " "
        )
      );
    }
  }, [productData]);

  useEffect(() => {
    if (store?.status == 200) {
      history.push("/apps/product/list");
    }
  }, [store?.status, history]);
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
            <Label for="product_name">
              <FormattedMessage id="product name" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="product_name"
              id="product_name"
              innerRef={register(ProductOptions.product_name)}
              onBlur={() => {
                let productName1 = document.getElementById("product_name");
                if (productName1 && productName1?.value) {
                  productName1.value = productName1?.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["product_name"] })}
              defaultValue={productData?.product_names[0]?.name}
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
              // toolbar={{
              //   image: { uploadCallback: uploadCallback },
              // }}
              defaultEditorState={valueDescription}
              editorState={valueDescription}
              onEditorStateChange={(data) => setValueDescription(data)}
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

          <FormGroup>
            <Label for="allow_display">
              <FormattedMessage id="Allow" />
            </Label>

            <Input
              type="select"
              name="allow_display"
              id="allow_display"
              value={allow}
              defaultValue={productData && productData.allow_display}
              innerRef={register({ required: true })}
              onChange={(e) => setAllow(parseInt(e.target.value))}
            >
              <option value="1">{intl.formatMessage({ id: "Allow" })}</option>
              <option value="0">
                {intl.formatMessage({ id: "Do not allow" })}
              </option>
            </Input>
          </FormGroup>

          {/* {selected?.product_type == 0 && (
            <FormGroup>
              <Label>
                <FormattedMessage id="instructors" />
              </Label>
              <Select
                isClearable={false}
                onChange={(e) => setInstractors(e)}
                innerRef={register({ required: true })}
                name="instructorId"
                value={InstractorValue}
                placeholder={<FormattedMessage id="Select..." />}
                options={instractors?.map((item, index) => {
                  return {
                    value: item?.id,
                    label: `${item?.last_name} ${item?.first_name}`,
                  };
                })}
                className="react-select"
                classNamePrefix="select"
              />
              <small className="text-danger">
                {errors?.instratorsId && errors.instratorsId.message}
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
              <FormattedMessage id="update" />
            </Button>
            <Button
              type="reset"
              onClick={() => history.goBack()}
              color="secondary"
              outline
            >
              <FormattedMessage id="Cancel" />
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default injectIntl(ProductTab);
