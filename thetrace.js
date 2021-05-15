const mysql = require("mysql")
const { promisify } = require("util")

// const mysql_config = {
//     host: "sql143.main-hosting.eu", //185.224.137.7
//     user: "u709105172_O4VwE",
//     password: "Shubh@2202",
//     database: "u709105172_ykcXh",
// }
// const mysql_config = {
//     host: "localhost",
//     user: "root",
//     password: "shekhar2303",
//     database: "thetrace",
// }

// const pool = mysql.createConnection(mysql_config)
// const query = promisify(pool.query).bind(pool)
// const end = promisify(pool.end).bind(pool)

// query("show tables").then((e) => {
//     console.log(e)
// })

// end()

//ssh access
// ssh -p 65002 u709105172@185.224.137.7 // password=Shubh@2202
//mysql -u u709105172_O4VwE -h localhost -D u709105172_ykcXh -p

// https://github.com/uvish?tab=repositories

// query("update card_details set icon='../icons/phone.png' where id=3")
// query("update card_details set icon='../icons/whatsapp.png' where id=4")
// query("update card_details set icon='../icons/facebook.png' where id=5")
// query("update card_details set icon='../icons/instagram.png' where id=6")
// query("update card_details set icon='../icons/telegram.png' where id=7")
// query("update card_details set icon='../icons/snapchat.png' where id=8")
// query("update card_details set icon='../icons/twitter.png' where id=9")
// query("update card_details set icon='../icons/linkedin.png' where id=10")
// query("update card_details set icon='../icons/youtube.png' where id=11")
// query("update card_details set icon='../icons/skype.png' where id=12")
// query("update card_details set icon='../icons/soundcloud.png' where id=13")
// query("update card_details set icon='../icons/website.png' where id=14")
// query("update card_details set icon='../icons/links.png' where id=15")
// query("update card_details set icon='../icons/address.png' where id=16")
// end()
