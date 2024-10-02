export type Item = {
    name: String,
    rng: number,
    container: String,
    minStack: number,
    maxStack: number
}

export function new_item(name: String, rng: number, container: String, minStack: number, maxStack: number) : Item {
    var value : Item = {
        name,
        rng,
        container,
        minStack,
        maxStack
    };
    return value
}