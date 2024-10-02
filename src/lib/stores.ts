import { writable, type Writable } from 'svelte/store';
import { type Item } from './Item';

export let common_chest_rng = writable(20)
export let common_chest_slot_rng = writable(20)
export let civil_chest_rng = writable(20)
export let civil_chest_slot_rng = writable(20)
export let food_chest_rng = writable(20)
export let food_chest_slot_rng = writable(20)
export let military_chest_rng = writable(20)
export let military_chest_slot_rng = writable(20)
export let medic_chest_rng = writable(20)
export let medic_chest_slot_rng = writable(20)
export let item_list : Writable<Item[]> = writable([])
export let common_total : Writable<number> = writable(0)
export let civil_total : Writable<number> = writable(0)
export let food_total : Writable<number> = writable(0)
export let military_total : Writable<number> = writable(0)
export let medic_total : Writable<number> = writable(0)