/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import UserDefinePractice from './Components/UserDefinePractice';
import AddPractice from './Components/Docter/AddPractice';
import Tester from './Components/Tester';
import AddAppointment from './Components/Docter/AddAppointment';
import PIdentify from './Components/Patient/PIdentify';

// import {Provider} from 'react-redux';
// import store from './Components/redux/store';

// const AppWrapper = () => {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// };

AppRegistry.registerComponent(appName, () => App);
