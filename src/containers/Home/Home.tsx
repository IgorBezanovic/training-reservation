import React, { useState } from "react";
import listTrainings from "../../service/listTrenings";
import listUsers from "../../service/listUsers";
import { Training } from "../../types/training.model";
import AllTrainings from "../../components/AllTrainings/allTrainings";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import Popup from "../../common/Dialog/dialog";
import AddExtraTraining from "../../components/Dialogs/AddExtraTraining";
import { User } from "../../types/user.model";
import {
  ADD_TRAINING,
  ALL_FIELDS_FILLED_TRAINING,
  DELETE_DAILY_TRAINING,
  DELETE_FROM_LIST,
  ENTER_THE_LAST_NAME,
  ENTER_THE_NAME,
  REQUIRED_INFO,
  SCHEDULING_TRAINING,
  SEATS_FILLED,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_DELETE,
  TRAINING_SUCCESSFULLY_ADDED,
  TRAINING_SUCCESSFULLY_DELETED,
} from "../../common/constants";

const Home: React.FC = () => {
  const currentId: string = localStorage.getItem("id")!;
  const userList = listUsers.listUsers;
  let user: User | undefined = userList.find((item) => item.id === currentId);
  const [listMembers, setMembers] = useState<Training[]>(
    listTrainings.listTrainings
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  let [newTraining, setValue] = useState<Training>({
    id: "",
    day: "",
    startHours: "",
    freeSpace: 0,
    extraTermin: true,
    members: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof Training
  ) => {
    setValue({
      ...newTraining,
      [field]: e.target.value,
    });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const popupLogic = (title: string, content: string) => {
    togglePopup();
    setTitle(title);
    setContent(content);
    setTimeout(() => setIsOpen(false), 3000);
  };

  const removeMember = (memberId: string, trainingId: string) => {
    listTrainings.removeMember(trainingId, memberId);
    let newList: Training[] = [...listTrainings.listTrainings];
    setMembers(newList);
    popupLogic(DELETE_FROM_LIST, SUCCESSFULLY_DELETE);
  };

  const addMember = (id: string) => {
    let freeSpaceIndex: number = listTrainings.listTrainings.findIndex(
      (item) => item.id === id
    );

    if (listTrainings.listTrainings[freeSpaceIndex].freeSpace) {
      let newUser: User = {
        id: uuidv4(),
        username: "",
        lastName: "",
        password: "12345678",
        role: "member",
        numTrainings: 1,
      };

      newUser.username = window.prompt(ENTER_THE_NAME, "Probni")!;
      if (newUser.username !== null) {
        newUser.lastName = window.prompt(ENTER_THE_LAST_NAME, "trening")!;
        if (newUser.lastName === null) {
          return;
        }
      } else {
        return;
      }

      listTrainings.addFirstTraining(id, newUser);
      let newList: Training[] = [...listTrainings.listTrainings];
      setMembers(newList);
      popupLogic(SCHEDULING_TRAINING, SUCCESSFULLY_ADDED);
    } else {
      popupLogic(SCHEDULING_TRAINING, SEATS_FILLED);
    }
  };

  const addTraining = () => {
    if (
      newTraining.day !== "" &&
      newTraining.startHours !== "" &&
      newTraining.freeSpace !== 0
    ) {
      newTraining.id = uuidv4();
      listTrainings.addTraining(newTraining);
      let newList: Training[] = [...listTrainings.listTrainings];
      setMembers(newList);
      handleClose();
      popupLogic(ADD_TRAINING, TRAINING_SUCCESSFULLY_ADDED);
    } else {
      popupLogic(REQUIRED_INFO, ALL_FIELDS_FILLED_TRAINING);
    }
  };

  const removeTraining = (id: string) => {
    listTrainings.removeTraining(id);
    let newList: Training[] = [...listTrainings.listTrainings];
    setMembers(newList);
    popupLogic(DELETE_DAILY_TRAINING, TRAINING_SUCCESSFULLY_DELETED);
  };

  return (
    <div className="wrapper-home">
      <h1 className="welcome-title">Welcome, {user?.username}</h1>

      {user?.role === "admin" ? (
        <div className="wrapper-content">
          <button
            className="submit add-training green"
            onClick={() => handleClickOpen()}
            style={{ margin: "10px 0" }}
          >
            Add Training
          </button>
          {listMembers.map((training) => (
            <AllTrainings
              key={training.id}
              training={training}
              removeTraining={removeTraining}
              addMember={addMember}
              removeMember={removeMember}
            />
          ))}
          <Popup
            title={popupTitle}
            content={popupContent}
            handleClose={togglePopup}
            open={isOpen}
            addFunction={togglePopup}
          > </Popup>
          <AddExtraTraining
            title={ADD_TRAINING}
            content={REQUIRED_INFO}
            handleClose={handleClose}
            open={open}
            addTraining={addTraining}
            handleChange={handleChange}
            newTraining={newTraining}
          />
        </div>
      ) : (
        <div>
          <p>You can read more about our organizations here:</p>
          <a href="https://www.levi9.com/">Levi9</a>
          <a href="https://inside.rs.levi9.com/">Levi9 - inside</a>
          <a href="https://www.crossfit.com/">CrossFit</a>
        </div>
      )}
    </div>
  );
};

export default Home;
