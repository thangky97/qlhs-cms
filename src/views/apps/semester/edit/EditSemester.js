import { useEffect, useState } from "react";
import { Button, Card, Input, Label, Form, FormGroup } from "reactstrap";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import ExtensionsHeader from "@components/extensions-header";
import validateOptions from "@constants/validate";
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "react-slidedown/lib/slidedown.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { getDataCourse, updateSemester } from "../store/action";
import Select from "react-select";
import { useHistory } from "react-router-dom";

const EditSemester = ({ selected, intl }) => {
  const history = useHistory();
  const dataEdit = selected || {};
  const dispatch = useDispatch();
  const SemesterOptions = validateOptions.SemesterOptions;
  const { courses } = useSelector((state) => state.semesters);
  const [disable, setDisable] = useState(false);

  const [coursesValue, setCourse] = useState();

  const courseOption = {
    value: selected?.product?.product_names[0]?.id,
    label: `${selected?.product?.product_names[0]?.name}`,
  };

  useEffect(() => {
    if (dataEdit) {
      setCourse(courseOption);
    }
  }, [dataEdit]);

  const cate = yup.object({
    name: yup
      .string()
      .required(<FormattedMessage id="Tên kì học là bắt buộc" />),
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
      getDataCourse({
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

  const onSubmit = async (values) => {
    dispatch(
      updateSemester({
        id: selected?.id,
        data: {
          name: values?.name,
          productId: parseInt(coursesValue?.value),
        },
      })
    );
    history.goBack();
  };

  return (
    <Card className="invoice-preview-card mb-0 p-3">
      <ExtensionsHeader title={<FormattedMessage id="Chỉnh sửa kì học" />} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">
            <FormattedMessage id="Tên kì học" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            placeholder=""
            innerRef={register(SemesterOptions.name)}
            onBlur={() => {
              let name = document.getElementById("name");
              if (name && name.value) {
                name.value = name.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["name"] })}
            defaultValue={dataEdit?.name || ""}
          />
          <small className="text-danger">
            {errors?.name && errors.name.message}
          </small>
          {errors?.name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid name" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Course" />
            <span className="text-danger"> *</span>
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setCourse(e)}
            innerRef={register({ required: true })}
            name="productId"
            value={coursesValue}
            placeholder={<FormattedMessage id="Select..." />}
            options={courses?.map((item, index) => {
              return {
                value: item?.id,
                label: `${item?.product_names[0]?.name}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
          <small className="text-danger">
            {errors?.productId && errors.productId.message}
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
    </Card>
  );
};

export default injectIntl(EditSemester);
