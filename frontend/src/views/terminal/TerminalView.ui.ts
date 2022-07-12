import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";

export default class TerminalView extends ViewUI {

    private static ID = "terminal";
    
    public constructor(){
        super({
            type: "view",
            id : TerminalView.ID,
            classes: ["box-column","box-center"],
        })
    }

    public show(params : string[] = [], container : UIComponent ) {

        alert({
            message: "Working!",
            icon : "terminal"
        });

        this.appendTo(container);

    }


}