// ** React Imports
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { isObjEmpty } from "@utils";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
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
import { formatDateTime } from "../../../../utility/Utils";
import { updateUser } from "../store/action";

const UserTab = ({ selected, intl, store }) => {
  // ** States
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [staffData, setstaffData] = useState(null);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [disable, setDisable] = useState(false);
  const { id } = useParams();
  const [invalidPhone, setInvalidPhone] = useState(false);
  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null && staffData !== null && selected.id !== staffData.id)
    ) {
      setstaffData(selected);
    }
  }, [selected]);
  useEffect(() => {
    if (staffData) {
      setStatus(staffData.status);
    }
  }, [staffData]);

  const onSubmit = async (values) => {
    if (invalidPhone) {
      setInvalidPhone(true);
    }
    if (isObjEmpty(errors) && !invalidPhone) {
      setDisable(true);

      dispatch(
        updateUser({
          id: parseInt(id),
          data: {
            status: status || undefined,
          },
        })
      );
    }
  };

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
            <Label for="username">
              <FormattedMessage id="username" />{" "}
            </Label>
            <Input
              name="username"
              id="username"
              disabled
              defaultValue={staffData && staffData.username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="product_name">
              <FormattedMessage id="product_name" />{" "}
            </Label>
            <Input
              name="product_name"
              id="product_name"
              disabled
              defaultValue={staffData && staffData.product_name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="service">
              <FormattedMessage id="service" />{" "}
            </Label>
            <Input
              name="service"
              id="service"
              disabled
              defaultValue={staffData && staffData.service}
            />
          </FormGroup>
          <FormGroup>
            <Label for="total_camera">
              <FormattedMessage id="total camera" />{" "}
            </Label>
            <Input
              name="total_camera"
              id="total_camera"
              disabled
              defaultValue={staffData && staffData.total_camera}
            />
          </FormGroup>
          <FormGroup>
            <Label for="total_intersection">
              <FormattedMessage id="total intersection" />{" "}
            </Label>
            <Input
              name="total_intersection"
              id="total_intersection"
              disabled
              defaultValue={staffData && staffData.total_intersection}
            />
          </FormGroup>

          <FormGroup>
            <Label for="createdAt">
              <FormattedMessage id="createdAt" />{" "}
            </Label>
            <Input
              name="createdAt"
              id="createdAt"
              disabled
              defaultValue={staffData && formatDateTime(staffData.createdAt)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="updatedAt">
              <FormattedMessage id="updatedAt" />{" "}
            </Label>
            <Input
              name="updatedAt"
              id="updatedAt"
              disabled
              defaultValue={staffData && formatDateTime(staffData.updatedAt)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="expiredAt">
              <FormattedMessage id="expiredAt" />{" "}
            </Label>
            <Input
              name="expiredAt"
              id="expiredAt"
              disabled
              defaultValue={staffData && formatDateTime(staffData.expiredAt)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="token">
              <FormattedMessage id="token" />{" "}
            </Label>
            <Input
              name="token"
              id="token"
              disabled
              type="textarea"
              defaultValue={staffData && staffData.token}
            />
          </FormGroup>

          <FormGroup>
            <Label for="token_url">
              <FormattedMessage id="token_url" />{" "}
            </Label>
            <Input
              name="token_url"
              id="token_url"
              disabled
              defaultValue={staffData && staffData.token_url}
            />
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
              defaultValue={staffData && staffData.status}
              innerRef={register({ required: true })}
            >
              <option value="1">{intl.formatMessage({ id: "Active" })}</option>
              <option value="0">
                {intl.formatMessage({ id: "Deactive" })}
              </option>
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
export default injectIntl(UserTab);
