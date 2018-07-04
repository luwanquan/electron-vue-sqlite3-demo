const sqlite3 = require('sqlite3').verbose()
let db

// 连接数据库
function conn () {
  if (!db || !db.open) {
    db = new sqlite3.Database('base.db')
  }
  return db
}

// 初始化数据表
export const initTable = () => {
  return new Promise((resolve, reject) => {
    let db = conn()
    db.serialize(() => {
      db.run('CREATE TABLE if not exists TreeTable (id int primary key, name varchar(64), fatherId int)')
      db.run('CREATE TABLE IF NOT EXISTS ProductTable (id int primary key, name varchar(64))')
      resolve()
    })
  })
}

export const queryAllTree = () => {
  return new Promise((resolve, reject) => {
    let db = conn()
    db.all('select id, name, fatherId from TreeTable order by fatherId', (err, rows) => {
      if (err) reject(err)
      resolve(rows || [])
    })
  })
}

export const queryAllProduct = () => {
  return new Promise((resolve, reject) => {
    let db = conn()
    db.all('select id, name from ProductTable', (err, rows) => {
      if (err) reject(err)
      resolve(rows || [])
    })
  })
}

export const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    let db = conn()
    let prepare = db.prepare('replace into ProductTable (id, name) values (?, ?)')
    prepare.run(product.id, product.name)
    prepare.finalize(err => {
      if (!err) resolve()
    })
  })
}
