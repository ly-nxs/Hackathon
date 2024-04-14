import { MainMenu } from "./screens/mainmenu.js";
class UiManager { //Manages the UI 
    constructor(){
        this.setScreen(new MainMenu()); //sets default screen
    }

    //change what screen is displayed
    setScreen = (screen) => {
        this.currentScreen=screen;
        screen.init();
    }

    //draws screen and all UI elements
    drawScreen = () => {
        this.currentScreen.draw();
        this.currentScreen.update();
    }
}

export default UiManager;