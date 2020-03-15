import React from 'react';
import AppContainer from './src/navigation/AppNavigator';

export default class App extends React.Component{
  state = {
    assetsLoaded: false,
  };

  constructor(props){
    super(props)
  }

  render(){
    return (
      <AppContainer/>
    );
  }
}