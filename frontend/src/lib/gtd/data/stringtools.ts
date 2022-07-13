export default class StringTools {


    public static toNormalCase(str:string) : string {
        
        if(str.length < 2){
            return str.toUpperCase();
        }

        return str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase();; 
    }

    /**
     * Return if a given text is a URL
     * @param text The text to inspect
     * @returns if it is an URL
     */
    public static isUrl(text : string) : boolean{
        return text.startsWith("http://") || 
        text.startsWith("https://") ||
        text.startsWith("ftp://")   ||
        text.startsWith("sftp://")  ||
        text.startsWith("ws://")    ||
        text.startsWith("wss://")   ||
        text.startsWith("file://")  ||
        text.endsWith(".com")       ||
        text.endsWith(".net")       ||
        text.endsWith(".org")       
        ;
    }

    /**
     * Returns url as HTML anchor
     * @param url The url to convert
     * @returns The HTML anchor element as string
     */
    public static urlToHTML(url : string) : string {
        return `<a href="${url}" target="_blank">${url}</a>`;
    }
}