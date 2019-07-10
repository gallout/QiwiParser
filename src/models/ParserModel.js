import { observable, action } from "mobx";

export default class ParserModel {
  @observable keyword = "";
  @observable vimeoTitle = [];
  @observable vimeoPhoto = [];
  @observable vimeoLink = [];
  @observable youtubeTitle = [];
  @observable youtubePhoto = [];
  @observable youtubeLink = [];

  @action handleChange = e => {
    this.props.store.keyword = e.target.value;
  };
}
