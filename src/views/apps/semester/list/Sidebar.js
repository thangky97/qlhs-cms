import Sidebar from "@components/sidebar";
import classnames from "classnames";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "@constants/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addSemester } from "../store/action";

const SidebarNewSemester = ({ open, toggleSidebar, disable, setDisable }) => {
  const store = useSelector((state) => state.semesters);
  const { courses } = useSelector((state) => state.semesters);

  const SemesterOptions = validateOptions.SemesterOptions;

  const dispatch = useDispatch();
  const cate = yup.object({
    name: yup
      .string()
      .required(<FormattedMessage id="Tên kì học là bắt buộc" />),
    productId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn năm học" />),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(cate),
    mode: "all",
  });

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    setDisable(true);

    dispatch(
      addSemester({
        name: values?.name,
        productId: parseInt(values?.productId),
      })
    );
    toggleSidebar();
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Thêm mới kì học" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
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
            <FormattedMessage id="Course" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="productId"
            render={({ field }) => {
              return (
                <Select
                  id="productId"
                  innerRef={register}
                  name="productId"
                  className={classnames("react-select")}
                  options={courses?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.product_names[0]?.name}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("productId", "");
                    setValue("productId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
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

export default injectIntl(SidebarNewSemester);
