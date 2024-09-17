import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getById, getData } from "../store/action";
import EditTransactionCloud from "./EditTransactionCloud";

const TransactionCloudEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const store = useSelector((state) => state.transactionsToken);
  const conmmon = useSelector((state) => state.common);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(id));
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     getData({
  //       filter: {},

  //       order: {
  //         key: "createdAt",
  //         value: "desc",
  //       },
  //     })
  //   );
  // }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store?.selectedTransactionToken !== null &&
    store?.selectedTransactionToken !== undefined ? (
    <div className="invoice-edit-wrapper">
      <EditTransactionCloud
        data={data}
        selected={store?.selectedTransactionToken}
      />
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default TransactionCloudEdit;
