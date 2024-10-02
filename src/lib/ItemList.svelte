<script lang="ts">
  import { type Item } from "./Item";
  import { new_item } from "./Item";
  import ItemAdder from "./ItemAdder.svelte";
  import ListElement from "./ListElement.svelte";
  import { download } from "./parser";
  import {
    item_list,
    common_total,
    civil_total,
    food_total,
    military_total,
    medic_total,
  } from "./stores";
  let itemlist: Item[] = [];
  item_list.subscribe((e) => (itemlist = e));
  let show_list = itemlist;
  let name_filter: string;
  let container_filter: string;

  function add_item() {
    let item = new_item("", 0, "commonChest", 1, 2);
    itemlist = [...itemlist, item];
    item_list.set(itemlist);
    show_list = itemlist;
    let total: number = 0;
    for (let item of itemlist.filter((e) => e.container == "commonChest")) {
      total += Number(item.rng);
    }
    common_total.set(total);
  }

  function remove_item(name: String, container: String) {
    let list = itemlist.filter(
      (e) => e.container == container && e.name == name
    );
    let set = new Set(itemlist);
    let filter = set.difference(new Set(list));
    itemlist = Array.from(filter.keys());
    item_list.set(itemlist);
    show_list = Array.from(new Set(show_list).difference(new Set(list)));
    let total: number = 0;
    for (let item of itemlist.filter((e) => e.container == container)) {
      total += Number(item.rng);
    }
    switch (container) {
      case "commonChest":
        common_total.set(total);
        break;
      case "civilChest":
        civil_total.set(total);
        break;
      case "foodChest":
        food_total.set(total);
        break;
      case "militaryChest":
        military_total.set(total);
        break;
      case "medicChest":
        medic_total.set(total);
        break;
    }
  }

  function filter_by_container() {
    if (container_filter.length < 1) {
      show_list = itemlist;
      return;
    }
    show_list = itemlist.filter((e) => e.container.includes(container_filter));
  }

  function filter_by_name() {
    if (name_filter.length < 1) {
      show_list = itemlist;
      return;
    }
    show_list = itemlist.filter((e) => e.name.includes(name_filter));
  }
</script>

<div id="list">
  <div id="top_buttons">
    <button on:click={add_item}> Add Item </button>
    <ItemAdder width={10} height={5} />
    <button on:click={() => download(itemlist)}> Download </button>
    <div class="filter">
      <p>Name Filter</p>
      <input bind:value={name_filter} on:change={() => filter_by_name()} />
    </div>
    <div class="filter">
      <p>Container Filter</p>
      <input
        bind:value={container_filter}
        on:change={() => filter_by_container()}
      />
    </div>
  </div>
  <div id="table">
    <div id="table_header">
      <p>Container Name</p>
      <p>Item Id</p>
      <p>Min Stack</p>
      <p>Max Stack</p>
      <p>Chance %</p>
    </div>
    {#each show_list.reverse() as item}
      <div id="element">
        <ListElement {item} />
        <button on:click={() => remove_item(item.name, item.container)}
          >X</button
        >
      </div>
    {/each}
  </div>
</div>

<style>
  #list {
    background-color: #697565;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 52vh;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 85vw;
    margin: 0 auto;
  }
  #top_buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  #element {
    display: flex;
    flex-direction: row;
  }
  #table_header {
    display: flex;
    flex-direction: row;
    padding: 1vh;
    border-radius: 5px;
    width: 77.225%;
  }
  #table {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
  }
  .filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 1vw;
  }
  button {
    margin: 0 5vw;
    padding: 1vh 1vw;
  }
  input {
    margin: 0 1vw;
    height: fit-content;
  }
  p {
    width: 30%;
    color: white;
  }
</style>
