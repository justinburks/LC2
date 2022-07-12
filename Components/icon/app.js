// read
// unpack
// build

let list = fetch('data.json')
.then(res => res.json())
.then(data => {
    
    let list = [];
    data.forEach(el => {
        list.push(el[1])
    }) 
    return list;
})

console.log(list);
