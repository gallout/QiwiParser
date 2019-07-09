import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import ytlogo from "../pictures/yt_logo.png";
import vimeologo from "../pictures/vimeo_logo.png";
import Card from "../components/CardDecorator";

const Youtube_apikey = "AIzaSyBk0iw15EM9IPw542sgLFZXOPbqDzCXm0E";
const Vimeo_apikey = "7cb4bc54de02cffbb23dcae186a69db4";
class Parser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      vimeoTitle: [],
      vimeoPhoto: [],
      youtubeTitle: [],
      youtubePhoto: []
    };
    this.clicked = this.clicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clicked() {
    const VimeoUrl = `https://api.vimeo.com/videos?query=${
      this.state.keyword
    }&access_token=${Vimeo_apikey}`;
    const YouTubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${
      this.state.keyword
    }&type=video&key=${Youtube_apikey}`;
    fetch(YouTubeUrl)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        //const youtubeResult = responseJson.items.map(obj=> "https://www.youtube.com/embed/"+ obj.id.videoId)
        const youtubeTitle = responseJson.items.map(obj => obj.snippet.title);
        const youtubePhoto = responseJson.items.map(
          obj => obj.snippet.thumbnails.medium.url
        );
        this.setState({ youtubeTitle });
        this.setState({ youtubePhoto });
      })
      .catch(error => {
        console.error(error);
      });
    fetch(VimeoUrl)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        //const vimeoResult = responseJson.data.map(obj=> "https://player.vimeo.com"+ obj.uri.replace('videos','video'))
        const vimeoTitle = responseJson.data.map(obj => obj.name);
        const vimeoPhoto = responseJson.data.map(
          obj => obj.pictures.sizes[2].link
        );
        this.setState({ vimeoTitle });
        this.setState({ vimeoPhoto });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  render() {
    //console.log(this.state.keyword);
    return (
      <div align="center" width="100%">
        <input
          type="text"
          placeholder="Поиск по YouTube и Vimeo..."
          value={this.state.keyword}
          onChange={this.handleChange}
          required
          onKeyPress={event => {
            if (event.keyword === " ") {
              console.log("value", event.target.value);
            }
            if (event.key === "Enter") {
              this.clicked();
            }
          }}
        />

        {this.state.youtubePhoto.map((item, idx) => {
          var YouTubeFrame = (
            <div key={idx} className="frame">
              <iframe
                width="340"
                height="200"
                src={item}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          );
          var VimeoFrame = (
            <div key={idx} className="frame">
              <iframe
                width="340"
                height="200"
                src={this.state.vimeoPhoto[idx]}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          );
          return (
            <div className="maincard" key={idx}>
              <div className="col-md-4">
                <Card
                  imgsrc={YouTubeFrame}
                  title={this.state.youtubeTitle[idx]}
                  className="btn btn-outline-danger"
                  resource="Youtube"
                />
              </div>

              <div className="col-md-4">
                <Card
                  imgsrc={VimeoFrame}
                  title={this.state.vimeoTitle[idx]}
                  className="btn btn-outline-primary"
                  resource="Vimeo"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Parser;
