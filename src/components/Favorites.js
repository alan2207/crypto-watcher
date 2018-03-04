import React from 'react';
import {
  View,
  ScrollView,
  AsyncStorage,
  Button
} from 'react-native';

import { List, ListItem} from 'react-native-elements';

import {API_URL} from '../config';



class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  static navigationOptions = {
    title: 'Favorites',
    headerStyle: {
    },
  };

  async loadFavorites() {
    const currentFavorites = await AsyncStorage.getItem('favorites');
    this.setState({favorites: JSON.parse(currentFavorites)});
  }

  componentDidMount() {
    this.loadFavorites();
  }

  // loads updated data for saved coins
  handleNavigation(navigate, id) {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => navigate('Details', { data: data[0] }));
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Button title="Home" onPress={() => navigate('Home')} />
        <ScrollView>
          <List containerStyle={{marginBottom: 20}}>
            {
              this.state.favorites && this.state.favorites.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}
                  onPress={() => this.handleNavigation(navigate, l.id)}
                />
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default Favorites;
