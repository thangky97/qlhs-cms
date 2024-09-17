import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByCourseId } from "../store/action";
import EditCard from "./EditCourse";
import { Alert } from "reactstrap";

const InvoiceEdit = () => {
  const { id } = useParams();
  const store = useSelector((state) => state.courses);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByCourseId(id));
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedCourse !== null && store.selectedCourse !== undefined ? (
    <EditCard selected={store.selectedCourse} />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default InvoiceEdit;
