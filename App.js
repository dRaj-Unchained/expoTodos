import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text,Animated, View, TextInput, TouchableOpacity, TouchableHighlight, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Swipeout from 'react-native-swipeout';
// import Swipeable from 'react-native-swipeable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

export default function App() {
  const [task, setTask] = useState();
  const [buttomShow, setButtomShow] = useState(true);
  const [taskItems, setTaskItems] = useState([]);
  const inputEl = useRef(null);


  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    var p = getData();

    p.then(
      function (result) { /* handle a successful result */
        console.log(result);
        setTaskItems(result);
      },
      function (error) { /* handle an error */ }
    );
    // setTaskItems([{title:"new",isComplete :false}]);
  }, []);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [buttomShow]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, task])
      setTask("");
      storeData([...taskItems, task]);
    }
    setButtomShow(true);
  }

  const handleSetTask = (text) => {
    if (text) {
      var newTask = {
        title: text,
        createdDate: "",
        isComplete: false
      };
      setTask(newTask);
    }
  }
  const deleteNote = () => {

  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    if (itemsCopy[index].isComplete)
      // itemsCopy.splice(index, 1);
      itemsCopy[index].isComplete = false;
    else
      itemsCopy[index].isComplete = true;
    setTaskItems(itemsCopy);

    storeData(itemsCopy);
  }

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 0, 0, 0],
      outputRange: [-0, 0, 0, 1],
    });
    return (
      <RectButton style={{}} onPress={()=>{}}>
        <Animated.View
          style={[
            styles.actionText,styles.leftAction,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
            <Text style={styles.addText}>X</Text>
        </Animated.View>
      </RectButton>
    );
  };
    return (
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >

          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's tasks</Text>
            <View style={styles.items}>
              {/* This is where the tasks will go! */}
              {
                taskItems.map((item, index) => {
                  //   let swipeBtns = [{
                  //     text: 'Delete',
                  //     backgroundColor: 'red',
                  //     underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                  //     onPress: () => { deleteNote(index) }
                  //   }];

                  //   const leftContent = <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  //   <Task text={item.title} isComplete={item.isComplete} />
                  // </TouchableOpacity>;

                  //   const rightButtons = [
                  //     <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
                  //     <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
                  //   ];

                  return (

                    <Swipeable key={index} renderRightActions={renderLeftActions} renderLeftActions={()=>{}} rightThreshold={100} leftThreshold={200}>
                      <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                     <Task text={item.title} isComplete={item.isComplete} />
                   </TouchableOpacity>
                    </Swipeable>
                    //   <Swipeable key={index} leftContent={leftContent} rightButtons={rightButtons}>

                    // </Swipeable>
                    //   <Swipeout right={swipeBtns}
                    //   autoClose='true'
                    //   backgroundColor= 'transparent'>
                    //    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    //     <Task text={item.title} isComplete={item.isComplete} />
                    //   </TouchableOpacity>
                    // </Swipeout>
                    //   <Swipeout right={swipeBtns}
                    //   autoClose='true'
                    //   backgroundColor= 'transparent'>
                    //   <TouchableHighlight
                    //     underlayColor='rgba(192,192,192,1,0.6)'
                    //     onPress={()=>{}} >
                    //     <View>
                    //       <View style={{}}>
                    //         <Text style={{}}> {item.title} </Text>
                    //       </View>
                    //       <Separator />
                    //     </View>
                    //   </TouchableHighlight>
                    // </Swipeout>
                  )
                })
              }
            </View>
          </View>

        </ScrollView>

        {/* Write a task */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <KeyboardAvoidingView
          // behavior={(Platform != undefined) && Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          {!buttomShow && <TextInput
            // multiline = {true}
            // numberOfLines = {4}
            style={styles.input} placeholder={'Write a task'} ref={inputEl} onSubmitEditing={() => handleAddTask()} value={task ? task.title : ""} onChangeText={text => handleSetTask(text)} />
          }{buttomShow && <TouchableOpacity onPress={() => { setButtomShow(false); }}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
          }</KeyboardAvoidingView>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      // flexDirection: 'row',
      // justifyContent: 'space-around',
      // alignItems: 'center'
      alignItems: "flex-end",
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: "100%",
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
      margin: 20,
    },
    addText: {
      fontSize: 20
    },
    leftAction:{
      width: 50,
      height: 50,
      backgroundColor: '#e55a54',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,

    }
  }); 
