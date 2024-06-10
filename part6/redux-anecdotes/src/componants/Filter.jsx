import { useDispatch } from "react-redux";
import { filterInpt } from "../reducers/filterReducer";
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(filterInpt(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default Filter;
