import { Training } from "../types/training.model";
import { User } from "../types/user.model";
import listUsers from "../service/listUsers";

export class ListTrainings {
  public listTrainings: Training[];

  constructor(listTrainings: Training[]) {
    this.listTrainings = listTrainings;
  }

  public addTraining(training: Training) {
    this.listTrainings.push(training);
    this.listTrainings = this.listTrainings.sort((a, b) =>
      a.day.localeCompare(b.day)
    );
  }

  public removeTraining(trainingId: string) {
    this.listTrainings = this.listTrainings.filter(
      (item) => item.id !== trainingId
    );
  }

  public addMember(trainingId: string, user: User) {
    let foundUser: number = listUsers.listUsers.findIndex(
      (item) => item.id === user.id
    );
    listUsers.listUsers[foundUser].numTrainings = --listUsers.listUsers[
      foundUser
    ].numTrainings;

    let foundIndex: number = this.listTrainings.findIndex(
      (item) => item.id === trainingId
    );
    this.listTrainings[foundIndex].members.push(user);
    this.listTrainings[foundIndex].freeSpace = --this.listTrainings[foundIndex]
      .freeSpace;
  }

  public addFirstTraining(trainingId: string, user: User) {
    let foundIndex: number = this.listTrainings.findIndex(
      (item) => item.id === trainingId
    );
    this.listTrainings[foundIndex].members.push(user);
    this.listTrainings[foundIndex].freeSpace = --this.listTrainings[foundIndex]
    .freeSpace;
  }

  public removeMember(trainingId: string, memberId: string) {
    let foundIndex: number = this.listTrainings.findIndex(
      (item) => item.id === trainingId
    );

    this.listTrainings[foundIndex].freeSpace = ++this.listTrainings[foundIndex]
      .freeSpace;
    this.listTrainings[foundIndex].members = this.listTrainings[
      foundIndex
    ].members.filter((member) => member.id !== memberId);
  }
}
