import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByTimetableId } from "../store/action";
import EditCard from "./EditTimetable";
import { Alert } from "reactstrap";

const TimetableEdit = () => {
  const { id } = useParams();
  const store = useSelector((state) => state.timetable);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByTimetableId(id));
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedTimetable !== null &&
    store.selectedTimetable !== undefined ? (
    <EditCard selected={store.selectedTimetable} />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default TimetableEdit;
