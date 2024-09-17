import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";
import validateOptions from "../../../../constants/validate";
import { addKind } from "../store/action";

const SidebarNewKind = ({ open, toggleSidebar, intl, disable, setDisable }) => {
  const store = useSelector((state) => state.kind);
  const [kindData, setKindData] = useState(null);
  const lang = useSelector((state) => state.common.language);
  const KindOptions = validateOptions.KindOptions;
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      try {
        dispatch(
          addKind({
            ...values,
            name: values.name || undefined,
            status: parseInt(values.status),
            lang,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add New Solution" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">
            <FormattedMessage id="Solution" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            placeholder=""
            innerRef={register(KindOptions.name)}
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
          <Label for="status">
            <FormattedMessage id="status" />{" "}
          </Label>
          <Input
            type="select"
            name="status"
            id="status"
            defaultValue={kindData && kindData.status}
            innerRef={register({ required: true })}
          >
            <option value="1">{intl.formatMessage({ id: "Active" })}</option>
            <option value="0">{intl.formatMessage({ id: "Deactive" })}</option>

            <option value="2">{intl.formatMessage({ id: "Blocked" })}</option>
          </Input>
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

export default injectIntl(SidebarNewKind);
