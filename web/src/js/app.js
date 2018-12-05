import { UI } from "./app/ui";
import SpeedTest from "./app/speedtest";
import Settings from "./app/settings";
import Share from "./app/share";
import History from "./app/history";

/**
 * Speed Test web UI
 *
 * @class WebUI
 */
export default class WebUI {
    /**
     * Create an instance of WebUI.
     */
    constructor() {
        this.speedtest = new SpeedTest();
        this.settings = new Settings();
        this.share = new Share();
        this.history = new History();

        this.attachStateHandler();
        this.detectIE();
    }

    /**
     * Attac the handler observing history state
     */
    attachStateHandler() {
        window.addEventListener("popstate", () => {
            this.speedtest.stopTest(true);
            UI.$shareResultsButton.setAttribute("hidden", "");

            switch (document.location.pathname) {
                case "/about":
                    UI.showPage("about");
                    document.title = "Speed Test - About";
                    break;

                case "/result":
                    UI.showPage("speedtest");
                    document.title = "Speed Test - Result";
                    this.speedtest.loadResultsFromUri();
                    break;

                case "/results":
                    UI.showPage("history");
                    document.title = "Speed Test - Results";
                    this.history.loadResultsHistory();
                    break;

                case "/run":
                    UI.showPage("speedtest");
                    document.title = "Speed Test - Running...";
                    this.speedtest.startTest();
                    break;

                case "/settings":
                    UI.showPage("settings");
                    document.title = "Speed Test - Settings";
                    break;

                case "/share":
                    UI.showPage("share");
                    document.title = "Speed Test - Share results";
                    this.speedtest.loadResultsFromUri(false);
                    this.share.generateShareResultsLinks();
                    break;

                default:
                    UI.showPage("speedtest");
                    break;
            }
        });
        window.dispatchEvent(new Event("popstate"));
    }

    detectIE() {
        const ua = window.navigator.userAgent;
        if (ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident.") > 0) {
            UI.$ieAlert.removeAttribute("hidden");
        }
    }
}
