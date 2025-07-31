
function findmax(list) {
    let max = list[0];
    for (let i = 1; i < list.length-1; i++ ) {
        if (max < list[i]) {
            max = list[i];
        }
    }
    return max;
}

module.exports = findmax;