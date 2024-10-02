import type { Item } from "./Item";
import { common_chest_rng, common_chest_slot_rng, civil_chest_rng, civil_chest_slot_rng, food_chest_rng, food_chest_slot_rng, military_chest_rng, military_chest_slot_rng, medic_chest_rng, medic_chest_slot_rng } from "./stores";

let common_chestrng : number
let common_chest_slotrng: number
let civil_chestrng : number
let civil_chest_slotrng: number
let food_chestrng : number
let food_chest_slotrng: number
let military_chestrng : number
let military_chest_slotrng: number
let medic_chestrng : number
let medic_chest_slotrng: number

common_chest_rng.subscribe(e => common_chestrng = e)
common_chest_slot_rng.subscribe(e => common_chest_slotrng = e)
civil_chest_rng.subscribe(e => civil_chestrng = e)
civil_chest_slot_rng.subscribe(e => civil_chest_slotrng = e)
food_chest_rng.subscribe(e => food_chestrng = e)
food_chest_slot_rng.subscribe(e => food_chest_slotrng = e)
military_chest_rng.subscribe(e => military_chestrng = e)
military_chest_slot_rng.subscribe(e => military_chest_slotrng = e)
medic_chest_rng.subscribe(e => medic_chestrng = e)
medic_chest_rng.subscribe(e => medic_chest_slotrng = e)

type Container = {
    rng: number,
    slotRng: number,
    items: Item[]
}

export function parse(data: String, filter: string, minStack: number, maxStack: number, rng: number, container: String) : Item[] {
    let rtn : String[] = []
    let lines = data.split("\n")
    
    for(let line of lines) {
        if (line.includes(filter)) {
            let aux = line.substring(6)
            rtn.push(aux.replaceAll("<", "").replaceAll(">", ""))
        }
    }
    alert(rtn.join("\n"))
    return rtn.map(e => {
        let aux : Item = {
            name: e,
            minStack,
            maxStack,
            rng,
            container
        };
        return aux
    })
}

export function download(item_list: Item[]) {
    let common_chest: Container = {
        rng: common_chestrng,
        slotRng: common_chest_slotrng,
        items: []
    };
    let civil_chest: Container = {
        rng: civil_chestrng,
        slotRng: civil_chest_slotrng,
        items: []
    };
    let food_chest: Container = {
        rng: food_chestrng,
        slotRng: food_chest_slotrng,
        items: []
    };
    let military_chest: Container = {
        rng: military_chestrng,
        slotRng: military_chest_slotrng,
        items: []
    };
    let medic_chest: Container = {
        rng: medic_chestrng,
        slotRng: medic_chest_slotrng,
        items: []
    };

    for (let item of item_list) {
        switch (item.container) {
            case "common_chest":
                common_chest.items.push(item);
                break;
            case "civil_chest":
                civil_chest.items.push(item);
                break;
            case "food_chest":
                food_chest.items.push(item);
                break;
            case "military_chest":
                military_chest.items.push(item);
                break;
            case "medic_chest":
                medic_chest.items.push(item);
                break;
        }
    }

    let common_str = write_container("common_chest", common_chest);
    let civil_str = write_container("civil_chest", civil_chest);
    let food_str = write_container("food_chest", food_chest);
    let military_str = write_container("military_chest", military_chest);
    let medic_str = write_container("medic_chest", medic_chest);

    let json_file = "{\n".concat(common_str, ",\n", civil_str, ",\n", food_str, ",\n", military_str, ",\n", medic_str, "\n}");

    const blob = new Blob([json_file], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chests.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

function write_container(name: String, container: Container) : string {
    let builder : String[] = []
    builder.push("\"" + name + "\": {\n")
    builder.push("\"rng\": " + container.rng + ",\n")
    builder.push("\"slotRng\": "+ container.slotRng + ",\n")
    builder.push("\"items\": [\n")
    for(let i = 0; i < container.items.length; i++) {
        let item = container.items[i]
        builder.push("{\"item\": \"" + item.name.trim() + "\", ")
        builder.push("\"minStack\": " + item.minStack + ", ")
        builder.push("\"maxStack\": " + item.maxStack + ", ")
        builder.push("\"rng\":" + item.rng)
        if(i == container.items.length - 1) {
            builder.push("}\n")
        }else{
            builder.push("},\n")
        }
    }
    builder.push("]\n")
    builder.push("}")
    return builder.join("")
}