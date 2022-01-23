import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {

  return (
    <View style={[styles.item]}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={()=>props.completeTask(props.index)} >

        <View style={styles.square}></View>
        {props.isComplete && <View style={styles.checkmark}><span>&#10003;</span></View>}
        </TouchableOpacity>	

        <Text style={[styles.itemText, props.isComplete && styles.completed]}>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={()=>props.deleteTask(props.index)} >

      {/* <View style={styles.circular}></View> */}
      {<View style={styles.cross}><span>&#10060;</span></View>}
      </TouchableOpacity>	
          </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    marginRight: 15,
    backgroundColor: "#fff",
    borderColor: "#55BCF6",
    borderRadius: 7,
    padding: 8,
    borderWidth: 4,
  },
  itemText: {
    maxWidth: '80%',
    fontWeight: "bold"
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
    opacity: 0,

  },
  completed: {
    opacity: 0.5,
    textDecorationLine: "line-through",
    textDecorationStyle: 'solid',
  },
  checkmark : {
    position: "absolute",
    marginLeft: 6,
},
cross:{
  fontSize:10,
  color:"#000",
}

});

export default Task;