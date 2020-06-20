/*
Discord Extreme List - Discord's unbiased list.

Copyright (C) 2020 Cairo Mitchell-Acason, John Burke, Advaith Jagathesan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

global.announcement = {
    active: false,
    message: "",
    colour: "",
    foreground: ""
};

export function getAnnouncement() {
    return global.announcement;
}

export async function updateAnnouncement(announcement) {
    await global.db.collection("webOptions").updateOne(
        { _id: "announcement" },
        {
            $set: {
                active: announcement.active,
                message: announcement.message,
                colour: announcement.colour,
                foreground: announcement.foreground
            }
        }
    );

    global.announcement = {
        active: announcement.active,
        message: announcement.message,
        colour: announcement.colour,
        foreground: announcement.foreground
    };
}

export async function updateCache() {
    const announcement = await global.db
        .collection("webOptions")
        .findOne({ _id: "announcement" });

    global.announcement = announcement;
    return;
}

setInterval(async () => {
    await updateCache();
}, 60000);