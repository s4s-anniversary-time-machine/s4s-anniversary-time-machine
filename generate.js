let fs = require('fs');

let all = []
let htmlOut = `
<style> .tab {border-collapse:collapse;} </style>

<table>
`
fs.readdirSync('./').forEach(file=>{
    if(!file.endsWith('.htm'))
    {
        return;
    }

    let text = fs.readFileSync(file,'utf-8')
    let title = text.match(/<title>(.+?)<\/title>/)
    let time = text.match(/<span class="dateTime".+?>(.+?)</)
    if(title && time)
    {
        all.push({title: title[1],time: time[1],file})
    }
    else
    {
        console.log('fail on ',file)
    }
})

all.sort((a,b)=>a.time > b.time ? 1 : -1);
all.forEach(({time,title,file})=>htmlOut += `    <tr><td><a href="${file}">${title}</a></td><td> (${time})</td></tr>\n`)

htmlOut+='</table>'

fs.writeFileSync('./index.htm',htmlOut)