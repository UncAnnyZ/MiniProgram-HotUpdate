const fs = require('fs')

var inlineCss = require('inline-css');

fs.readFile('src/index.js', (err, buffer) => {

  if (err) {
    console.log(err)
  } else {

    options = {}

    options.url = "index.css"

    fs.readFile('src/index.wxml', (err, buffer1) => {
      fs.readFile('src/index.css', (err, buffer2) => {
        if (err) {
          console.log(err)
        } else {
          // css处理
          let css = buffer2.toString()
          css1 = css.replace(/[\n]/g, "");
          let darkCss = css1.match(/dark\s*\)\s*{(.*?)}\s*}/g);
          darkCss = darkCss ? darkCss[0].match(/\.(.*?)(.*?){(.*?)}/g): darkCss;
          let darks = new Set()
          for(i in darkCss){
            var regexp = /\.(.*?)(.*?){(.*?)}/;
            let p = darkCss[i].match(regexp);
            
            darks.add({ [p[2].split(/\s+/)[0]]: p[3] })
          }
          let noChange = []
          let html =  '<style>' + css + '</style>' + buffer1.toString()
          html = html.replace(/<!--(.*?)-->/g, "") 
          html = html.replace(/'/g, `"`)
          inlineCss(html, options)
            .then(function (html) {
              console.log(html)
              let y = 0;
              // console.log(html)
              let tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
              let tagAll = []
              let html2 = html.match(tagRE)
    
              for (i in html2) {
                if (html2[i].match(/\/(\s*?)>/)) {
                  continue
                }
                let a = ''
                for (let x of darks) {
            
                  if(html2[i].match(Object.keys(x)[0])){
                    a = x[Object.keys(x)[0]]
                  }
                }
                let tag1 
                if(a){
                  tag1 = html2[i].replace(">", " ${this.data.dark == 'dark' ? 'style=\"" + a +"\"' : ''} g=" + y + ">")
                }else{
                  tag1 = html2[i].replace(">", " g=" + y + ">")
                }

                html = html.replace(html2[i], tag1)
                y += 1
              }
    
              html.replace(tagRE, function (tag, index) {
                let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
                let type = tagMatch[1] + ".0";
    
                if (tag.match(/\/(\s*?)>/)) {
                  // console.log(tag, 222)
                  return
                }
                // console.log(type, 123)
                if (tag.match(/wx:for/)) {
                  // console.log(0)
                  type = tagMatch[1] + ".1"
                  let t = tag.match(/wx:for="{{(.*)}}"/);
                  let item = tag.match(/wx:for-item="(.*?)?"/) ? tag.match(/wx:for-item="(.*?)?"/)[1] : 'item'
                  let index = tag.match(/wx:for-index="(.*?)?"/) ? tag.match(/wx:for-index="(.*?)?"/)[1] : 'index'
                  noChange.push(item)
                  noChange.push(index)
    
    
                  html = html.replaceAll(tag, `\${this.data.${t[1]}.map((${item}, ${index}) =>  \` ` + tag)
                }
    
                function truncate(arr) {
                  var m = arr.slice(0);
                  m.splice(m.length - 1, 1);
                  return m;
                }
    
                if (tag.match(/<(\s*?)\//)) {
                  // console.log(tag, 233)
                  // tagAll = truncate(tagAll)
                  if (tagAll[tagAll.length - 1] && tagAll[tagAll.length - 1].split(".")[1] === "1") {
                    html = html.replace(tag, tag + '`)}')
                  }
                  tagAll = truncate(tagAll)
    
                } else {
                  tagAll.push(type)
                }
    
              });
              html.replace(tagRE, function (tag, index) {
                // console.log("$" + y)
                html = html.replaceAll(" g=" + y, '')
                y -= 1
              })
              // console.log(html, 233)
              html = html.replaceAll(" g=0", '')
      
              var regexp = /{{(.*?)}}/g;
              let p = html.match(regexp)
    
              for (i in p) {
                let k = p[i].match(/{{(.*?)}}/)[1]
                let p1 = ''
                try {
                  JSON.parse(k)
                  p1 = JSON.stringify(k)
    
                } catch (e) {
                  var fh = k.match(/[`~!@#$%^&*()+<>?:{},\/;[\]]/g)
                  for (j in fh) {
    
                    k = k.replaceAll(fh[j], ` ${fh[j]} `)
    
                  }
                  let dz = k.match(/"(.*?)"/g)
                  k = k.replace(/"(.*?)"/g, '~~~')
                  let array = k.split(/\s+/g)
    
                  for (j in array) {
                    if (array[j].match(/^[a-zA-Z]/)) {
                      // console.log(array)
                      // p1 += `${array[j]}`
                      p1 += 'typeof this.data.' + array[j] + ' === "object" ? JSON.stringify( ' + 'this.data.' + array[j] + ') : this.data.' + array[j]
                    } else {
                
                      try {
                        JSON.parse(k)
                        p1 += JSON.stringify(array[j])
                      } catch {
                        p1 += array[j]
                      }
                    }
                  }
                  for (j in dz) {
                    p1 = p1.replace(/~~~/, dz[j])
                  }
    
                }
                html = html.replace(p[i], `\${${p1}}`)
              }
              // console.log(html)
              // wx:for的内容转换
              html = html.replace(/[\n]/g, "");
              let wxForexp = /\.map(.*?)`\)}/g;
              let wxForhtml = html.match(wxForexp)
              let wxForhtml1 = html.match(wxForexp)
    
    
              for (i in wxForhtml) {
                for (j in noChange) {
                  if (wxForhtml[i].match(noChange[j])) {
                    // console.log('123456')
                    wxForhtml[i] = wxForhtml[i].replaceAll('this.data.' + noChange[j], noChange[j])
                    // console.log(wxForhtml[i])
                  }
                }
    
                html = html.replace(wxForhtml1[i], wxForhtml[i])
                // console.log(html)
              }
    
              // if(p !== 'item'){
    
              // }
              // html = html.replace(/{{(.*?)}}/g, `\${}`)
    
              let str = buffer.toString()
              str = `function runCode(){
              `
              str += buffer.toString()
              str = str.replace(/setData/g, "setdata");
    
              let onload = /onReady:(.*)function(.*)\((.*?)\)(.*){/
              let onloadJS = str.match(onload)
              if (onloadJS) {
                str = str.replace(onloadJS[0], onloadJS[0] + ' this.data.dark =wx.getSystemInfoSync().theme; wx.onThemeChange(e => {console.log(e.theme);this.setdata({dark: e.theme})}); this.setdata();')
              }
    
              str = str.replace('Page({', `  
            
            var Page = function(page){
              return page
            }
          return Page({
            ${onloadJS ? '': `
            onReady: function (options) {
              this.setdata({})
            },
            `}
            parseTag(tag) {
              let res = {
                  type1: "tag",
                  name: "",
                  voidElement: false,
                  // attrs: {},
                  children: [],
              };
              let tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
              if (tagMatch) {
                  // 标签名称为正则匹配的第2项
                  res.type1 = tagMatch[1];
                  if (tag.charAt(tag.length - 2) === "/") {
                      // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
                      res.voidElement = true;
                  }
              }
              // 匹配所有的标签正则
              let classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);
            
              if (classList) {
                let style = ''
                  for (let i = 0; i < classList.length; i++) {
                      // 去空格再以= 分隔字符串  得到['属性名称','属性值']
             
                      let c = classList[i].split("=");
                      // c[1] = c[1].replace(/\\s*/g, "")
                      c[0] = c[0].replace(/\\s*/g, "")
                      // 循环设置属性
                      let p = c[1].substring(1, c[1].length - 1)
                      try{
                        p = JSON.parse(c[1].substring(1, c[1].length - 1))
                      }catch(e){
                       
                      }
            
                      if (c[1]) {
                        if(c[0] === 'style'){
                          style += p
                          res[c[0]] = style
                        }else{
                          res[c[0]] = p
                        }
                
                      };
            
                  }
              }
              return res;
            },
            
            parse(html) {
              var that = this;
              let result = [];
              let current;
              let level = -1;
              let arr = [];
              let tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
              html.replace(tagRE, function (tag, index) {
                  // 判断第二个字符是不是'/'来判断是否open
                  let isOpen = tag.charAt(1) !== "/";
                  // 获取标签末尾的索引
                  let start = index + tag.length;
                  // 标签之前的文本信息
                  let text = html.slice(start, html.indexOf("<", start));
            
                  let parent;
                  if (isOpen) {
                      level++;
                      // 设置标签属性
                      current = that.parseTag(tag);
                      // 判断是否为文本信息，是就push一个text children  不等于'  '
                      if (!current.voidElement && text.trim()) {
                          current["text"] = text
                      }
                      // 如果我们是根用户，则推送新的基本节点
                      if (level === 0) {
                          result.push(current);
                      }
                      // 判断有没有上层，有就push当前标签
                      parent = arr[level - 1];
                      if (parent) {
                          parent.children.push(current);
                      }
                      // console.log(current)
                      arr[level] = current;
                  }
                  // 如果不是开标签，或者是空元素：</div><img>
                  if (!isOpen || current.voidElement) {
                      // level--
                      level--;
                  }
              });
              // console.log(result)
              return result;
            
            },
          setdata: function setdata(dictData) {
       
            this.setData(dictData);
            var html = \`${html}\`
            this.setData({html : this.parse(html)});
          },
            `)
              str = str.replace(/\\n/g, "");
              str = str.replace(/\\"/g, "'");
              str += `
      
      
        }
            window.exports = runCode;
        
            `
    
              fs.writeFile('dist/index.js', str, {
                encoding: 'utf8'
              }, err => {})
            });
    
        }
      })
 
    })



  }
})