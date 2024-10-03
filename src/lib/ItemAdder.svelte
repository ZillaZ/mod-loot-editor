<script lang="ts">
    import pkg from 'lodash';
    const {uniqWith, isEqual} = pkg;
    import {type Item} from "$lib/Item";
    import { item_list } from "./stores";
    import { parse } from "./parser";
    let files : FileList;
    export let width: Number;
    export let height: Number;
    let file_data : String = ""
    let filter : string
    let container: String
    let minStack : number
    let maxStack : number
    let rng : number
    let itemlist : Item[]
    item_list.subscribe(e => itemlist = e)
    let flag : string = "text"

    $: if(files) {
        for(let file of Array.from(files)) {
            file.text().then((e) => file_data = e)
            flag = file.type
        }
    }
    function join_parsed_data(items: Item[]) {
        let set = new Set(itemlist)
        let other = new Set(items)
        let union = set.union(other)
        let aux = Array.from(union)
        let final = uniqWith(aux, isEqual)
        if(flag.includes("json") || flag.includes("text")) {
            item_list.set(final)
        }else{
            alert("Invalid file format")
        }
    }
</script>

<div id="upload_files" style="width: {width}vw;height: {height}vh">
  <input accept="text" bind:files id="file" name="filelist" type="file" />
</div>
{#if file_data.length > 1}
  <div id="text_processor">
    {#if !flag.includes("json")}
      <input placeholder="Filter" bind:value={filter} />
      <input placeholder="Min Stack Size" bind:value={minStack} />
      <input placeholder="Max Stack Size" bind:value={maxStack} />
      <input placeholder="Container Name" bind:value={container} />
      <input placeholder="Rng Value" bind:value={rng} />
    {/if}
    <button
      on:click={() =>
        join_parsed_data(
          parse(file_data, filter, minStack, maxStack, rng, container, flag)
        )}>Parse File</button
    >
  </div>
{/if}

<style>
  #upload_files {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 10vh;
  }
  #text_processor {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 10vw;
    padding: 1vh 1vw;
  }
</style>
