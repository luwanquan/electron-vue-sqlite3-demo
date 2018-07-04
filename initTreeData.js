const fs = require('fs')
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
function initTable () {
  return new Promise((resolve, reject) => {
    let db = conn()
    db.serialize(() => {
      db.run('CREATE TABLE if not exists TreeTable (id int primary key, name varchar(64), fatherId int)')
      resolve()
    })
  })
}

function insertTree (nodes) {
  return new Promise((resolve, reject) => {
    console.time('insertTree')
    let db = conn()
    db.serialize(() => {
        db.run('BEGIN')
        let prepare = db.prepare('replace into TreeTable (id, name, fatherId) values (?, ?, ?)')
        nodes.forEach(node => {
            prepare.run(node.id, node.name, node.fatherId)
        })
        prepare.finalize(err => {
            if (!err) {
                db.run('COMMIT')
                console.timeEnd('insertTree')
                resolve()
            }
        })
    })
  })
}

function queryTree () {
    return new Promise((resolve, reject) => {
        let db = conn()
        db.all('select * from TreeTable', (err, rows) => {
            if (!err) {
                resolve(rows || [])
            }
        })
    })
}

function initData () {
    console.time('initData')
    let tree = []
    let topNode = {
        id: 1,
        name: 'node1',
        fatherId: 0
    }
    tree.push(topNode)
    while (tree.length < 70000) {
        let i = tree.length
        let node = {
            id: i + 1,
            name: `node${i + 1}`,
            fatherId: tree[parseInt(Math.random() * i, 10)].id
        }
        tree.push(node)
    }
    console.timeEnd('initData')
    insertTree(tree)
}

async function writeTree () {
    let filename = 'tree.json'
    let tree = await queryTree()
    fs.writeFileSync(filename, `var nodes = ${JSON.stringify(tree)}`)
    console.log(tree.length)
}

writeTree()
