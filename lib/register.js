import Database from 'json-db-engine'

const db = new Database('./lib/database/users.json')

export function register(name, id) {
    const types = {
        name: name,
        teleId: id
    }

    const cek = db.find("teleId", id);
    //console.log(cek.teleId)
    
    if (cek.teleId == id) {
      return "id sudah terdaftar";
    }
  
   
    db.add(types)
    return "berhasil terdaftar"

}