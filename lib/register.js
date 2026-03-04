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
    console.log(t)

    if (id === t) {
        return false
    } else {
        return true
    }
}