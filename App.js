import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import UserDefinePractice from './Components/UserDefinePractice';
import Welcome from './Welcome';
import DocterHome from './Components/Docter/DocterHome';
import PatientDetail from './Components/Docter/PatientDetail';
import PreDefinePractices from './Components/Docter/PreDefinePractices';
import PreDefineTest from './Components/Docter/PreDefineTest';
import Home from './Components/Docter/Home';
import PatientPractice from './Components/Patient/PatientPractice';
global.url = 'http://192.168.100.9';
const Stack = createNativeStackNavigator();
// Define a global variable outside of any component

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="PreDefineTest" component={PreDefineTest} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="DoctorHome" component={DocterHome} />
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen
          name="PreDefinePractices"
          component={PreDefinePractices}
        />

        <Stack.Screen
          name="PatientPractice"
          component={PatientPractice}
        />
        <Stack.Screen
          name="UserDefinePractice"
          component={UserDefinePractice}
        />
        <Stack.Screen name="PatientDetail" component={PatientDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
