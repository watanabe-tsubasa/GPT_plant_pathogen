// const testJson = {
//     "name": "watanabe",
//     "age": 34,
//     "height": 156,
//     "hair_color": "black",
// }

const baseStr =       'あいうえお、{\n' +
'  "a": "休息をとりましょう。",\n' +
'  "b": "水分を補給しましょう。",\n' +
'  "c": "温かい飲み物をとりましょう。",\n' +
'  "d": "塩水をうがいましょう。",\n' +
'  "e": "塩水を使った鼻洗浄を行うと良いでしょう。",\n' +
'  "f": "熱がある場合は、解熱剤を服用するしてください。"\n' +
'}\nかきくけこ' 

const regex = /{[\s\S]*}/;
const match = baseStr.match(regex);
const jsonObject = JSON.parse(match[0]);

console.log(jsonObject.a)

// const json = JSON.parse(baseStr);
// console.log(json.a);