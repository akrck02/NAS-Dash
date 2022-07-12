import { setEvents, setStyles, UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import TerminalCore from "./TerminalView.core.js";

export default class TerminalView extends ViewUI {

    private static ID = "terminal";
    
    private core : TerminalCore;
    private terminal : UIComponent;
    private line : number;

    public constructor(){
        super({
            type: "view",
            id : TerminalView.ID,
            classes: ["box-column","box-center"],
            styles:{
                width: "100%",
                height: "100vh",
                background: "#202020", 
                color: "#ccc"
            }
        })

        this.core = new TerminalCore();
        this.line = 1;
    }

    public show(params : string[] = [], container : UIComponent ) {

        // Set ui  
        this.terminal = new UIComponent({
            type: "div",
            classes: ["box-column"],
            styles: {
                height: "100%",
                maxHeight: "100vh",
                overflow:"auto",
                width: "100%",
            }
        })

        this.terminal.appendTo(this);
        this.appendTo(container);

        const input = new UIComponent({
            type: "input",
            styles : {
                width: "80%",
                padding: "1rem 1rem",
                background: "rgba(40,40,40,.8)",
                border: "none",
                color: "#fff",
                margin: "2% 10%",
                position: "absolute",
                bottom : "0",
                borderRadius: ".35rem"
            }
        })

        setEvents(input.element, {
            keyup : (event) => {
                if (event.code === 'Enter') {
                    this.core.sendCommand((input.element as HTMLInputElement).value);
                    (input.element as HTMLInputElement).value = "";
                }
            }
        })
        this.appendChild(input);

        // Set events

        const view = this;
        this.core.connect();
        this.core.onOutput((messages : string[], error : boolean = false) => {

            
            const lineBox = new UIComponent({
                type: "div",
                classes: ["box-column"],
                styles: {
                    background: error ? "rgba(255,50,50,.9)": "rgba(0,0,0,.2)",              
                    padding: "1rem ",
                    margin: ".1rem 1rem",
                    width: "calc(100% - 4rem)"
                }
            });
            lineBox.appendTo(view.terminal);

            messages.forEach(msg => {
                const text = new UIComponent({
                    text: msg
                })
                text.appendTo(lineBox);
            })
            
            const start = view.line;
            view.line += messages.length;

            const bar = new UIComponent({
                classes: ["box-x-end"],
                text : `Lines ${start} - ${view.line}`
            })
          //  bar.appendTo(lineBox);

        });
        
        this.core.onOpen();
        this.core.onClose();

       
    }

}