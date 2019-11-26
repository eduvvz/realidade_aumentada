'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
} from 'react-viro';

const createReactClass = require('create-react-class');


const BusinessCard = createReactClass({
  getInitialState() {
    return {}
  },

  render: function() {
    return (
      <ViroARScene>

      </ViroARScene>
    );
  },
});

module.exports = BusinessCard;
