import { AppRegistry, StatusBar } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

console.disableYellowBox = true;
StatusBar.setHidden(true);

AppRegistry.registerComponent(appName, () => App);
