function _forEach(list,cb) {
    list._forEach(el => {
        cb(el);
    })
}

export {_forEach}