class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

class ArraysState {
    static add(setArray, item) {
        setArray(products => products.concat(item));
    }

    static removeByKey(setArray, key, value) {
        setArray(array => {
            return array.filter(item => {
                const property = item[key];
                if (property) {
                    return property !== value;
                } else {
                    return false
                }
            });
        })
    }

    static remove(setArray, item) {
        setArray(array => {
            return array.filter(itemInArray => {
                return JSON.stringify(item) !== JSON.stringify(itemInArray)
            });
        })
    }

    static update(setArray, item, key) {
        setArray(array => {
            return array.map(itemInArray => {
                if (!itemInArray[key] || !item[key]) return itemInArray;
                if (itemInArray[key] === item[key]) {
                    return item;
                }
            });
        })
    }
}

export {Guid, ArraysState};

