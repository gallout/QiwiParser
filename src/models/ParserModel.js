import { observable, action } from "mobx";

export default class ParserModel {
  @observable keyword = "";
  @observable vimeoTitle = [];
  @observable vimeoPhoto = [];
  @observable vimeoLink = [];
  @observable youtubeTitle = [];
  @observable youtubePhoto = [];
  @observable youtubeLink = [];
}
