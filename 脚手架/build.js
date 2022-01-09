const fs = require('fs')



fs.readFile('dist/index.js', (err, buffer) => {

  if (err) {
    console.log(err)
  } else {

    let str = buffer.toString()
    // print(str)
    str = str.replace(/\\n/g, "");
    str = str.replace(/\\"/g, "'");


    fs.readFile('src/index.css', (err, buffer) => {
      if (err) {
        console.log(err)
      } else {
        // css处理
        let css = buffer.toString()
        css = css.replace(/\n/g, "");
        var regexp = /\.(.*?)(.*?){(.*?)}/g;
        allcss = css.match(regexp);
    
        let s = new Set()
        for (i in allcss) {
       
          var regexp = /\.(.*?)(.*?){(.*?)}/;
          let p = allcss[i].match(regexp);
          s.add({ [p[2].split(/\s+/)[0]]: p[3] })
        }
       
        // console.log(s);



          let allStrClass = str.match(/class='(.*?)*?'/g)
          if(allStrClass === null){
            allStrClass = str.match(/class="(.*?)*?"/g)
          }
          let allStrClass1 = str.match(/class='(.*?)*?'/g);
          // console.log(allStrClass, 233)
  
          for (i in allStrClass) {
            
            var regexp = /class='(.*?)'/;
            if(allStrClass1 === null){
              var regexp = /class="(.*?)"/;
            }
            let p = allStrClass[i].match(regexp)[1];
            let newStyle = p.split(/\s+/)
            let Style = ""
            for (j in newStyle) {
              // console.log(newStyle[j].match(/"(.*)"/))
              for (let x of s) {
                try{
                  if (newStyle[j] === Object.keys(x)[0]) {
                    newStyle[j] = x[Object.keys(x)[0]]
                    break;
                  }
                  // console.log(newStyle[j].match(/"(.*)"/)[1] ,Object.keys(x)[0])
                  if (newStyle[j].match(/"(.*)"/)[1] === Object.keys(x)[0] && Object.keys(x)[0] !== '') {
                    newStyle[j] = newStyle[j].replace(/"(.*)"/, '"' + x[Object.keys(x)[0]] + '"')
                    break
                  }
                }catch{
       
                }
                
       
              }
              // console.log(newStyle[j])
              Style += newStyle[j]
            }
            console.log(Style)
            
            if(allStrClass1 === null){
              allStrClass[i] = allStrClass[i].replace(regexp, 'style=\"' + Style + '\"')
            }else{
              allStrClass[i] = allStrClass[i].replace(regexp, 'style=\'' + Style + '\'')
            }
        
       
          }
          // console.log(allStrClass)

          if(allStrClass1 === null){
            allStrClass1 = str.match(/class="(.*?)*?"/g)
          }
        
        

        for (i in allStrClass1) {
          // console.log(allStrClass1[i], allStrClass[i])
          str = str.replace(String(allStrClass1[i]), allStrClass[i])
        }
        // console.log(str)


        fs.writeFile('dist/index.js', str, { encoding: 'utf8' }, err => { })
      }


    })

  }
})
