/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import UserDefinePractice from './Components/UserDefinePractice';
import AddPractice from './Components/Docter/AddPractice';
import Tester from './Components/Tester';
import DocterHome from './Components/Docter/DocterHome';
import AddAppointment from './Components/Docter/AddAppointment';
AppRegistry.registerComponent(appName, () =>App);
