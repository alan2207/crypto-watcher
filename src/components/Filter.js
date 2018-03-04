import React from 'react';

import {View} from 'react-native';

import {SearchBar} from 'react-native-elements';

class Filter extends React.Component {

  render() {
    const { filter } = this.props;
    return (
      <View>
        <SearchBar
          noIcon
          onChangeText={(text) => filter(text)}
          placeholder='Type Here...' />
      </View>
    );
  }
}

export default Filter;
