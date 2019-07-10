import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import Card from "./CardDecorator";
import $ from "jquery";

const Youtube_apikey = "AIzaSyBoESd9O44wtPnSv-o81WTl7e4vZdVjkCU";
const Vimeo_apikey = "7cb4bc54de02cffbb23dcae186a69db4";

@observer
class Parser extends Component {
  @action handleChange = e => {
    this.props.store.keyword = e.target.value;
  };

  clicked() {
    const VimeoUrl = `https://api.vimeo.com/videos?query=${
      this.props.store.keyword
    }&access_token=${Vimeo_apikey}`;
    const YouTubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${
      this.props.store.keyword
    }&type=video&key=${Youtube_apikey}`;
    fetch(YouTubeUrl)
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        //const youtubeResult = responseJson.items.map(obj=> "https://www.youtube.com/embed/"+ obj.id.videoId)
        this.props.store.youtubeTitle = responseJson.items.map(
          obj => obj.snippet.title
        );
        this.props.store.youtubePhoto = responseJson.items.map(
          obj => obj.snippet.thumbnails.medium.url
        );
        this.props.store.youtubeLink = responseJson.items.map(
          obj => "https://www.youtube.com/watch?v=" + obj.id.videoId
        );
        //this.setState({ youtubeTitle });
        //this.setState({ youtubePhoto });
        //this.setState({ youtubeLink });
      })
      .catch(error => {
        console.error(error);
      });
    fetch(VimeoUrl)
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        //const vimeoResult = responseJson.data.map(obj=> "https://player.vimeo.com"+ obj.uri.replace('videos','video'))
        this.props.store.vimeoTitle = responseJson.data.map(obj => obj.name);
        this.props.store.vimeoPhoto = responseJson.data.map(
          obj => obj.pictures.sizes[2].link
        );
        this.props.store.vimeoLink = responseJson.data.map(obj => obj.link);
        //this.setState({ vimeoTitle });
        //this.setState({ vimeoPhoto });
        //this.setState({ vimeoLink });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidUpdate() {
    $("iframe").each(function() {
      if ($(this).attr("src") == undefined) {
        $(this)
          .parent(".frame")
          .parent(".overflow")
          .parent("#card-id")
          .hide();
      } else {
        $(this)
          .parent(".frame")
          .parent(".overflow")
          .parent("#card-id")
          .show();
      }
    });
  }

  componentWillMount() {
    document.title = "Qiwi Parser";
  }

  render() {
    //console.log(this.state.keyword);
    //console.log(this.state.youtubeLink);
    return (
      <div align="center" width="100%">
        <input
          type="text"
          placeholder="Поиск по YouTube и Vimeo..."
          value={this.props.store.keyword}
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

        {this.props.store.youtubePhoto.map((item, idx) => {
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
                src={this.props.store.vimeoPhoto[idx]}
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
                  title={this.props.store.youtubeTitle[idx]}
                  className="btn btn-outline-danger"
                  resource="Youtube"
                  link={this.props.store.youtubeLink[idx]}
                />
              </div>

              <div className="col-md-4">
                <Card
                  imgsrc={VimeoFrame}
                  title={this.props.store.vimeoTitle[idx]}
                  className="btn btn-outline-primary"
                  resource="Vimeo"
                  link={this.props.store.vimeoLink[idx]}
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
