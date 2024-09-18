import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../store/action";
import EditCard from "./EditTransaction";
import { Alert } from "reactstrap";

const InvoiceEdit = () => {
  const { id } = useParams();
  const store = useSelector((state) => state.instructors);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(id));
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedInstructors !== null &&
    store.selectedInstructors !== undefined ? (
    <EditCard selected={store.selectedInstructors} />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default InvoiceEdit;
