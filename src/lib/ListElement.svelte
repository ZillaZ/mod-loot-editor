<script lang="ts">
  import { type Item } from "./Item";
  import {
    common_total,
    civil_total,
    food_total,
    military_total,
    medic_total,
  } from "./stores";
  export let item: Item;
  let total = 1
  let last = item.rng
  let delta = 0
  $: chance = (item.rng / total) * 100;
  switch (item.container) {
    case "commonChest":
      common_total.subscribe((e) => {
        total = e
      });
      break;
    case "civilChest":
      civil_total.subscribe((e) => {
        total = e
      });
      break;
    case "foodChest":
      food_total.subscribe((e) => {
        total = e
      });
      break;
    case "militaryChest":
      military_total.subscribe((e) => {
        total = e
      });
      break;
    case "medicChest":
      medic_total.subscribe((e) => {
        total = e
      });
      break;
  }
  console.log(item.container);
  function update_total() {
    delta = item.rng - last
    last = item.rng
    if(item.container.includes("medic")) {
      medic_total.update(e => e + delta)
    }else if(item.container.includes("common")) {
      common_total.update(e => e + delta)
    }else if(item.container.includes("civil")) {
      civil_total.update(e => e + delta)
    }else if(item.container.includes("food")) {
      food_total.update(e => e + delta)
    }else if(item.container.includes("military")) {
      military_total.update(e => e + delta)
    }
  }
</script>

<div id="list_element">
  <input bind:value={item.container} />
  <input bind:value={item.name} />
  <input bind:value={item.minStack} />
  <input bind:value={item.maxStack} />
  <input bind:value={item.rng} on:change={() => update_total()}/>
  <p>{chance}</p>
</div>

<style>
  #list_element {
    display: flex;
    flex-direction: row;
    color: white;
    background-color: grey;
    padding: 1vh;
    border-radius: 5px;
  }
  input {
    width: 10vw;
    padding: 1vh 1vw;
  }
</style>
