import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Touch from 'react-touch';
import RNShake from 'react-shake';

// import Image from './assets/icons/eco-light-off.png' 

const App = () => {
  const [toggle, setToggle] = useState(false)

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() =>{
    // liga flash do celular
    Touch.switchState(toggle);
  },[toggle]);

  useEffect(() =>{
    // quando o celular for chacoalhado, usaremos o toggle
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });

    return() => subscription.remove();
  },[]);

  return (
    <View style={toggle ? style.containerLight : style.container }>
      <TouchableOpacity onPress={handleChangeToggle}>

        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={toggle
            ?require('./assets/icons/eco-light.png') 
            :require('./assets/icons/eco-light-off.png')}/>
      </TouchableOpacity>
    </View>);
}

export default App;


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightingOn: {
    resizeMode: 'container',
    alignItems: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'container',
    alignItems: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
})