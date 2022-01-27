import TextField from "@mui/material/TextField";
import Dialog from "../../../common/Dialog/dialog";
import { Values } from "../../../types/values.model";

const EditNumTrainings = ({
  title,
  content,
  handleClose,
  open,
  addTraining,
  handleChangeUser,
  user,
}: {
  title: string;
  content: string;
  handleClose: () => void;
  open: boolean;
  addTraining: () => void;
  handleChangeUser: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof Values
  ) => void;
  user: Values;
}) => (
  <Dialog
    title={title}
    content={content}
    handleClose={handleClose}
    open={open}
    addFunction={addTraining}
  >
    <TextField
      margin="dense"
      id="username"
      label="Enter a Name of user:"
      type="text"
      fullWidth
      variant="standard"
      onChange={(e) => handleChangeUser(e, "username")}
      value={user.username}
    />
    <label className="radio-label">
      Student Paket - 12 Treninga
      <input
        type="radio"
        value={12}
        className="radio-button"
        onChange={(e) => handleChangeUser(e, "numTrainings")}
      />
    </label>
    <label className="radio-label">
      Regular Paket - 16 treninga
      <input
        type="radio"
        value={16}
        className="radio-button"
        onChange={(e) => handleChangeUser(e, "numTrainings")}
      />
    </label>
    <label className="radio-label">
      Elit Paket - 20 Treninga
      <input
        type="radio"
        value={20}
        className="radio-button"
        onChange={(e) => handleChangeUser(e, "numTrainings")}
      />
    </label>
  </Dialog>
);
export default EditNumTrainings;
