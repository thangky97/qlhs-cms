import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import "react-phone-number-input/style.css";

import { isObjEmpty } from "@utils";

import classnames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
import { getKind, getKindId, updateKind } from "../store/action";

const KindTab = ({ selected, intl }) => {
  const store = useSelector((state) => state.kind);
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [kindData, setKindData] = useState(null);
  const lang = useSelector((state) => state.common.language);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [disable, setDisable] = useState(false);
  const { id } = useParams();
  const EditKindOptions = validateOptions.EditKindOptions;

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  useEffect(() => {
    dispatch(
      getKind({
        filter: {
          // status: filterStatus.value || undefined,
          // name: searchName || undefined,
        },
        skip: 0,
        limit: 100,
        order: {
          key: "name",
          value: "desc",
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null && kindData !== null && selected.id !== kindData.id)
    ) {
      setKindData(selected);
    }
  }, [selected, kindData]);

  useEffect(() => {
    if (store.status === 200) {
      history.push("/apps/kind/list");
    }
  }, [store.status, history]);

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      dispatch(
        updateKind({
          id: parseInt(id),
          data: {
            ...values,
            name: values.name,
            //status: parseInt(values.status),
            lang,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (kindData) {
      setStatus(kindData.status);
    }
  }, [kindData]);
  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          <Media className="mt-50" body>
            <h4>{selected.name} </h4>
          </Media>
        </Media>
      </Col>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="name">
              <FormattedMessage id="Solution" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="name"
              id="name"
              innerRef={register(EditKindOptions.name)}
              onBlur={() => {
                let name = document.getElementById("name");
                if (name && name.value) {
                  name.value = name.value.trim();
                }
              }}
              className={classnames({ "is-invalid": errors["name"] })}
              defaultValue={kindData && kindData.name}
            />
            <small className="text-danger">
              {errors?.name && errors.name.message}
            </small>
            {errors?.name?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid kind name" />
              </small>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="status">
              <FormattedMessage id="Status" />
            </Label>

            <Input
              type="select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status"
              innerRef={register({ required: true })}
            >
              <option value="1">{intl.formatMessage({ id: "Active" })}</option>
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
export default injectIntl(KindTab);
