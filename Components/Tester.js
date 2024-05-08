// import {View, Text, Button} from 'react-native';
// import React, {useState} from 'react';

// const Tester = () => {
//   const data = [
//     {
//       id: 5,
//       picPath: '/Media/Words/images/ball.jpeg',
//       eText: 'ball',
//       uText: 'گیند',
//       type: 'w',
//       C_group: 'sport',
//     },
//     {
//       id: 6,
//       picPath: '/Media/Words/images/bat.jpeg',
//       eText: 'bat',
//       uText: 'بلا',
//       type: 'w',
//       C_group: 'sport',
//     },
//     {
//       id: 7,
//       picPath: '/Media/Words/images/pitch.jpeg',
//       eText: 'pitch',
//       uText: 'پچ',
//       type: 'w',
//       C_group: 'sport',
//     },
//     {
//       id: 9,
//       picPath: '/Media/Words/images/wicket.png',
//       eText: 'wicket',
//       uText: 'وکٹ',
//       type: 'w',
//       C_group: 'sport',
//     },
//     {
//       id: 14,
//       picPath: '/Media/Alphabets/Images/A.jpg',
//       eText: 'A',
//       uText: 'A',
//       type: 'a',
//       C_group: 'Alphabets',
//     },
//     {
//       id: 15,
//       picPath: '/Media/Words/images/Book.jpg',
//       eText: 'Book',
//       uText: 'کتاب',
//       type: 'w',
//       C_group: 'Study',
//     },
//   ];

//   const [sortData, setSortData] = useState();
//   const dataHandler = () => {
//     groupData = {};
//     data.forEach(item => {
//       if (!groupData[item.C_group]) {
//         groupData[item.C_group] = [];
//       }
//       groupData[item.C_group].push(item);
//     });
//     console.log(groupData);
//   };

//   return (
//     <View>
//       <Text>Tester</Text>
//       <Button title="Click Me" onPress={dataHandler}></Button>
//     </View>
//   );
// };

// export default Tester;
