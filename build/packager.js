const packager = require('electron-packager')
/**
 * Use electron-packager to build electron app
 */
function build() {
    let options = require('../config').building
    console.log('\x1b[34mBuilding electron app(s)...\n\x1b[0m')
    packager(options, (err, appPaths) => {
        if (err) {
            console.error('\x1b[31mError from `electron-packager` when building app...\x1b[0m')
            console.error(err)
        } else {
            console.log('Build(s) successful!')
            console.log(appPaths)
            console.log('\n\x1b[34mDONE\n\x1b[0m')
        }
    })
}
build()
