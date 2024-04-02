import { definePluginSettings } from "@api/Settings";
import { Notices } from "@api/index";
import definePlugin, { OptionType } from "@utils/types";
import { findStore } from "@webpack";

let guildNames: string[] = [];

const settings = definePluginSettings({
    interval: {
        description: "Interval for nothing... but okay",
        type: OptionType.SLIDER,
        default: 5,
        markers: [1, 5, 15, 30, 45, 60],
        stickToMarkers: false,
        restartNeeded: true
    }
});


export default definePlugin({
    name: "Not Schizophrenia",
    description: "What even is schizophrenia?",
    authors: [
        {
            name: 'Ethan',
            id: 721717126523781240n
        }
    ],

    settings,

    required: true,


    playNothing() {
        const notASound = new Audio();
        notASound.src =
            "https://github.com/ethan-davies/NotSchizophrenia/raw/master/NotASound.MP3";
        notASound.play();
    },

    start() {
        const guildStore = findStore('GuildStore').getGuilds();

        guildNames = Object.values(guildStore).map((guild: any) => guild.name);

        this.noSound = setInterval(() => {
            this.playNothing();

            const server = guildNames[Math.floor(Math.random() * guildNames.length)];
            Notices.showNotice(`You were removed from ${server}`, "OK", () => Notices.popNotice());
        }, settings.store.interval * 1000);

    },

    stop() {
        clearInterval(this.noSound);
    }
});
