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

    static remove(setArray, key, value) {
        setArray(array => {
            return array.filter(item => {
                const property = item[key];
                if (property) {
                    return property === value;
                } else {
                    return false
                }
            });
        })
    }
}

export {Guid, ArraysState};

