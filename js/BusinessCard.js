import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad
} from 'react-viro';

export class BusinessCard extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      }/>
    )
  }



  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker target={"businessCard"}
          onAnchorFound={this._onAnchorFound}
          onAnchorUpdated={this._onAnchorUpdated}
          onAnchorRemoved={this._onAnchorRemoved}
        >
          <ViroNode key="card">
            <ViroNode
                opacity={0} position={[0, 0, 0.1]}
                animation={{
                  name:'animateImage',
                  run: this.state.runAnimation
                  }}
              >
                <ViroFlexView
                    rotation={[-90, 0, 0]}
                    height={0.03}
                    width={0.05}
                    style={styles.card}
                    onClick={() => alert('out blue')}
                >
                  <ViroFlexView
                    onClick={() => alert('inside laranja')}
                    style={styles.subText}
                  >
                  </ViroFlexView>
                </ViroFlexView>
            </ViroNode>
            <ViroNode opacity={0} position={[0.012, 0, 0]}
              animation={{
                name:'animateViro',
                run: this.state.runAnimation
              }}
              style={{borderWidth: 1, borderColor: 'black'}}
            >
              <ViroText text="blanko.be"
                rotation={[-90, 0, 0]}
                scale={[.01, .01, .01]}
                style={styles.textStyle}
                onClick={() => {
                  console.log('acessar site blanko');
                }}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
      >
        { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() }
      </ViroARScene>
    );
  }

  _onAnchorUpdated = (a) => {
  }

  _onAnchorFound = () => {
    this.setState({
      runAnimation: true
    })
  }

  _onAnchorRemoved = () => {
    console.log('removeu');
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: 'blue'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5,
    backgroundColor: 'orange'
  }
});

ViroARTrackingTargets.createTargets({
  "businessCard" : {
    source : require('./res/blanko_cartao.jpg'),
    orientation : "Up",
    physicalWidth : 0.05,
  }
});

ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  }
});

ViroAnimations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0.05,
      opacity: 1.0
    },
      easing:"Bounce",
      duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing:"Bounce",
    duration: 500
  }
});

module.exports = BusinessCard;