import { timeStamp } from "console";
import StringTools from "../../lib/gtd/data/stringtools.js";
import { setClasses, setEvents, setStyles, UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import TerminalCore from "./TerminalView.core.js";

export default class TerminalView extends ViewUI {

    private static ID = "terminal";
    private static OUTPUT_ID = "terminal-out";
    private static INPUT_ID = "terminal-in";
    
    private core : TerminalCore;
    private terminal : UIComponent;
    private input : UIComponent;
    private line : number;

    public constructor(){
        super({
            type: "view",
            id : TerminalView.ID,
            classes: ["box-column","box-y-center","box-x-start"],
        })

        this.core = new TerminalCore();
        this.line = 1;
    }

    public show(params : string[] = [], container : UIComponent ) {

        const view = this;
        // Set ui  
        this.terminal = new UIComponent({
            type: "div",
            id: TerminalView.OUTPUT_ID,
            classes: ["box-column"],
        })

        this.terminal.appendTo(this);
        this.appendTo(container);

        this.input = new UIComponent({
            type: "input",
            id: TerminalView.INPUT_ID,
        })

        this.welcome();

        setEvents(this.input.element, {
            keyup : (event) => {

                if (event.ctrlKey && event.altKey && event.key === "l") {
                    view.cleanTerminal();
                    return;
                }

                if (event.code === 'Enter') {

                    const command =(this.input.element as HTMLInputElement).value;
                    
                    if(command == "clean"){
                        view.cleanTerminal();
                        return;
                    }

                    const commandBox = new UIComponent({
                        text : command,
                        classes: ["box-x-between","command"],
                    })

                    const now = new Date(); 

                    commandBox.appendChild(new UIComponent({
                        text: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
                    }))
                    view.terminal.appendChild(commandBox);
                    
                    this.core.sendCommand(command);
                    (this.input.element as HTMLInputElement).value = "";
                }
            }
        })
        this.appendChild(this.input);

        // Set events
        this.core.connect();
        this.core.onOutput((messages : string[],error : boolean) => view.log(messages,error));
        this.core.onOpen();
        this.core.onClose();

    }

    /**
     * Log output on the terminal
     * @param messages The messages to show
     * @param error if it is an error message bundle
     */
    private log(messages : string[],error : boolean = false){

        const outputChunck = new UIComponent({
            type: "div",
            classes: ["box-column","chunk"],
        });

        if(error){
            setClasses(outputChunck.element,["error"])
        }            

        messages.forEach(msg => {
            const lineBox = new UIComponent({
                classes:["box-row","line"],
            })

            const lineSelector = new UIComponent({
                text : `${this.line}`,
                classes: ["box-x-end","line-number"],
            })
            lineSelector.appendTo(lineBox);


            let formatted = "";
            msg.split(/\s/).forEach(word => {
                
                if(StringTools.isUrl(word)){
                    formatted += ` ${StringTools.urlToHTML(word)}`;
                    return;
                }
                
                formatted += " " + word;
            })

            const text = new UIComponent({
                text: formatted,
            })
            text.appendTo(lineBox);
            
            lineBox.appendTo(outputChunck)
            lineBox.element.scrollIntoView();
            this.line ++;

            outputChunck.appendTo(this.terminal);
        })
    }

    /**
     * clean the terminal input and output
     */
    private cleanTerminal(){
        this.terminal.clean();
        this.line = 0;
        (this.input.element as HTMLInputElement).value = "";
        this.welcome();
    }


    private welcome(){
        const welcome = new UIComponent({
            text: ">_ &nbsp;&nbsp;&nbsp; NAS terminal", 
            styles: {
                padding: "1rem 1rem 0 1rem",
                fontSize: "1rem"
            }
        });

        welcome.appendTo(this.terminal);
    }
}