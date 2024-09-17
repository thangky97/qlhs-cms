import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { isObjEmpty } from "@utils";
import classnames from "classnames";
import { useForm } from "react-hook-form";
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
import { updateUserTokenDetail } from "../store/action";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const typeServiceCloud = {
  0: {
    text: "Free",
  },
  1: {
    text: "Basic",
  },
  2: {
    text: "Standrad",
  },
  3: {
    text: "Premium",
  },
};

const UserTab = ({ selected, intl }) => {
  const history = useHistory();
  const [userTokenDetailData, setUserTokenDetailData] = useState(null);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.userTokenDetail);
  const [disable, setDisable] = useState(false);

  const cate = yup.object({
    fromdate: yup
      .string()
      .required(<FormattedMessage id="The from date field is required" />),

    enddate: yup
      .string()
      .required(<FormattedMessage id="The end date field is required" />),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(cate),
    mode: "all",
  });

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        userTokenDetailData !== null &&
        selected.id !== userTokenDetailData.id)
    ) {
      setUserTokenDetailData(selected);
      setValue(
        "cloud",
        selected &&
          selected?.productPriceType &&
          typeServiceCloud[selected?.productPriceType].text
      );
      setValue(
        "fromdate",
        selected?.fromdate &&
          new Date(selected?.fromdate).toISOString().slice(0, 10)
      );
      setValue(
        "enddate",
        selected?.enddate &&
          new Date(selected?.enddate).toISOString().slice(0, 10)
      );
    }
  }, [selected, userTokenDetailData]);

  useEffect(() => {
    if (store.status == 200) {
      history.goBack();
    }
  }, [store.status, history]);

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      dispatch(
        updateUserTokenDetail({
          id: parseInt(selected?.id),
          data: {
            fromdate:
              values?.fromdate && moment.utc(values?.fromdate).toISOString(),
            enddate:
              values?.enddate && moment.utc(values?.enddate).toISOString(),
          },
        })
      );
    }
  };

  return (
    <Row>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="cloud">
              <FormattedMessage id="Cloud" />
            </Label>
            <Input
              name="cloud"
              id="cloud"
              innerRef={register}
              readOnly
              defaultValue={
                userTokenDetailData &&
                userTokenDetailData?.productPriceType &&
                typeServiceCloud[userTokenDetailData?.productPriceType].text
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="fromdate">
              <FormattedMessage id="start date" />
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="fromdate"
              id="fromdate"
              type="date"
              innerRef={register}
              onBlur={() => {
                let date = document.getElementById("fromdate");
                if (date && date.value) {
                  date.value = date.value.trim();
                }
              }}
              className={classnames({ "is-invalid": errors["fromdate"] })}
              defaultValue={
                userTokenDetailData?.fromdate &&
                new Date(userTokenDetailData?.fromdate)
                  .toISOString()
                  .slice(0, 10)
              }
            />
            <small className="text-danger">
              {errors?.fromdate && errors.fromdate.message}
            </small>
            {errors?.fromdate?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid name" />
              </small>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="enddate">
              <FormattedMessage id="end date" />
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="enddate"
              id="enddate"
              type="date"
              innerRef={register}
              onBlur={() => {
                let date = document.getElementById("enddate");
                if (date && date.value) {
                  date.value = date.value.trim();
                }
              }}
              className={classnames({ "is-invalid": errors["enddate"] })}
              defaultValue={
                userTokenDetailData?.enddate &&
                new Date(userTokenDetailData?.enddate)
                  .toISOString()
                  .slice(0, 10)
              }
            />
            <small className="text-danger">
              {errors?.enddate && errors.enddate.message}
            </small>
            {errors?.enddate?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid name" />
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
