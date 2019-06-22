import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
  _goBack = () => this.props.navigation.navigate("find");

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
    return (
      <Appbar.Header style={styles.container}>
        <Appbar.BackAction
          color='#ffff'
          onPress={this._goBack}
        />
        <Appbar.Content
          title={this.props.title}
          titleStyle={{ textAlign: 'center', color: '#ffff' }}
        />
        <Appbar.Action icon="more-vert" onPress={this._onMore} color='#ffff' />
      </Appbar.Header>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff8c1a'
  },
});
