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
import AddPractice from './Components/Docter/AddPractice';
import AddTest from './Components/Docter/AddTest';
import RegisterPatient from './Components/Caregiver/RegisterPatient';
import AddAppointment from './Components/Docter/AddAppointment';
import DoctorDashBoard from './Components/Docter/DoctorDashBoard';
import PatientDashboard from './Components/Docter/DoctorDashBoard';
import CaretakerDashBoard from './Components/Caregiver/CaretakerDashBoard';
import TestDetails from './Components/Caregiver/TestDetails';
import PersonHome from './Components/Caregiver/PersonHome';
import PrePersonPractice from './Components/Caregiver/PrePersonPractice';
import PrePersonTest from './Components/Caregiver/PrePersonTest';
import AddPerson from './Components/Caregiver/AddPerson';
import AddPersonPractice from './Components/Caregiver/AddPersonPractice';
import AddPersonTest from './Components/Caregiver/AddPersonTest';
global.url = 'http://192.168.143.101';

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
        <Stack.Screen name="TestDetails" component={TestDetails} />
        <Stack.Screen name="AddPerson" component={AddPerson} />
        
        <Stack.Screen name="PersonHome" component={PersonHome} />
        
        <Stack.Screen name="PrePersonPractice" component={PrePersonPractice} />
        <Stack.Screen name="PrePersonTest" component={PrePersonTest} />
      
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RegisterPatient" component={RegisterPatient} />

        <Stack.Screen name="DoctorHome" component={DocterHome} />
        <Stack.Screen
          name="PreDefinePractices"
          component={PreDefinePractices}
        />
        <Stack.Screen name="AddAppointment" component={AddAppointment} />

        <Stack.Screen name="PatientPractice" component={PatientPractice} />
        <Stack.Screen name="AddPractice" component={AddPractice} />
        <Stack.Screen name="AddTest" component={AddTest} />
        <Stack.Screen name="AddPersonPractice" component={AddPersonPractice} />
        <Stack.Screen name="AddPersonTest" component={AddPersonTest} />
        
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
