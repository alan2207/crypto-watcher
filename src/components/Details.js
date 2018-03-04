import React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import {Text, Divider, Button} from 'react-native-elements';

class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      saved: false,
    };
  }

  async componentDidMount() {
    const id = this.props.navigation.state.params.data.id;
    const isSaved = await this.checkExistence(id);
    this.setState({saved: isSaved});
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.name : 'A Nested Details Screen',
    }
  };

  async checkExistence(id) {
    const currentFavorites = await AsyncStorage.getItem('favorites');

    return JSON.parse(currentFavorites).some((favorite) => {
      return favorite.id === id;
    });
  }

  async addFavorite(favorite) {
    const currentFavorites = await AsyncStorage.getItem('favorites');

    if(!currentFavorites) {
      const values = JSON.stringify([favorite]);
      await AsyncStorage.setItem('favorites', values);
      return;
    } else {
        if(await this.checkExistence(favorite.id)) {
          return false;
        }
        const values = [...JSON.parse(currentFavorites), favorite];
        await AsyncStorage.setItem('favorites', JSON.stringify(values));
      }
      this.setState({saved: true});
      this.props.navigation.push('Favorites');
  }

  async removeFavorite(favorite) {
    const currentFavorites = await AsyncStorage.getItem('favorites');
    const newFavorites = JSON.parse(currentFavorites).filter((item) => {
      return item.id !== favorite.id;
    });
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    this.setState({saved: false});
    this.props.navigation.push('Favorites');
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const {navigation} = this.props;
    const { name, id, symbol, price_usd, percent_change_1h, percent_change_24h, percent_change_7d } = this.props.navigation.state.params.data;
    const {data} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text h1 style={{color: 'white'}}>{name} ({symbol})</Text>
        <Divider style={{ backgroundColor: 'white' }} />

        <Text style={styles.centered} h3>&#36; {price_usd}</Text>

        <Divider style={{ backgroundColor: 'white' }} />
        <View style={styles.row}>
          <View>
            <Text h4 style={{color: 'white'}}>1 hour</Text>
            <Text h4 style={ percent_change_1h > 0 ? {color: 'green'} : {color: 'red'}}>{percent_change_1h}&#37;</Text>
          </View>
          <View >
            <Text h4 style={{color: 'white'}}>24 hours</Text>
            <Text h4 style={ percent_change_24h > 0 ? {color: 'green'} : {color: 'red'}}>{percent_change_24h}&#37;</Text>
          </View>

          <View>
            <Text h4 style={{color: 'white'}}>7 days</Text>
            <Text h4 style={ percent_change_7d > 0 ? {color: 'green'} : {color: 'red'}}>{percent_change_7d}&#37;</Text>
          </View>
        </View>
          {this.state.saved ?
            <Button
              raised
              icon={{name: 'minus', type: 'entypo'}}
              title='Remove From Favorites'
              onPress={() => this.removeFavorite(data)}
            />
            :
            <Button
              raised
              icon={{name: 'plus', type: 'entypo'}}
              title='Add To Favorites'
              onPress={() => this.addFavorite(data)}
            />
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'space-between',
    backgroundColor: '#1e3559',
    padding: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  centered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white'
  }
})

export default Details;
