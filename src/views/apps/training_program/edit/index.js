import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByTrainingProgramId } from "../store/action";
import EditCard from "./EditTrainingProgram";
import { Alert } from "reactstrap";

const TrainingProgramEdit = () => {
  const { id } = useParams();
  const store = useSelector((state) => state.training_programs);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByTrainingProgramId(id));
  }, []);
  useEffect(() => {
    if (store?.status == 200) {
      history.goBack();
    }
  }, [store?.status]);

  return store.selectedTrainingProgram !== null &&
    store.selectedTrainingProgram !== undefined ? (
    <EditCard selected={store.selectedTrainingProgram} />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Not found</h4>
    </Alert>
  );
};

export default TrainingProgramEdit;
