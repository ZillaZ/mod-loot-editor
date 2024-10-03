<script lang="ts">
    import { common_chest_rng, common_chest_slot_rng, civil_chest_rng, civil_chest_slot_rng, food_chest_rng, food_chest_slot_rng, military_chest_rng, military_chest_slot_rng, medic_chest_rng, medic_chest_slot_rng } from "./stores";
    
    let common_chestrng: number = 20;
    let common_chest_slotrng: number = 20;
    let civil_chestrng: number = 20;
    let civil_chest_slotrng: number = 20;
    let food_chestrng: number = 20;
    let food_chest_slotrng: number = 20;
    let military_chestrng: number = 20;
    let military_chest_slotrng: number = 20;
    let medic_chestrng: number = 20;
    let medic_chest_slotrng: number = 20;
    $: total = common_chestrng + civil_chestrng + food_chestrng + military_chestrng + medic_chestrng 
</script>

<div id="containers">
    <div class="rng">
        <p>Common Chest Rng</p>
        <input type="number" bind:value={common_chestrng} on:change={() => common_chest_rng.set(common_chestrng)}>
        <p>{((common_chestrng / total) * 100)}%</p>
        <p>Common Chest Slot Rng</p>
        <input type="number" bind:value={common_chest_slotrng} on:change={() => common_chest_slot_rng.set(common_chest_slotrng)}/>
    </div>
    <div class="rng">
        <p>Civil Chest Rng</p>
        <input type="number" bind:value={civil_chestrng} on:change={() => civil_chest_rng.set(civil_chestrng)}>
        <p>{(civil_chestrng / total) * 100}%</p>
        <p>Civil Chest Slot Rng</p>
        <input type="number" bind:value={civil_chest_slotrng} on:change={() => civil_chest_slot_rng.set(civil_chest_slotrng)}/>
    </div>
    <div class="rng">
        <p>Food Chest Rng</p>
        <input type="number" bind:value={food_chestrng} on:change={() => food_chest_rng.set(food_chestrng)}>
        <p>{(food_chestrng / total) * 100}%</p>
        <p>Food Chest Slot Rng</p>
        <input type="number" bind:value={food_chest_slotrng} on:change={() => food_chest_slot_rng.set(food_chest_slotrng)}/>
    </div>
    <div class="rng">
        <p>Military Chest Rng</p>
        <input type="number" bind:value={military_chestrng} on:change={() => military_chest_rng.set(military_chestrng)}>
        <p>{(military_chestrng / total) * 100}%</p>
        <p>Military Chest Slot Rng</p>
        <input type="number" bind:value={military_chest_slotrng} on:change={() => military_chest_slot_rng.set(military_chest_slotrng)}/>
    </div>
    <div class="rng">
        <p>Medic Chest Rng</p>
        <input type="number" bind:value={medic_chestrng} on:change={() => medic_chest_rng.set(medic_chestrng)}>
        <p>{(medic_chestrng / total) * 100}%</p>
        <p>Medic Chest Slot Rng</p>
        <input type="number" bind:value={medic_chest_slotrng} on:change={() => medic_chest_slot_rng.set(medic_chest_slotrng)}/>
    </div>
</div>

<style>
    #containers {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .rng {
        background-color: #697565;
        color: black;
        padding: 1vh 1vw 5vh;
        border-color: white;
        border-radius: 15px;
        box-shadow: #3C3D37 1vh 1vw;
        margin: 0 2vw 5vh;
    }
    input {
        border-radius: 15px;
    }
</style>