import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getById, getData } from "../store/action";
import EditCard from "./EditTransaction";

const InvoiceEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const store = useSelector((state) => state.transactions);
  const conmmon = useSelector((state) => state.common);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getById(
        id
        //   , {
        //   lang: conmmon?.language,
        // }
      )
    );
  }, []);

  useEffect(() => {
    dispatch(
      getData({
        filter: {},

        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedTransaction !== null &&
    store.selectedTransaction !== undefined ? (
    <div className="invoice-edit-wrapper">
      <EditCard data={data} selected={store?.selectedTransaction} />
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default InvoiceEdit;
