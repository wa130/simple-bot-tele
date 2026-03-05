import Database from 'json-db-engine'

const db = new Database('./lib/database/users.json')

export function register(name, id) {
    const types = {
        name: name,
        teleId: id
    }
 
    db.add(types)
    return true

}

export function cekUser(id) {

    const t = db.find('teleId', id)

    if (id === t) {
        return false
    } else {
        return true
    }
}

export function listUser() {

    const list = db.read()
    const listNama = Object.values(list).map(list => list.name)
    
    return listNama
}


export function totalUser() {
    const readDb = db.read()
    const totalName = Object.keys(readDb).length

    return totalName
}