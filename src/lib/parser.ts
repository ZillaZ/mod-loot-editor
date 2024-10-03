import type { Item, Item2 } from "./Item";
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
    itemsRng: Item2[]
}

export function parse(data: String, filter: string, minStack: number, maxStack: number, rng: number, container: String, file_type: string) : Item[] {
    let rtn : String[] = []
    if(file_type.includes("json")) {
        let json : Document = JSON.parse(data.trim())
        let commonSet = new Set(json.commonChest.itemsRng.map(e => item2_to_item(e, "commonChest")))
        let civilSet = new Set(json.civilChest.itemsRng.map(e => item2_to_item(e, "civilChest")))
        let foodSet = new Set(json.foodChest.itemsRng.map(e => item2_to_item(e, "foodChest")))
        let militarySet = new Set(json.militaryChest.itemsRng.map(e => item2_to_item(e, "militaryChest")))
        let medicSet = new Set(json.medicChest.itemsRng.map(e => item2_to_item(e, "medicChest")))
        let union = commonSet.union(civilSet).union(foodSet).union(militarySet).union(medicSet)

        return Array.from(union.keys())
    }else{
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
}

function item2_to_item(item: Item2, container: String) : Item {
    return {
        name: item.item,
        container: container,
        rng: item.rng,
        minStack: item.minStack,
        maxStack: item.maxStack
    }
}

function item_to_item2(item: Item) : Item2 {
    return {
        item: item.name,
        rng: item.rng,
        minStack: item.minStack,
        maxStack: item.maxStack
    }
}

export function download(item_list: Item[]) {
    let common_chest: Container = {
        rng: common_chestrng,
        slotRng: common_chest_slotrng,
        itemsRng: []
    };
    let civil_chest: Container = {
        rng: civil_chestrng,
        slotRng: civil_chest_slotrng,
        itemsRng: []
    };
    let food_chest: Container = {
        rng: food_chestrng,
        slotRng: food_chest_slotrng,
        itemsRng: []
    };
    let military_chest: Container = {
        rng: military_chestrng,
        slotRng: military_chest_slotrng,
        itemsRng: []
    };
    let medic_chest: Container = {
        rng: medic_chestrng,
        slotRng: medic_chest_slotrng,
        itemsRng: []
    };

    for (let i of item_list) {
        let item = item_to_item2(i)
        switch (i.container) {
            case "commonChest":
                common_chest.itemsRng.push(item);
                break;
            case "civilChest":
                civil_chest.itemsRng.push(item);
                break;
            case "foodChest":
                food_chest.itemsRng.push(item);
                break;
            case "militaryChest":
                military_chest.itemsRng.push(item);
                break;
            case "medicChest":
                medic_chest.itemsRng.push(item);
                break;
        }
    }

    let common_str = write_container("commonChest", common_chest);
    let civil_str = write_container("civilChest", civil_chest);
    let food_str = write_container("foodChest", food_chest);
    let military_str = write_container("militaryChest", military_chest);
    let medic_str = write_container("medicChest", medic_chest);

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
    builder.push("\"itemsRng\": [\n")
    for(let i = 0; i < container.itemsRng.length; i++) {
        let item = container.itemsRng[i]
        builder.push("{\"item\": \"" + item.item.trim() + "\", ")
        builder.push("\"minStack\": " + item.minStack + ", ")
        builder.push("\"maxStack\": " + item.maxStack + ", ")
        builder.push("\"rng\":" + item.rng)
        if(i == container.itemsRng.length - 1) {
            builder.push("}\n")
        }else{
            builder.push("},\n")
        }
    }
    builder.push("]\n")
    builder.push("}")
    return builder.join("")
}

export type Document = {
    commonChest: Container,
    civilChest: Container,
    foodChest: Container,
    militaryChest: Container,
    medicChest: Container
}