// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
// import * as shape from 'd3-shape'; // Make sure d3-shape is installed
// import { Text } from 'react-native-svg';

// const TestDetails = () => {
//   // Data for the graph (dummy data for example)
//   const data = [10, 20, 30, 40, 50, 60, 70, 80, 60, 50, 10, 2];

//   // X-axis labels
//   const xAxisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   return (
//     <View style={styles.container}>
//       <View style={styles.chartContainer}>
//         {/* Y-axis */}
//         <YAxis
//           data={data}
//           contentInset={{ top: 20, bottom: 20 }}
//           svg={{ fontSize: 10, fill: 'grey' }}
//           numberOfTicks={5}
//           formatLabel={(value) => `${value}`}
//         />
//         <View style={{ flex: 1, marginLeft: 10 }}>
//           <LineChart
//             style={styles.chart}
//             data={data}
//             svg={{ stroke: 'rgb(134, 65, 244)' }}
//             contentInset={{ top: 20, bottom: 20 }}
//             curve={shape.curveLinear}
//           >
//             <Grid />
//           </LineChart>
//           {/* X-axis */}
//           <XAxis
//             style={{ marginHorizontal: -10 }}
//             data={data}
//             formatLabel={(index) => xAxisLabels[index]}
//             contentInset={{ left: 20, right: 20 }}
//             svg={{ fontSize: 10, fill: 'grey' }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 300,
//     padding: 20,
//   },
//   chartContainer: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   chart: {
//     flex: 1,
//     marginLeft: 10,
//   },
// });

// export default TestDetails;



import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape'; // Make sure d3-shape is installed

const TestDetails = () => {
  // Data for the graphs
  const data1 = [10, 20, 30, 40, 50, 60, 70, 80, 60, 50, 10, 2];
  const data2 = [5, 80, 40, 35, 45, 55, 65, 75, 65, 55, 70, 1];

  // X-axis labels
  const xAxisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Y-axis */}
        <YAxis
          data={data1}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'grey' }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={styles.chart}
            data={data1}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveLinear}
          >
            <Grid />
          </LineChart>
          <LineChart
            style={StyleSheet.absoluteFill}
            data={data2}
            svg={{ stroke: 'rgb(244, 65, 134)' }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveLinear}
          />
          {/* X-axis */}
          <XAxis
            style={{ marginHorizontal: -10 }}
            data={data1}
            formatLabel={(index) => xAxisLabels[index]}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: 'grey' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    padding: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  chart: {
    flex: 1,
    marginLeft: 10,
  },
});

export default TestDetails;






