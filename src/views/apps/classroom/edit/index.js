import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByClassroomId } from "../store/action";
import EditCard from "./EditClassroom";
import { Alert } from "reactstrap";

const ClassroomEdit = () => {
  const { id } = useParams();
  const store = useSelector((state) => state.classrooms);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByClassroomId(id));
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedClassroom !== null &&
    store.selectedClassroom !== undefined ? (
    <EditCard selected={store.selectedClassroom} />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default ClassroomEdit;
