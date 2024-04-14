import { MainMenu } from "./screens/mainmenu.js";
class UiManager {
    constructor(){
        this.setScreen(new MainMenu());
    }

    setScreen = (screen) => {
        this.currentScreen=screen;
        screen.init();
    }

    drawScreen = () => {
        this.currentScreen.draw();
        this.currentScreen.update();
    }
}

export default UiManager;