import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {

  return (
    <View style={[styles.item, props.isComplete && styles.completed]}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        {props.isComplete && <View style={styles.checkmark}><span>&#10003;</span></View>}
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
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
    margin: 6,
}

});

export default Task;