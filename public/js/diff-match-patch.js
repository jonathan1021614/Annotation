(function(){var a;function diff_match_patch(){function b(){for(var c=0,d=1,e=2;d!=e;){c++;d=e;e<<=1}return c}this.Diff_Timeout=1;this.Diff_EditCost=4;this.Diff_DualThreshold=32;this.Match_Threshold=0.5;this.Match_Distance=1E3;this.Patch_DeleteThreshold=0.5;this.Patch_Margin=4;this.Match_MaxBits=b()}a=diff_match_patch.prototype;
a.diff_main=function(b,c,d){if(b==c)return[[0,b]];if(typeof d=="undefined")d=true;var e=d,f=this.diff_commonPrefix(b,c);d=b.substring(0,f);b=b.substring(f);c=c.substring(f);f=this.diff_commonSuffix(b,c);var h=b.substring(b.length-f);b=b.substring(0,b.length-f);c=c.substring(0,c.length-f);b=this.diff_compute(b,c,e);d&&b.unshift([0,d]);h&&b.push([0,h]);this.diff_cleanupMerge(b);return b};
a.diff_compute=function(b,c,d){var e;if(!b)return[[1,c]];if(!c)return[[-1,b]];e=b.length>c.length?b:c;var f=b.length>c.length?c:b,h=e.indexOf(f);if(h!=-1){e=[[1,e.substring(0,h)],[0,f],[1,e.substring(h+f.length)]];if(b.length>c.length)e[0][0]=e[2][0]=-1;return e}if(e=this.diff_halfMatch(b,c)){var g=e[0];b=e[1];f=e[2];c=e[3];e=e[4];g=this.diff_main(g,f,d);d=this.diff_main(b,c,d);return g.concat([[0,e]],d)}if(d&&(b.length<100||c.length<100))d=false;if(d){g=this.diff_linesToChars(b,c);b=g[0];c=g[1];
g=g[2]}(e=this.diff_map(b,c))||(e=[[-1,b],[1,c]]);if(d){this.diff_charsToLines(e,g);this.diff_cleanupSemantic(e);e.push([0,""]);c=b=d=0;for(f=g="";d<e.length;){switch(e[d][0]){case 1:c++;f+=e[d][1];break;case -1:b++;g+=e[d][1];break;case 0:if(b>=1&&c>=1){g=this.diff_main(g,f,false);e.splice(d-b-c,b+c);d=d-b-c;for(b=g.length-1;b>=0;b--)e.splice(d,0,g[b]);d+=g.length}b=c=0;f=g="";break}d++}e.pop()}return e};
a.diff_linesToChars=function(b,c){function d(h){for(var g="",i=0,k=-1,j=e.length;k<h.length-1;){k=h.indexOf("\n",i);if(k==-1)k=h.length-1;var l=h.substring(i,k+1);i=k+1;if(f.hasOwnProperty?f.hasOwnProperty(l):f[l]!==undefined)g+=String.fromCharCode(f[l]);else{g+=String.fromCharCode(j);f[l]=j;e[j++]=l}}return g}var e=[],f={};e[0]="";b=d(b);c=d(c);return[b,c,e]};a.diff_charsToLines=function(b,c){for(var d=0;d<b.length;d++){for(var e=b[d][1],f=[],h=0;h<e.length;h++)f[h]=c[e.charCodeAt(h)];b[d][1]=f.join("")}};
a.diff_map=function(b,c){var d=(new Date).getTime()+this.Diff_Timeout*1E3,e=b.length,f=c.length,h=e+f-1,g=this.Diff_DualThreshold*2<h,i=[],k=[],j={},l={};j[1]=0;l[1]=0;for(var m,o,p,n={},u=false,s=!!n.hasOwnProperty,r=(e+f)%2,q=0;q<h;q++){if(this.Diff_Timeout>0&&(new Date).getTime()>d)return null;i[q]={};for(var t=-q;t<=q;t+=2){m=t==-q||t!=q&&j[t-1]<j[t+1]?j[t+1]:j[t-1]+1;o=m-t;if(g){p=m+","+o;if(r&&(s?n.hasOwnProperty(p):n[p]!==undefined))u=true;r||(n[p]=q)}for(;!u&&m<e&&o<f&&b.charAt(m)==c.charAt(o);){m++;
o++;if(g){p=m+","+o;if(r&&(s?n.hasOwnProperty(p):n[p]!==undefined))u=true;r||(n[p]=q)}}j[t]=m;i[q][m+","+o]=true;if(m==e&&o==f)return this.diff_path1(i,b,c);else if(u){k=k.slice(0,n[p]+1);d=this.diff_path1(i,b.substring(0,m),c.substring(0,o));return d.concat(this.diff_path2(k,b.substring(m),c.substring(o)))}}if(g){k[q]={};for(t=-q;t<=q;t+=2){m=t==-q||t!=q&&l[t-1]<l[t+1]?l[t+1]:l[t-1]+1;o=m-t;p=e-m+","+(f-o);if(!r&&(s?n.hasOwnProperty(p):n[p]!==undefined))u=true;if(r)n[p]=q;for(;!u&&m<e&&o<f&&b.charAt(e-
m-1)==c.charAt(f-o-1);){m++;o++;p=e-m+","+(f-o);if(!r&&(s?n.hasOwnProperty(p):n[p]!==undefined))u=true;if(r)n[p]=q}l[t]=m;k[q][m+","+o]=true;if(u){i=i.slice(0,n[p]+1);d=this.diff_path1(i,b.substring(0,e-m),c.substring(0,f-o));return d.concat(this.diff_path2(k,b.substring(e-m),c.substring(f-o)))}}}}return null};
a.diff_path1=function(b,c,d){for(var e=[],f=c.length,h=d.length,g=null,i=b.length-2;i>=0;i--)for(;1;)if(b[i].hasOwnProperty?b[i].hasOwnProperty(f-1+","+h):b[i][f-1+","+h]!==undefined){f--;if(g===-1)e[0][1]=c.charAt(f)+e[0][1];else e.unshift([-1,c.charAt(f)]);g=-1;break}else if(b[i].hasOwnProperty?b[i].hasOwnProperty(f+","+(h-1)):b[i][f+","+(h-1)]!==undefined){h--;if(g===1)e[0][1]=d.charAt(h)+e[0][1];else e.unshift([1,d.charAt(h)]);g=1;break}else{f--;h--;if(c.charAt(f)!=d.charAt(h))throw new Error("No diagonal.  Can't happen. (diff_path1)");
if(g===0)e[0][1]=c.charAt(f)+e[0][1];else e.unshift([0,c.charAt(f)]);g=0}return e};
a.diff_path2=function(b,c,d){for(var e=[],f=0,h=c.length,g=d.length,i=null,k=b.length-2;k>=0;k--)for(;1;)if(b[k].hasOwnProperty?b[k].hasOwnProperty(h-1+","+g):b[k][h-1+","+g]!==undefined){h--;if(i===-1)e[f-1][1]+=c.charAt(c.length-h-1);else e[f++]=[-1,c.charAt(c.length-h-1)];i=-1;break}else if(b[k].hasOwnProperty?b[k].hasOwnProperty(h+","+(g-1)):b[k][h+","+(g-1)]!==undefined){g--;if(i===1)e[f-1][1]+=d.charAt(d.length-g-1);else e[f++]=[1,d.charAt(d.length-g-1)];i=1;break}else{h--;g--;if(c.charAt(c.length-
h-1)!=d.charAt(d.length-g-1))throw new Error("No diagonal.  Can't happen. (diff_path2)");if(i===0)e[f-1][1]+=c.charAt(c.length-h-1);else e[f++]=[0,c.charAt(c.length-h-1)];i=0}return e};a.diff_commonPrefix=function(b,c){if(!b||!c||b.charCodeAt(0)!==c.charCodeAt(0))return 0;for(var d=0,e=Math.min(b.length,c.length),f=e,h=0;d<f;){if(b.substring(h,f)==c.substring(h,f))h=d=f;else e=f;f=Math.floor((e-d)/2+d)}return f};
a.diff_commonSuffix=function(b,c){if(!b||!c||b.charCodeAt(b.length-1)!==c.charCodeAt(c.length-1))return 0;for(var d=0,e=Math.min(b.length,c.length),f=e,h=0;d<f;){if(b.substring(b.length-f,b.length-h)==c.substring(c.length-f,c.length-h))h=d=f;else e=f;f=Math.floor((e-d)/2+d)}return f};
a.diff_halfMatch=function(b,c){function d(i,k,j){for(var l=i.substring(j,j+Math.floor(i.length/4)),m=-1,o="",p,n,u,s;(m=k.indexOf(l,m+1))!=-1;){var r=h.diff_commonPrefix(i.substring(j),k.substring(m)),q=h.diff_commonSuffix(i.substring(0,j),k.substring(0,m));if(o.length<q+r){o=k.substring(m-q,m)+k.substring(m,m+r);p=i.substring(0,j-q);n=i.substring(j+r);u=k.substring(0,m-q);s=k.substring(m+r)}}return o.length>=i.length/2?[p,n,u,s,o]:null}var e=b.length>c.length?b:c,f=b.length>c.length?c:b;if(e.length<
10||f.length<1)return null;var h=this,g=d(e,f,Math.ceil(e.length/4));e=d(e,f,Math.ceil(e.length/2));if(!g&&!e)return null;else g=e?g?g[4].length>e[4].length?g:e:e:g;if(b.length>c.length){b=g[0];c=g[1];e=g[2];f=g[3]}else{e=g[0];f=g[1];b=g[2];c=g[3]}g=g[4];return[b,c,e,f,g]};
a.diff_cleanupSemantic=function(b){for(var c=false,d=[],e=0,f=null,h=0,g=0,i=0;h<b.length;){if(b[h][0]==0){d[e++]=h;g=i;i=0;f=b[h][1]}else{i+=b[h][1].length;if(f!==null&&f.length<=g&&f.length<=i){b.splice(d[e-1],0,[-1,f]);b[d[e-1]+1][0]=1;e--;e--;h=e>0?d[e-1]:-1;i=g=0;f=null;c=true}}h++}c&&this.diff_cleanupMerge(b);this.diff_cleanupSemanticLossless(b)};
a.diff_cleanupSemanticLossless=function(b){function c(s,r){if(!s||!r)return 5;var q=0;if(s.charAt(s.length-1).match(d)||r.charAt(0).match(d)){q++;if(s.charAt(s.length-1).match(e)||r.charAt(0).match(e)){q++;if(s.charAt(s.length-1).match(f)||r.charAt(0).match(f)){q++;if(s.match(h)||r.match(g))q++}}}return q}for(var d=/[^a-zA-Z0-9]/,e=/\s/,f=/[\r\n]/,h=/\n\r?\n$/,g=/^\r?\n\r?\n/,i=1;i<b.length-1;){if(b[i-1][0]==0&&b[i+1][0]==0){var k=b[i-1][1],j=b[i][1],l=b[i+1][1],m=this.diff_commonSuffix(k,j);if(m){var o=
j.substring(j.length-m);k=k.substring(0,k.length-m);j=o+j.substring(0,j.length-m);l=o+l}m=k;o=j;for(var p=l,n=c(k,j)+c(j,l);j.charAt(0)===l.charAt(0);){k+=j.charAt(0);j=j.substring(1)+l.charAt(0);l=l.substring(1);var u=c(k,j)+c(j,l);if(u>=n){n=u;m=k;o=j;p=l}}if(b[i-1][1]!=m){if(m)b[i-1][1]=m;else{b.splice(i-1,1);i--}b[i][1]=o;if(p)b[i+1][1]=p;else{b.splice(i+1,1);i--}}}i++}};
a.diff_cleanupEfficiency=function(b){for(var c=false,d=[],e=0,f="",h=0,g=false,i=false,k=false,j=false;h<b.length;){if(b[h][0]==0){if(b[h][1].length<this.Diff_EditCost&&(k||j)){d[e++]=h;g=k;i=j;f=b[h][1]}else{e=0;f=""}k=j=false}else{if(b[h][0]==-1)j=true;else k=true;if(f&&(g&&i&&k&&j||f.length<this.Diff_EditCost/2&&g+i+k+j==3)){b.splice(d[e-1],0,[-1,f]);b[d[e-1]+1][0]=1;e--;f="";if(g&&i){k=j=true;e=0}else{e--;h=e>0?d[e-1]:-1;k=j=false}c=true}}h++}c&&this.diff_cleanupMerge(b)};
a.diff_cleanupMerge=function(b){b.push([0,""]);for(var c=0,d=0,e=0,f="",h="",g;c<b.length;)switch(b[c][0]){case 1:e++;h+=b[c][1];c++;break;case -1:d++;f+=b[c][1];c++;break;case 0:if(d!==0||e!==0){if(d!==0&&e!==0){g=this.diff_commonPrefix(h,f);if(g!==0){if(c-d-e>0&&b[c-d-e-1][0]==0)b[c-d-e-1][1]+=h.substring(0,g);else{b.splice(0,0,[0,h.substring(0,g)]);c++}h=h.substring(g);f=f.substring(g)}g=this.diff_commonSuffix(h,f);if(g!==0){b[c][1]=h.substring(h.length-g)+b[c][1];h=h.substring(0,h.length-g);f=
f.substring(0,f.length-g)}}if(d===0)b.splice(c-d-e,d+e,[1,h]);else e===0?b.splice(c-d-e,d+e,[-1,f]):b.splice(c-d-e,d+e,[-1,f],[1,h]);c=c-d-e+(d?1:0)+(e?1:0)+1}else if(c!==0&&b[c-1][0]==0){b[c-1][1]+=b[c][1];b.splice(c,1)}else c++;d=e=0;h=f="";break}b[b.length-1][1]===""&&b.pop();d=false;for(c=1;c<b.length-1;){if(b[c-1][0]==0&&b[c+1][0]==0)if(b[c][1].substring(b[c][1].length-b[c-1][1].length)==b[c-1][1]){b[c][1]=b[c-1][1]+b[c][1].substring(0,b[c][1].length-b[c-1][1].length);b[c+1][1]=b[c-1][1]+b[c+
1][1];b.splice(c-1,1);d=true}else if(b[c][1].substring(0,b[c+1][1].length)==b[c+1][1]){b[c-1][1]+=b[c+1][1];b[c][1]=b[c][1].substring(b[c+1][1].length)+b[c+1][1];b.splice(c+1,1);d=true}c++}d&&this.diff_cleanupMerge(b)};a.diff_xIndex=function(b,c){var d=0,e=0,f=0,h=0,g;for(g=0;g<b.length;g++){if(b[g][0]!==1)d+=b[g][1].length;if(b[g][0]!==-1)e+=b[g][1].length;if(d>c)break;f=d;h=e}if(b.length!=g&&b[g][0]===-1)return h;return h+(c-f)};
a.diff_prettyHtml=function(b){for(var c=[],d=0,e=0;e<b.length;e++){var f=b[e][0],h=b[e][1],g=h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"&para;<BR>");switch(f){case 1:c[e]='<INS STYLE="background:#E6FFE6;" TITLE="i='+d+'">'+g+"</INS>";break;case -1:c[e]='<DEL STYLE="background:#FFE6E6;" TITLE="i='+d+'">'+g+"</DEL>";break;case 0:c[e]='<SPAN TITLE="i='+d+'">'+g+"</SPAN>";break}if(f!==-1)d+=h.length}return c.join("")};
a.diff_text1=function(b){for(var c=[],d=0;d<b.length;d++)if(b[d][0]!==1)c[d]=b[d][1];return c.join("")};a.diff_text2=function(b){for(var c=[],d=0;d<b.length;d++)if(b[d][0]!==-1)c[d]=b[d][1];return c.join("")};a.diff_levenshtein=function(b){for(var c=0,d=0,e=0,f=0;f<b.length;f++){var h=b[f][0],g=b[f][1];switch(h){case 1:d+=g.length;break;case -1:e+=g.length;break;case 0:c+=Math.max(d,e);e=d=0;break}}c+=Math.max(d,e);return c};
a.diff_toDelta=function(b){for(var c=[],d=0;d<b.length;d++)switch(b[d][0]){case 1:c[d]="+"+encodeURI(b[d][1]);break;case -1:c[d]="-"+b[d][1].length;break;case 0:c[d]="="+b[d][1].length;break}return c.join("\t").replace(/\x00/g,"%00").replace(/%20/g," ")};
a.diff_fromDelta=function(b,c){var d=[],e=0,f=0;c=c.replace(/%00/g,"\u0000");c=c.split(/\t/g);for(var h=0;h<c.length;h++){var g=c[h].substring(1);switch(c[h].charAt(0)){case "+":try{d[e++]=[1,decodeURI(g)]}catch(i){throw new Error("Illegal escape in diff_fromDelta: "+g);}break;case "-":case "=":var k=parseInt(g,10);if(isNaN(k)||k<0)throw new Error("Invalid number in diff_fromDelta: "+g);g=b.substring(f,f+=k);if(c[h].charAt(0)=="=")d[e++]=[0,g];else d[e++]=[-1,g];break;default:if(c[h])throw new Error("Invalid diff operation in diff_fromDelta: "+
c[h]);}}if(f!=b.length)throw new Error("Delta length ("+f+") does not equal source text length ("+b.length+").");return d};a.match_main=function(b,c,d){d=Math.max(0,Math.min(d,b.length));return b==c?0:b.length?b.substring(d,d+c.length)==c?d:this.match_bitap(b,c,d):-1};
a.match_bitap=function(b,c,d){function e(s,r){s=s/c.length;r=Math.abs(d-r);if(!h.Match_Distance)return r?1:s;return s+r/h.Match_Distance}if(c.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var f=this.match_alphabet(c),h=this,g=this.Match_Threshold,i=b.indexOf(c,d);if(i!=-1){g=Math.min(e(0,i),g);i=b.lastIndexOf(c,d+c.length);if(i!=-1)g=Math.min(e(0,i),g)}var k=1<<c.length-1;i=-1;for(var j,l,m=c.length+b.length,o,p=0;p<c.length;p++){j=0;for(l=m;j<l;){if(e(p,d+l)<=g)j=
l;else m=l;l=Math.floor((m-j)/2+j)}m=l;j=Math.max(1,d-l+1);var n=Math.min(d+l,b.length)+c.length;l=Array(n+2);l[n+1]=(1<<p)-1;for(n=n;n>=j;n--){var u=f[b.charAt(n-1)];l[n]=p===0?(l[n+1]<<1|1)&u:(l[n+1]<<1|1)&u|(o[n+1]|o[n])<<1|1|o[n+1];if(l[n]&k){u=e(p,n-1);if(u<=g){g=u;i=n-1;if(i>d)j=Math.max(1,2*d-i);else break}}}if(e(p+1,d)>g)break;o=l}return i};a.match_alphabet=function(b){for(var c={},d=0;d<b.length;d++)c[b.charAt(d)]=0;for(d=0;d<b.length;d++)c[b.charAt(d)]|=1<<b.length-d-1;return c};
a.patch_addContext=function(b,c){if(c.length!=0){for(var d=c.substring(b.start2,b.start2+b.length1),e=0;c.indexOf(d)!=c.lastIndexOf(d)&&d.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;){e+=this.Patch_Margin;d=c.substring(b.start2-e,b.start2+b.length1+e)}e+=this.Patch_Margin;(d=c.substring(b.start2-e,b.start2))&&b.diffs.unshift([0,d]);(c=c.substring(b.start2+b.length1,b.start2+b.length1+e))&&b.diffs.push([0,c]);b.start1-=d.length;b.start2-=d.length;b.length1+=d.length+c.length;b.length2+=
d.length+c.length}};
a.patch_make=function(b,c,d){var e;if(typeof b=="string"&&typeof c=="string"&&typeof d=="undefined"){e=b;c=this.diff_main(e,c,true);if(c.length>2){this.diff_cleanupSemantic(c);this.diff_cleanupEfficiency(c)}}else if(typeof b=="object"&&typeof c=="undefined"&&typeof d=="undefined"){c=b;e=this.diff_text1(c)}else if(typeof b=="string"&&typeof c=="object"&&typeof d=="undefined"){e=b;c=c}else if(typeof b=="string"&&typeof c=="string"&&typeof d=="object"){e=b;c=d}else throw new Error("Unknown call format to patch_make.");if(c.length===
0)return[];d=[];b=new patch_obj;var f=0,h=0,g=0,i=e;e=e;for(var k=0;k<c.length;k++){var j=c[k][0],l=c[k][1];if(!f&&j!==0){b.start1=h;b.start2=g}switch(j){case 1:b.diffs[f++]=c[k];b.length2+=l.length;e=e.substring(0,g)+l+e.substring(g);break;case -1:b.length1+=l.length;b.diffs[f++]=c[k];e=e.substring(0,g)+e.substring(g+l.length);break;case 0:if(l.length<=2*this.Patch_Margin&&f&&c.length!=k+1){b.diffs[f++]=c[k];b.length1+=l.length;b.length2+=l.length}else if(l.length>=2*this.Patch_Margin)if(f){this.patch_addContext(b,
i);d.push(b);b=new patch_obj;f=0;i=e;h=g}break}if(j!==1)h+=l.length;if(j!==-1)g+=l.length}if(f){this.patch_addContext(b,i);d.push(b)}return d};a.patch_deepCopy=function(b){for(var c=[],d=0;d<b.length;d++){var e=b[d],f=new patch_obj;f.diffs=[];for(var h=0;h<e.diffs.length;h++)f.diffs[h]=e.diffs[h].slice();f.start1=e.start1;f.start2=e.start2;f.length1=e.length1;f.length2=e.length2;c[d]=f}return c};
a.patch_apply=function(b,c){if(b.length==0)return[c,[]];b=this.patch_deepCopy(b);var d=this.patch_addPadding(b);c=d+c+d;this.patch_splitMax(b);for(var e=0,f=[],h=0;h<b.length;h++){var g=b[h].start2+e,i=this.diff_text1(b[h].diffs),k,j=-1;if(i.length>this.Match_MaxBits){k=this.match_main(c,i.substring(0,this.Match_MaxBits),g);if(k!=-1){j=this.match_main(c,i.substring(i.length-this.Match_MaxBits),g+i.length-this.Match_MaxBits);if(j==-1||k>=j)k=-1}}else k=this.match_main(c,i,g);if(k==-1){f[h]=false;e-=
b[h].length2-b[h].length1}else{f[h]=true;e=k-g;g=j==-1?c.substring(k,k+i.length):c.substring(k,j+this.Match_MaxBits);if(i==g)c=c.substring(0,k)+this.diff_text2(b[h].diffs)+c.substring(k+i.length);else{g=this.diff_main(i,g,false);if(i.length>this.Match_MaxBits&&this.diff_levenshtein(g)/i.length>this.Patch_DeleteThreshold)f[h]=false;else{this.diff_cleanupSemanticLossless(g);i=0;var l;for(j=0;j<b[h].diffs.length;j++){var m=b[h].diffs[j];if(m[0]!==0)l=this.diff_xIndex(g,i);if(m[0]===1)c=c.substring(0,
k+l)+m[1]+c.substring(k+l);else if(m[0]===-1)c=c.substring(0,k+l)+c.substring(k+this.diff_xIndex(g,i+m[1].length));if(m[0]!==-1)i+=m[1].length}}}}}c=c.substring(d.length,c.length-d.length);return[c,f]};
a.patch_addPadding=function(b){for(var c=this.Patch_Margin,d="",e=1;e<=c;e++)d+=String.fromCharCode(e);for(e=0;e<b.length;e++){b[e].start1+=c;b[e].start2+=c}e=b[0];var f=e.diffs;if(f.length==0||f[0][0]!=0){f.unshift([0,d]);e.start1-=c;e.start2-=c;e.length1+=c;e.length2+=c}else if(c>f[0][1].length){var h=c-f[0][1].length;f[0][1]=d.substring(f[0][1].length)+f[0][1];e.start1-=h;e.start2-=h;e.length1+=h;e.length2+=h}e=b[b.length-1];f=e.diffs;if(f.length==0||f[f.length-1][0]!=0){f.push([0,d]);e.length1+=
c;e.length2+=c}else if(c>f[f.length-1][1].length){h=c-f[f.length-1][1].length;f[f.length-1][1]+=d.substring(0,h);e.length1+=h;e.length2+=h}return d};
a.patch_splitMax=function(b){for(var c=0;c<b.length;c++)if(b[c].length1>this.Match_MaxBits){var d=b[c];b.splice(c--,1);for(var e=this.Match_MaxBits,f=d.start1,h=d.start2,g="";d.diffs.length!==0;){var i=new patch_obj,k=true;i.start1=f-g.length;i.start2=h-g.length;if(g!==""){i.length1=i.length2=g.length;i.diffs.push([0,g])}for(;d.diffs.length!==0&&i.length1<e-this.Patch_Margin;){g=d.diffs[0][0];var j=d.diffs[0][1];if(g===1){i.length2+=j.length;h+=j.length;i.diffs.push(d.diffs.shift());k=false}else if(g===
-1&&i.diffs.length==1&&i.diffs[0][0]==0&&j.length>2*e){i.length1+=j.length;f+=j.length;k=false;i.diffs.push([g,j]);d.diffs.shift()}else{j=j.substring(0,e-i.length1-this.Patch_Margin);i.length1+=j.length;f+=j.length;if(g===0){i.length2+=j.length;h+=j.length}else k=false;i.diffs.push([g,j]);if(j==d.diffs[0][1])d.diffs.shift();else d.diffs[0][1]=d.diffs[0][1].substring(j.length)}}g=this.diff_text2(i.diffs);g=g.substring(g.length-this.Patch_Margin);j=this.diff_text1(d.diffs).substring(0,this.Patch_Margin);
if(j!==""){i.length1+=j.length;i.length2+=j.length;if(i.diffs.length!==0&&i.diffs[i.diffs.length-1][0]===0)i.diffs[i.diffs.length-1][1]+=j;else i.diffs.push([0,j])}k||b.splice(++c,0,i)}}};a.patch_toText=function(b){for(var c=[],d=0;d<b.length;d++)c[d]=b[d];return c.join("")};
a.patch_fromText=function(b){var c=[];if(!b)return c;b=b.replace(/%00/g,"\u0000");b=b.split("\n");for(var d=0;d<b.length;){var e=b[d].match(/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/);if(!e)throw new Error("Invalid patch string: "+b[d]);var f=new patch_obj;c.push(f);f.start1=parseInt(e[1],10);if(e[2]===""){f.start1--;f.length1=1}else if(e[2]=="0")f.length1=0;else{f.start1--;f.length1=parseInt(e[2],10)}f.start2=parseInt(e[3],10);if(e[4]===""){f.start2--;f.length2=1}else if(e[4]=="0")f.length2=0;else{f.start2--;
f.length2=parseInt(e[4],10)}for(d++;d<b.length;){e=b[d].charAt(0);try{var h=decodeURI(b[d].substring(1))}catch(g){throw new Error("Illegal escape in patch_fromText: "+h);}if(e=="-")f.diffs.push([-1,h]);else if(e=="+")f.diffs.push([1,h]);else if(e==" ")f.diffs.push([0,h]);else if(e=="@")break;else if(e!=="")throw new Error('Invalid patch mode "'+e+'" in: '+h);d++}}return c};function patch_obj(){this.diffs=[];this.start2=this.start1=null;this.length2=this.length1=0}
patch_obj.prototype.toString=function(){var b,c;b=this.length1===0?this.start1+",0":this.length1==1?this.start1+1:this.start1+1+","+this.length1;c=this.length2===0?this.start2+",0":this.length2==1?this.start2+1:this.start2+1+","+this.length2;b=["@@ -"+b+" +"+c+" @@\n"];var d;for(c=0;c<this.diffs.length;c++){switch(this.diffs[c][0]){case 1:d="+";break;case -1:d="-";break;case 0:d=" ";break}b[c+1]=d+encodeURI(this.diffs[c][1])+"\n"}return b.join("").replace(/\x00/g,"%00").replace(/%20/g," ")};
window.diff_match_patch=diff_match_patch;window.patch_obj=patch_obj;window.DIFF_DELETE=-1;window.DIFF_INSERT=1;window.DIFF_EQUAL=0;})()
