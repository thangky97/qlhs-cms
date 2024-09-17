import { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Input, Row, Table } from "reactstrap";
import { getMoneyByLang, number_to_price } from "../../../../helper/common";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { ChevronDown } from "react-feather";
import { columns } from "./columns";
import ExtensionsHeader from "@components/extensions-header";

import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "react-slidedown/lib/slidedown.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatDateTime } from "../../../../utility/Utils";
import { getData, updateStaff } from "../store/action";

const EditTransaction = ({ selected, intl }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.transactions);
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(() => {
    if (store?.data?.data) {
      if (store?.data?.data?.length > 0) {
        const userTransaction = store?.data?.data.find((item) => {
          return item?.id === Number(id);
        });
        setUser(userTransaction);
      }
    }
  }, [store?.data]);
  const updateTransaction = (status) => {
    let check = false;
    Swal.fire({
      title: intl.formatMessage({ id: "Are you sure about this transaction?" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: intl.formatMessage({ id: "submit" }),
      cancelButtonText: intl.formatMessage({
        id: "Cancel",
      }),
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateStaff({
            transactionId: parseInt(user.id),
            status: status,
          })
        );
      }
    });
  };

  return (
    <Card className="invoice-preview-card mb-0">
      <Row>
        <Col xs={12} sm={10}>
          <CardBody className="invoice-padding px-3">
            <Row className="invoice-spacing">
              <Col className="p-0 mt-xl-0 mt-2" lg="4">
                <h6 className="mb-2">
                  <FormattedMessage id={"User Details"} />:
                </h6>
                <table>
                  <tbody>
                    <tr>
                      <td className="pr-1">
                        <FormattedMessage id={"username"} />:
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          {user?.user_payment}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="pr-1">
                        <FormattedMessage id={"Email"} />:
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          {user?.email}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="pr-1">
                        <FormattedMessage id={"phoneNumber"} />:
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          {user?.phone}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-1">
                        <FormattedMessage id={"address"} />:
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          {user?.address}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-1">
                        <FormattedMessage id={"city code"} />:
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          {user?.zip_code}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-1">
                        <FormattedMessage id={"Note"} />:
                      </td>
                      <td>
                        <span className="font-weight-bolder">{user?.note}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </CardBody>
        </Col>
      </Row>

      <ExtensionsHeader title={<FormattedMessage id="Transaction Details" />} />

      {selected?.length > 0 && (
        <Card>
          <DataTable
            noHeader
            // subHeader
            responsive
            // highlightOnHover
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
            paginationServer
            columns={columns}
            // sortIcon={<ChevronDown />}
            className="react-dataTable"
            data={selected}
          />
        </Card>
      )}

      <Row className="justify-content-end m-2">
        {user?.status === "pending" ? (
          <>
            <Button.Ripple
              color="success"
              className="mx-1"
              onClick={() => updateTransaction("paid")}
            >
              <FormattedMessage id={"Accept"} />
            </Button.Ripple>
            <Button.Ripple
              color="danger"
              onClick={() => updateTransaction("failed")}
            >
              <FormattedMessage id={"Reject"} />
            </Button.Ripple>
            <Button.Ripple
              color="secondary"
              className="mx-1"
              onClick={() => history.goBack()}
            >
              <FormattedMessage id={"Go back"} />
            </Button.Ripple>
          </>
        ) : (
          <Button.Ripple
            color="secondary"
            className="mx-1"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id={"Go back"} />
          </Button.Ripple>
        )}
      </Row>
    </Card>
  );
};

export default injectIntl(EditTransaction);
