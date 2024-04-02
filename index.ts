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
            "https://cdn.discordapp.com/attachments/1216193891850522707/1224850069363363870/1712097411248.MP3?ex=661efd85&is=660c8885&hm=c65af38ba7c2a53715becd673e3716d931c93bdfd3dbb6e89303f097cfc07f23&";
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
