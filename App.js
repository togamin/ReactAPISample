import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    //取得したデータを格納する配列。
    bookList:[]
  };

  renderCell({item}){
    return(
      <View style = {styles.listItem}>
        <Text style = {styles.listTitle}>{item}</Text>
      </View>
    );
  }

  //コンポーネントが画面上に表示された直後に呼び出される関数
  componentWillMount() {
    console.log('API');
    axios.get('https://ci.nii.ac.jp/books/opensearch/search?title=React%20Native&format=json')
    .then(response => {
      const bookList = [];
      //得た結果から欲しいデータのみを取り出す。
      const wantResults = response.data['@graph'][0].items;
      wantResults.map((data)=>{
        bookList.push(data.title)
      });
      this.setState({bookList:bookList});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data = {this.state.bookList} renderItem = {this.renderCell.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem:{
    padding:18,
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    backgroundColor:'#fff',
  },
  listTitle:{
    fontSize:18,
  }
});
