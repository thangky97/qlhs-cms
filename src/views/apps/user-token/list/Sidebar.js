import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";
import validateOptions from "@constants/validate";
import { addUser, getListUser } from "../store/action";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import * as yup from "yup";

const SidebarNewUserToken = ({
  open,
  toggleSidebar,
  intl,
  disable,
  setDisable,
}) => {
  const store = useSelector((state) => state.userToken);
  const { product } = useSelector((state) => state.userToken);
  const { userToken } = useSelector((state) => state.userToken);
  const lang = useSelector((state) => state.common.language);
  const dispatch = useDispatch();
  const cate = yup.object({
    productId: yup
      .number()
      .required(<FormattedMessage id="The course field is required" />),
    usersId: yup
      .string()
      .required(<FormattedMessage id="The user field is required" />),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setError,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(cate),
    mode: "all",
  });

  const [changeCloud, setChangeCloud] = useState();
  const [changeUser, setChangeUser] = useState();

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    console.log({});
    setDisable(true);
    try {
      dispatch(
        addUser({
          usersId: parseInt(values.usersId),
          productId: values.productId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add new token" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>
            <FormattedMessage id="Users" />
            <span className="text-danger"> * </span>
          </Label>
          <Controller
            control={control}
            name="usersId"
            render={({ field }) => {
              return (
                <Select
                  id="usersId"
                  innerRef={register}
                  name="usersId"
                  className={classnames(
                    "react-select",
                    !changeUser
                      ? {
                          "is-invalid": errors["usersId"],
                        }
                      : ""
                  )}
                  options={userToken?.map((item) => {
                    return {
                      value: parseInt(item?.id),
                      // label: item?.first_name + " - " + item?.first_name || ""
                      label: item?.username || "",
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("usersId", "");
                    setValue("usersId", parseInt(e?.value));
                    setChangeUser(parseInt(e?.value));
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.usersId && errors.usersId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Cloud Applications" />
            <span className="text-danger"> * </span>
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
                  // placeholder={<FormattedMessage id="Select..." />}
                  className={classnames(
                    "react-select",
                    !changeCloud
                      ? {
                          "is-invalid": errors["productId"],
                        }
                      : ""
                  )}
                  options={product?.map((item) => {
                    return {
                      value: item?.id && item?.id,
                      label: item.product_names[0].name || "",
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("productId", "");
                    setValue("productId", e?.value);
                    setChangeCloud(e?.value);
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
            <FormattedMessage id="Save" />
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

export default injectIntl(SidebarNewUserToken);
