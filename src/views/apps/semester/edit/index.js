import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBySemesterId } from "../store/action";
import EditCard from "./EditSemester";
import { Alert } from "reactstrap";

const SemesterEdit = () => {
  const { id } = useParams();
  const store = useSelector((state) => state.semesters);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBySemesterId(id));
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedSemester !== null &&
    store.selectedSemester !== undefined ? (
    <EditCard selected={store.selectedSemester} />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default SemesterEdit;
