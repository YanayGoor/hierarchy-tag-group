export let isEmpty = function (object) {
    for (var key in object) {
        if (object.hasOwnProperty(key))
            return false;
    }
    return true;
};


export let recursiveKeys = schema => {
    if (isEmpty(schema)) {
        return [];
    } else {
        let keys = [];
        keys = keys.concat(Object.keys(schema));
        Object.keys(schema).forEach(x => {
            keys = keys.concat(recursiveKeys(schema[x]));
        });
        return keys;
    }
};


export let populateData = (pre, schema) => {
    let title = Object.keys(schema)[0];
    if (pre.includes(title)) {
        // return all keys below
        return recursiveKeys(schema);
    } else if (Object.keys(schema[title]).length > 0) {
        let keys = [];
        Object.keys(schema[title]).forEach(x => {
            let newSchema = {};
            newSchema[x] = schema[title][x];
            let ret = populateData(pre, newSchema);
            keys = keys.concat(ret);
        });
        return keys;

    }
    return []
};


export let addToData = (val, data, schema) => {
    if (isEmpty(schema)) {
        return null;
    } else if (Object.keys(schema).includes(val)) {
        return data && data.concat(val)
    } else {
        let title = Object.keys(schema)[0];
        let finalres;
        Object.keys(schema[title]).forEach(key => {
            let obj = {};
            obj[key] = schema[title][key];
            let res = addToData(val, data, obj);
            if (res) {
                let keys = Object.keys(schema[title]);
                if (keys.length === keys.filter(x => res.includes(x)).length) {
                    finalres = [title].concat(res.filter(x => !keys.includes(x)));
                } else {
                    finalres = res;
                }
            }
        });
        return finalres;
    }
};


export let removeFromData = (val, data, schema) => {
    if (isEmpty(schema)) {
        return null;
    } else if (Object.keys(schema).includes(val)) {
        return data && data.filter(x => x !== val)
    } else {
        let title = Object.keys(schema)[0];
        let finalres;
        let expanded = data;
        if (data.includes(title)) {
            expanded = Object.keys(schema[title]).concat(data).filter(x => x !== title);
        }
        Object.keys(schema[title]).forEach(key => {
            let obj = {};
            obj[key] = schema[title][key];
            let res = removeFromData(val, expanded, obj);
            if (res) {
                let keys = Object.keys(schema[title]);
                if (0 === keys.filter(x => res.includes(x)).length) {
                    finalres = res.filter(x => x !== title);
                } else {
                    finalres = res;
                }
            }
        });
        return finalres;
    }
};