// ** React Import
import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "../../../../../../../constants/validate";

const SidebarAdd = ({ open, toggleSidebar, addCity, disable, setDisable }) => {
  const CityOptions = validateOptions.CityOptions;
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
    }
    addCity(values);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add new city" />}
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
            innerRef={register(CityOptions.name)}
            onBlur={() => {
              let name = document.getElementById("name");
              if (name && name.value) {
                name.value = name.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["name"] })}
          />
          <small className="text-danger">
            {errors?.name && errors.name.message}
          </small>
          {errors?.name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid city name" />
            </small>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="code">
            <FormattedMessage id="city code" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="code"
            id="code"
            placeholder=" "
            innerRef={register(CityOptions.code)}
            onBlur={() => {
              let code = document.getElementById("code");
              if (code && code.value) {
                code.value = code.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["code"] })}
          />
          <small className="text-danger">
            {errors?.code && errors.code.message}
          </small>
          {errors?.code?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid city code" />
            </small>
          )}
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

export default SidebarAdd;
