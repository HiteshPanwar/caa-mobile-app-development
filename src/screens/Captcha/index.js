import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Canvas from 'react-native-canvas';
export default class CaptchaScreen extends Component {
  constructor(props) {
    super(props)
  this.state=
  {
    captcha:"",
    new_captcha:""
  }
  }
  handleCanvas = async (canvas) => {
    var charsArray =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    
    if(canvas!==null)
    {
      var ctx = await canvas.getContext("2d");
      ctx.font = "30px Georgia";
      ctx.strokeText(captcha.join(""), 0, 30);
      captcha=captcha.join(""), 0, 30
      this.setState({
        captcha:captcha
      })
    }
  }
  
  componentDidMount()
{
//    this.handleCanvas()
}
  render() {
    return (
      <View>
          <Canvas ref={this.handleCanvas}/>
    <Text> CaptchScreen {this.state.captcha}</Text>
      </View>
    );
  }
}
