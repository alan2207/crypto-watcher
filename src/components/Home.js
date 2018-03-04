import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements'


import {connect} from 'react-redux';

import * as actions from '../redux/actions';

import Filter from './Filter';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
    },
  };

  componentDidMount() {
    this.props.fetchCoins();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Filter filter={this.props.fetchCoins.bind(this)}/>
        <Button title="Favorites" onPress={() => navigate('Favorites')} />
        <ScrollView>
          <List containerStyle={{marginBottom: 20}}>
            {
              this.props.coins.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}
                  onPress={() => navigate('Details', { data: l })}
                />
              ))
            }
          </List>
        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = (state) => (
  {coins: state.coins}
);


export default connect(mapStateToProps, actions)(Home);
