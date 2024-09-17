import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import classnames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import "react-phone-number-input/style.css";
import { getDataUser } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import validateOptions from "../../../../constants/validate";
import { addNotification } from "../store/action";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { validateEditor } from "../../../../helper/common";

const SidebarNotification = ({
  open,
  toggleSidebar,
  intl,
  disable,
  editorState,
  setDisable,
  setEditorState,
}) => {
  const store = useSelector((state) => state.notification);
  const [changeSelect, setChangeSelect] = useState();
  const { user } = useSelector((state) => state.notification);
  const product = useSelector((state) => state.products);
  const lang = useSelector((state) => state.common.language);
  const [showTable, setShowTable] = useState(false);
  const [changeProduct, setChangeProduct] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  const dispatch = useDispatch();
  const cate = yup.object({
    productId: yup
      .number()
      .required(<FormattedMessage id="The course field is required" />),
    code: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, {
        message: <FormattedMessage id="validate field code" />,
      })
      .required(<FormattedMessage id="The code field is required" />),
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user) {
      let product = [];
      for (let i = 0; i < user?.length; i++) {
        if (user[i]?.transaction && user[i]?.transaction?.status === "paid") {
          product.push(user[i]?.user);
        }
      }

      setUsers(product);
    }
  }, [user]);
  const columns = [
    {
      name: <FormattedMessage id="ID" />,
      selector: "id",
      cell: (row) => {
        let number = row.id;
        return (number = ("00000" + number).slice(-5));
      },
    },
    {
      name: <FormattedMessage id="fullname" />,
      selector: "name",
      cell: (row) => {
        return row.first_name + " " + row.last_name || "";
      },
    },
  ];
  const [message_content, setContent] = useState(" ");
  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const handleOnchangeStateEditor = (data) => {
    setValueDescription(data);
    const html = data && draftToHtml(convertToRaw(data.getCurrentContent()));
    setContent(html);
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const handleError = () => {
    setIsSubmit(true);
    if (validateEditor(message_content)) {
      setEditorState({
        classError: "invalid-editor is-invalid form-control",
        message_contentError: <FormattedMessage id="The content is required" />,
      });
    } else {
      setEditorState(null);
    }
  };
  useEffect(() => {
    if (isSubmit) {
      const check = validateEditor(message_content);

      if (check === true) {
        setEditorState({
          classError: "invalid-editor is-invalid form-control",
          message_contentError: (
            <FormattedMessage id="The content is required" />
          ),
        });
      } else {
        setEditorState({});
      }
    }
  }, [message_content, isSubmit]);
  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row.id));
  };
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

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    if (validateEditor(message_content)) {
      setEditorState({
        classError: "invalid-editor is-invalid form-control",
        message_contentError: <FormattedMessage id="The content is required" />,
      });
      return;
    }

    try {
      if (showTable) {
        dispatch(
          addNotification(selectedRows, {
            ...values,
            status: 1,
            message_content: undefined,
            lang,
          })
        );
      } else {
        let allUser = [];
        users.forEach((item) => {
          allUser.push(item?.id);
        });

        dispatch(
          addNotification(allUser, {
            ...values,
            message_content: undefined,
            lang,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (changeProduct) {
      dispatch(
        getDataUser({
          filter: {
            product_id: changeProduct,
          },

          order: [
            {
              key: "id",
              value: "asc",
            },
          ],
        })
      );
    }
  }, [dispatch, changeProduct]);

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add new announcements" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit, handleError)}>
        <FormGroup>
          <Label for="Code">
            <FormattedMessage id="code_notification" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="code"
            id="code"
            placeholder=""
            innerRef={register()}
            onBlur={() => {
              let name = document.getElementById("code");
              if (name && name.value) {
                name.value = name.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["code"] })}
          />
          <small className="text-danger">
            {errors?.code && errors.code.message}
          </small>
          {errors?.name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid name" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="message_content">
            <FormattedMessage id="message_content" />{" "}
            <span className="text-danger">*</span>
          </Label>

          <Editor
            toolbar={{
              options: ["inline", "textAlign"],
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline"],
              },
            }}
            stripPastedStyles={true}
            editorState={valueDescription}
            onEditorStateChange={(data) => handleOnchangeStateEditor(data)}
            toolbarClassName="toolbarClassName"
            wrapperClassName={"wrapperClassName " + editorState?.classError}
            editorClassName="editorClassName "
            name="message_content"
            innerRef={register()}
          />
          {editorState && (
            <small className="text-danger">
              {editorState.message_contentError}
            </small>
          )}
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="Course" />
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
                  placeholder={<FormattedMessage id="Select Course" />}
                  className={classnames(
                    "react-select",
                    !changeSelect
                      ? {
                          "is-invalid": errors["productId"],
                        }
                      : ""
                  )}
                  options={product?.data?.map((item, index) => {
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
                    setChangeSelect(e?.value);
                    setChangeProduct(e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.productId && errors.productId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label for="message_type">
            <FormattedMessage id="message_type" />{" "}
          </Label>
          <Input
            type="select"
            name="message_type"
            id="message_type"
            innerRef={register({ required: true })}
            onChange={(e) => {
              setShowTable(e.target.value === "0");
            }}
          >
            {/* <option value="1">{intl.formatMessage({ id: "1 nguoi" })}</option>
            <option value="0">
              {intl.formatMessage({ id: "nhieu người" })}
            </option> */}
            <option value="1">{intl.formatMessage({ id: "much" })}</option>
            <option value="0">{intl.formatMessage({ id: "one" })}</option>
          </Input>
        </FormGroup>
        {/* {showTable && <CustomTable />} */}
        {showTable && (
          <DataTable
            columns={columns}
            data={users}
            noHeader={true}
            responsive
            selectableRows
            onSelectedRowsChange={handleRowSelect}
            highlightOnHover
            className="react-dataTable"
            noDataComponent={
              <div className="sc-fznWqX gnahTY">
                <div className="sc-AxjAm gIMaKV rdt_Table" role="table">
                  <div className="sc-fzqARJ icdHOq">
                    <div
                      style={{
                        padding: "25px ",
                        textAlign: "center",
                        color: "black",
                        background: "white",
                      }}
                    >
                      <FormattedMessage
                        id={"There are no records to display"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        )}

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

export default injectIntl(SidebarNotification);
