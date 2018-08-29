import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';

const app = new Clarifai.App({
 apiKey: '8757c13887254451bad440d4b00cf3ee'
});


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse'
      }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const  clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box)
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return (
      clarifaiFaces.map(clarifaiFace => {
        return {
          leftCol: width * clarifaiFace.left_col,
          topRow: height * clarifaiFace.top_row,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      })
    )
  }
  

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes})
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input,
      {language: 'en'})
    .then(response => this.displayFaceBoxes(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false, imageUrl: ''})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  }

  render() {
    const {isSignedIn, route, boxes, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <div className='ml4 mt4' style={{display: 'flex', justifyContent: 'space-between'}}>
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        </div>
        { route === 'home' 
          ? <div>
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (route === 'signin' || route === 'signout'
              ? <div>  
                  <Signin onRouteChange={this.onRouteChange} />
                </div>
              : <div>  
                  <Register onRouteChange={this.onRouteChange} />
                </div>
            )
        }
      </div>
    );
  }
}

export default App;
