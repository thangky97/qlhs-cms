import { isObjEmpty, selectThemeColors } from "@utils";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";

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
import { getDataCurriulumSection, update } from "../store/action";
import avatarBlank from "../../../../assets/images/avatars/bg-blank.png";
import { convertFileToBase64, uploadImage } from "../../../../helper/common";

const StaffAccountTab = ({ selected, intl }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [status, setStatus] = useState();
  const EditStaffOptions = validateOptions.EditStaffOptions;
  const [disable, setDisable] = useState(false);
  const [defaultValueRole, setDefaultValueRole] = useState([]);
  const { terms } = useSelector((state) => state.staffs);
  const [avatar, setAvatar] = useState(avatarBlank);
  const [fileImage, setFileImage] = useState();

  const roleOptions = [
    {
      value: "MANAGE_USER",
      label: <FormattedMessage id={"User"} />,
      color: "#FF8B00",
      isFixed: false,
    },
  ];
  const store = useSelector((state) => state.staffs);

  const [staffData, setstaffData] = useState(null);
  const dispatch = useDispatch();

  const [role, setRole] = useState();
  const [CurriculumSectionValue, setCurriculumSection] = useState();

  const curriculumSectionOption = {
    value: staffData?.curriculum_section?.id,
    label: `${staffData?.curriculum_section?.code} - ${staffData?.curriculum_section?.title}`,
  };

  const onChaneRole = (e) => {
    setRole(e?.map((item) => item.value)?.join(";"));
    setDefaultValueRole(e);
  };

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };
  useEffect(() => {
    if (selected) {
      setAvatar(selected.avatar);
    }
  }, [selected]);

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
      setStatus(parseInt(staffData.status));
      const listDefaulRole = [];
      const arrRole = staffData?.role?.split(";");
      roleOptions.map((item) => {
        if (arrRole?.includes(item.value)) {
          listDefaulRole.push(item);
        }
      });
      setDefaultValueRole(listDefaulRole);
      onChaneRole(listDefaulRole);
      setCurriculumSection(curriculumSectionOption);
    }
  }, [staffData]);

  useEffect(() => {
    dispatch(
      getDataCurriulumSection({
        filter: {
          status: 1,
        },
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
  }, [store.status]);

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      var urlImage = "";
      if (avatar) {
        const newData = avatar.replace(/,/gi, "").split("base64");
        if (newData[1]) {
          const data = {
            imageData: newData[1],
            imageFormat: fileImage.type.split("/")[1],
          };
          const res = await uploadImage(data, fileImage).then((res) => {
            urlImage = res?.data;
          });
        } else {
          urlImage = avatar;
        }
        if (urlImage) {
          dispatch(
            update({
              id: parseInt(selected.id),
              data: {
                status,
                ...values,
                code: values?.code,
                phone: values?.phone || undefined,
                role: role || " ",
                curriculumSectionId: parseInt(CurriculumSectionValue?.value),
                avatar: urlImage,
              },
            })
          );
        }
      }
    }
  };
  useEffect(() => {
    if (store.status == 200) {
      history.push("/apps/user/list");
    }
  }, [store.status]);
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
            <Label for="code">
              <FormattedMessage id="student_code" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="code"
              id="code"
              innerRef={register(EditStaffOptions.code)}
              onBlur={() => {
                let lastNameEl = document.getElementById("code");
                if (lastNameEl && lastNameEl.value) {
                  lastNameEl.value = lastNameEl.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["code"] })}
              defaultValue={staffData && staffData.code}
            />
            <small className="text-danger">
              {errors?.code && errors.code.message}
            </small>
            {errors?.code?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid last name" />
              </small>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="last_name">
              <FormattedMessage id="lastName" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="last_name"
              id="last_name"
              placeholder=" Doe"
              innerRef={register(EditStaffOptions.last_name)}
              onBlur={() => {
                let lastNameEl = document.getElementById("last_name");
                if (lastNameEl && lastNameEl.value) {
                  lastNameEl.value = lastNameEl.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["last_name"] })}
              defaultValue={staffData && staffData.last_name}
            />
            <small className="text-danger">
              {errors?.last_name && errors.last_name.message}
            </small>
            {errors?.last_name?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid last name" />
              </small>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="first_name">
              <FormattedMessage id="firstName" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="first_name"
              id="first_name"
              innerRef={register(EditStaffOptions.first_name)}
              onBlur={() => {
                let firstNameEl = document.getElementById("first_name");
                if (firstNameEl && firstNameEl.value) {
                  firstNameEl.value = firstNameEl.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["first_name"] })}
              defaultValue={staffData && staffData.first_name}
            />
            <small className="text-danger">
              {errors?.first_name && errors.first_name.message}
            </small>
            {errors?.first_name?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid first name" />
              </small>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="email">
              <FormattedMessage id="Email" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              defaultValue={staffData && staffData.email}
              id="email"
              placeholder="john.doe@example.com"
              innerRef={register(EditStaffOptions.email)}
              onBlur={() => {
                let email1 = document.getElementById("email");
                if (email1 && email1.value) {
                  email1.value = email1.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["email"] })}
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
            </small>
            {errors?.email?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid email" />
              </small>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="phone">
              <FormattedMessage id="phoneNumber" />{" "}
              <span className="text-danger"> * </span>
            </Label>
            <Input
              type="phone"
              name="phone"
              id="phone"
              placeholder=""
              innerRef={register(EditStaffOptions.phone)}
              onBlur={() => {
                let phone1 = document.getElementById("phone");

                if (phone1 && phone1.value) {
                  phone1.value = phone1.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["phone"] })}
              defaultValue={staffData && staffData.phone}
            />
            <small className="text-danger">
              {errors?.phone && errors.phone.message}
            </small>
            {errors?.phone?.type == "validate" && (
              <small className="text-danger">
                <FormattedMessage id="Invalid phone" />
              </small>
            )}
          </FormGroup>

          {/* <FormGroup>
            <Label for="status">
              <FormattedMessage id="status" />{" "}
            </Label>

            <Input
              type="select"
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e?.target.value)}
              innerRef={register({ required: true })}
            >
              <option value="2">{intl.formatMessage({ id: "Joined" })}</option>
              <option value="3">
                {intl.formatMessage({ id: "Not yet joined" })}
              </option>
            </Input>
          </FormGroup> */}

          <FormGroup>
            <Label>
              <FormattedMessage id="term" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Select
              isClearable={false}
              onChange={(e) => setCurriculumSection(e)}
              innerRef={register({ required: true })}
              name="curriculumSectionId"
              value={CurriculumSectionValue}
              placeholder={<FormattedMessage id="Select..." />}
              options={terms?.map((item, index) => {
                return {
                  value: item?.id,
                  label: `${item?.code} - ${item?.title}`,
                  number: index + 1,
                };
              })}
              className="react-select"
              classNamePrefix="select"
            />
            <small className="text-danger">
              {errors?.curriculumSectionId &&
                errors.curriculumSectionId.message}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for="Image">
              <FormattedMessage id="Image" />
              <span className="text-danger"> * </span>
            </Label>
            <Row className="align-items-end p-1">
              <Media className="mr-25" left>
                <Media
                  object
                  className="rounded mr-50 objectFit-contain"
                  src={avatar}
                  height="100"
                  width="100"
                />
              </Media>{" "}
              <Row className="flex-column px-1">
                <Button.Ripple tag={Label} className="mt-1" color="primary">
                  <FormattedMessage id="Upload" />
                  <Input
                    type="file"
                    onChange={(e) => onChange(e)}
                    hidden
                    accept="image/*"
                  />
                </Button.Ripple>
              </Row>
            </Row>
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
export default injectIntl(StaffAccountTab);
