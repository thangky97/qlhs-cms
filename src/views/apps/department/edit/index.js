import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByDepartmentId } from "../store/action";
import EditCard from "./EditDepartment";
import { Alert } from "reactstrap";

const DepartmentEdit = () => {
  const { id } = useParams();
  const store = useSelector((state) => state.department);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByDepartmentId(id));
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedDepartment !== null &&
    store.selectedDepartment !== undefined ? (
    <EditCard selected={store.selectedDepartment} />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default DepartmentEdit;
