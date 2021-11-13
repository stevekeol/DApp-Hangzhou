/*v0.6vv_20170214_fbi*/
window.__wcc_version__='v0.6vv_20170214_fbi'
window.__wxml_transpiler_version__='v0.1'
var $gwxc
var $gaic={}
$gwx=function(path,global){
function _(a,b){b&&a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:tag.substr(0,3)=='wx-'?tag:'wx-'+tag,attr:{},children:[],n:[]}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}function _wl(tname,prefix){console.warn('WXMLRT:'+prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x(){}
x.prototype =
{
hn: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any=false;
for(var x in obj)
{
any|=x==='__value__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any && obj.hasOwnProperty('__wxspec__') ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj)==='n'?obj:this.rv(obj.__value__);
}
}
return new x;
}
wh=$gwh();
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o ) : rev( ops[3], e, s, g, o );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o );
_b = rev( ops[2], e, s, g, o );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o ) : rev( ops[1], e, s, g, o );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o )
{
var op = ops[0];
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4:
return rev( ops[1], e, s, g, o );
break;
case 5:
switch( ops.length )
{
case 2:
return should_pass_type_info ?
[rev(ops[1],e,s,g,o)] :
[wh.rv(rev(ops[1],e,s,g,o))];
break;
case 1:
return [];
break;
default:
_a = rev( ops[1],e,s,g,o );
_a.push(
should_pass_type_info ?
rev( ops[2],e,s,g,o ) :
wh.rv( rev(ops[2],e,s,g,o) )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' )
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' )
{
return undefined;
}
_d = _aa[_bb];
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7:
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
_a = _s && _s.hasOwnProperty(_b) ?
s : _e && ( _e.hasOwnProperty(_b) ? e : undefined );
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8:
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o);
return _a;
break;
case 9:
_a = rev(ops[1],e,s,g,o);
_b = rev(ops[2],e,s,g,o);
function merge( _a, _b, _ow )
{
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
if( should_pass_type_info )
{
if( _tb )
{
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
_aa[k]=wh.nh(_bb[k],'e');
}
}
else
{
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
_aa[k]=_bb[k];
}
}
}
else
{
for(var k in _bb)
{
if ( _ow || _aa.hasOwnProperty(k) )
_aa[k]=wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
return should_pass_type_info ? rev(ops[1],e,s,g,o) : wh.rv(rev(ops[1],e,s,g,o));
}
}
else
{
if( op === 3 || op === 1 ) return ops[1];
else if( op === 11 )
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
return rev;
}
gra=$gwrt(true);
grb=$gwrt(false);
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n';
var scope = wh.rv( _s );
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8];
if( type === 'N' && full[10] === 'l' ) type = 'X';
var _y;
if( _n )
{
if( type === 'A' )
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = wh.nh(i, 'h');
_y = keyname ? (keyname==="*this" ? _v(wh.rv(to_iter[i])) : _v(wh.rv(wh.rv(to_iter[i])[keyname]))) : _v();
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' )
{
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = wh.nh(k, 'h');
_y = keyname ? (keyname==="*this" ? _v(wh.rv(to_iter[k])) : _v(wh.rv(wh.rv(to_iter[k])[keyname]))) : _v();
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'S' )
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' )
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' )
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = wh.nh(i, 'h');
_y = keyname ? (keyname==="*this" ? _v(r_iter_item) : _v(wh.rv(r_iter_item[keyname]))) : _v();
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' )
{
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = wh.nh(k, 'h');
_y = keyname ? (keyname==="*this" ? _v(r_iter_item) : _v(wh.rv(r_iter_item[keyname]))) : _v();
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'S' )
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
scope[itemname] = wh.nh(r_to_iter[i],'h');
scope[indexname] = wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' )
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
scope[itemname] = wh.nh(i,'h');
scope[indexname]= wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else{delete scope[indexname];}}


function _r( node, attrname, opindex, env, scope, global )
{
var o = {};
var a = grb( z[opindex], env, scope, global, o );
node.attr[attrname] = a;
if( o.is_affected ) node.n.push( attrname );
}
function _o( opindex, env, scope, global )
{
var nothing = {};
return grb( z[opindex], env, scope, global, nothing );
}
function _1( opindex, env, scope, global )
{
var nothing = {};
return gra( z[opindex], env, scope, global, nothing );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var to_iter = _1( opindex, env, scope, global, father, itemname, indexname, keyname );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _gv( )
{
if( typeof(window.__webview_engine_version__) == 'undefined' ) return 0.0;
return window.__webview_engine_version__;
}
function _m(tag,attrs,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(attrs[i+1]<0)
{tmp.attr[attrs[i]]=true;}else{_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];}}return tmp;};function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');console.warn('WXMLRT:'+me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if(ppart[i]=='..')mepart.pop();else if(ppart[i]=='.' || !ppart[i])continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}
var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){console.warn('WXMLRT:-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{console.warn('WXMLRT:'+me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}function _w(tn,f,line,c){console.warn('WXMLRT:'+f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }var e_={}
if(global&&typeof(global.entrys)=='object')e_=global.entrys
var d_={}
if(global&&typeof(global.defines)=='object')d_=global.defines
var p_={}
var z = [];
  (function(z){
    var a = 11;
    function Z(ops){z.push(ops)};
    Z([3, 'page-foot']);Z([3, 'none']);Z([3, 'switchTab']);Z([3, '/page/component/index']);Z([3, 'icon-foot']);Z([3, '../../../../image/icon_foot.png']);Z([3, 'page-head']);Z([3, 'page-head-title']);Z([a, [[7],[3, "title"]]]);Z([3, 'page-head-line']);Z([[7],[3, "desc"]]);Z([3, 'page-head-desc']);Z([3, 'container']);Z([3, 'head']);Z([[8], "title", [1, "start/stopRecord、play/stopVoice"]]);Z([3, 'page-body']);Z([3, 'page-section']);Z([[2, "&&"],[[2, "&&"],[[2, "==="], [[7],[3, "recording"]], [1, false]],[[2, "==="], [[7],[3, "playing"]], [1, false]]],[[2, "==="], [[7],[3, "hasRecord"]], [1, false]]]);Z([3, 'page-body-time']);Z([3, 'time-big']);Z([a, [[7],[3, "formatedRecordTime"]]]);Z([3, 'page-body-buttons']);Z([3, 'page-body-button']);Z([3, 'startRecord']);Z([3, '/image/record.png']);Z([[2, "==="], [[7],[3, "recording"]], [1, true]]);Z([3, 'stopRecord']);Z([3, 'button-stop-record']);Z([[2, "&&"],[[2, "==="], [[7],[3, "hasRecord"]], [1, true]],[[2, "==="], [[7],[3, "playing"]], [1, false]]]);Z([a, [[7],[3, "formatedPlayTime"]]]);Z([3, 'time-small']);Z([3, 'playVoice']);Z([3, '/image/play.png']);Z([3, 'clear']);Z([3, '/image/trash.png']);Z([[2, "&&"],[[2, "==="], [[7],[3, "hasRecord"]], [1, true]],[[2, "==="], [[7],[3, "playing"]], [1, true]]]);Z([3, 'stopVoice']);Z([3, '/image/stop.png']);Z([3, 'foot']);
  })(z);d_["./page/common/foot.wxml"] = {};d_["./page/common/foot.wxml"]["foot"]=function(e,s,r,gg){
    var b='./page/common/foot.wxml:foot'
    r.wxVkey=b
    if(p_[b]){_wl(b,'./page/common/foot.wxml');return}
    p_[b]=true
    try{
      var omt = _m( "navigator", ["class", 0,"hoverClass", 1,"openType", 1,"url", 2], e, s, gg);var ont = _m( "image", ["class", 4,"src", 1], e, s, gg);_(omt,ont);_(r,omt);
    }catch(err){
    p_[b]=false
    throw err
    }
    p_[b]=false
    return r
    };
  var m0=function(e,s,r,gg){
    
    return r;
  };
        e_["./page/common/foot.wxml"]={f:m0,j:[],i:[],ti:[],ic:[]};d_["./page/common/head.wxml"] = {};d_["./page/common/head.wxml"]["head"]=function(e,s,r,gg){
    var b='./page/common/head.wxml:head'
    r.wxVkey=b
    if(p_[b]){_wl(b,'./page/common/head.wxml');return}
    p_[b]=true
    try{
      var ort = _n("view");_r(ort, 'class', 6, e, s, gg);var ost = _n("view");_r(ost, 'class', 7, e, s, gg);var ott = _o(8, e, s, gg);_(ost,ott);_(ort,ost);var out = _n("view");_r(out, 'class', 9, e, s, gg);_(ort,out);var ovt = _v();
      if (_o(10, e, s, gg)) {
        ovt.wxVkey = 1;var owt = _n("view");_r(owt, 'class', 11, e, s, gg);var oyt = _o(10, e, s, gg);_(owt,oyt);_(ovt, owt);
      } _(ort,ovt);_(r,ort);
    }catch(err){
    p_[b]=false
    throw err
    }
    p_[b]=false
    return r
    };
  var m1=function(e,s,r,gg){
    
    return r;
  };
        e_["./page/common/head.wxml"]={f:m1,j:[],i:[],ti:[],ic:[]};d_["./page/API/pages/voice/voice.wxml"] = {};
  var m2=function(e,s,r,gg){
    var oAu = e_["./page/API/pages/voice/voice.wxml"].i;_ai(oAu, '../../../common/head.wxml', e_, './page/API/pages/voice/voice.wxml', 0, 0);_ai(oAu, '../../../common/foot.wxml', e_, './page/API/pages/voice/voice.wxml', 0, 0);var oDu = _n("view");_r(oDu, 'class', 12, e, s, gg);var oEu = _v();
       var oFu = _o(13, e, s, gg);
       var oHu = _gd('./page/API/pages/voice/voice.wxml', oFu, e_, d_);
       if (oHu) {
         var oGu = _1(14,e,s,gg);
         oHu(oGu,oGu,oEu, gg);
       } else _w(oFu, './page/API/pages/voice/voice.wxml', 0, 0);_(oDu,oEu);var oIu = _n("view");_r(oIu, 'class', 15, e, s, gg);var oJu = _n("view");_r(oJu, 'class', 16, e, s, gg);var oKu = _v();
      if (_o(17, e, s, gg)) {
        oKu.wxVkey = 1;var oNu = _n("view");_r(oNu, 'class', 18, e, s, gg);var oOu = _n("text");_r(oOu, 'class', 19, e, s, gg);var oPu = _o(20, e, s, gg);_(oOu,oPu);_(oNu,oOu);_(oKu,oNu);var oQu = _n("view");_r(oQu, 'class', 21, e, s, gg);var oRu = _n("view");_r(oRu, 'class', 22, e, s, gg);_(oQu,oRu);var oSu = _m( "view", ["class", 22,"bindtap", 1], e, s, gg);var oTu = _n("image");_r(oTu, 'src', 24, e, s, gg);_(oSu,oTu);_(oQu,oSu);var oUu = _n("view");_r(oUu, 'class', 22, e, s, gg);_(oQu,oUu);_(oKu,oQu);
      } _(oJu,oKu);var oVu = _v();
      if (_o(25, e, s, gg)) {
        oVu.wxVkey = 1;var oYu = _n("view");_r(oYu, 'class', 18, e, s, gg);var oZu = _n("text");_r(oZu, 'class', 19, e, s, gg);var oau = _o(20, e, s, gg);_(oZu,oau);_(oYu,oZu);_(oVu,oYu);var obu = _n("view");_r(obu, 'class', 21, e, s, gg);var ocu = _n("view");_r(ocu, 'class', 22, e, s, gg);_(obu,ocu);var odu = _m( "view", ["class", 22,"bindtap", 4], e, s, gg);var oeu = _n("view");_r(oeu, 'class', 27, e, s, gg);_(odu,oeu);_(obu,odu);var ofu = _n("view");_r(ofu, 'class', 22, e, s, gg);_(obu,ofu);_(oVu,obu);
      } _(oJu,oVu);var ogu = _v();
      if (_o(28, e, s, gg)) {
        ogu.wxVkey = 1;var oju = _n("view");_r(oju, 'class', 18, e, s, gg);var oku = _n("text");_r(oku, 'class', 19, e, s, gg);var olu = _o(29, e, s, gg);_(oku,olu);_(oju,oku);var omu = _n("text");_r(omu, 'class', 30, e, s, gg);var onu = _o(20, e, s, gg);_(omu,onu);_(oju,omu);_(ogu,oju);var oou = _n("view");_r(oou, 'class', 21, e, s, gg);var opu = _n("view");_r(opu, 'class', 22, e, s, gg);_(oou,opu);var oqu = _m( "view", ["class", 22,"bindtap", 9], e, s, gg);var oru = _n("image");_r(oru, 'src', 32, e, s, gg);_(oqu,oru);_(oou,oqu);var osu = _m( "view", ["class", 22,"bindtap", 11], e, s, gg);var otu = _n("image");_r(otu, 'src', 34, e, s, gg);_(osu,otu);_(oou,osu);_(ogu,oou);
      } _(oJu,ogu);var ouu = _v();
      if (_o(35, e, s, gg)) {
        ouu.wxVkey = 1;var oxu = _n("view");_r(oxu, 'class', 18, e, s, gg);var oyu = _n("text");_r(oyu, 'class', 19, e, s, gg);var ozu = _o(29, e, s, gg);_(oyu,ozu);_(oxu,oyu);var o_u = _n("text");_r(o_u, 'class', 30, e, s, gg);var oAv = _o(20, e, s, gg);_(o_u,oAv);_(oxu,o_u);_(ouu,oxu);var oBv = _n("view");_r(oBv, 'class', 21, e, s, gg);var oCv = _m( "view", ["class", 22,"bindtap", 14], e, s, gg);var oDv = _n("image");_r(oDv, 'src', 37, e, s, gg);_(oCv,oDv);_(oBv,oCv);var oEv = _m( "view", ["class", 22,"bindtap", 11], e, s, gg);var oFv = _n("image");_r(oFv, 'src', 34, e, s, gg);_(oEv,oFv);_(oBv,oEv);_(ouu,oBv);
      } _(oJu,ouu);_(oIu,oJu);_(oDu,oIu);var oGv = _v();
       var oHv = _o(38, e, s, gg);
       var oJv = _gd('./page/API/pages/voice/voice.wxml', oHv, e_, d_);
       if (oJv) {
         var oIv = {};
         oJv(oIv,oIv,oGv, gg);
       } else _w(oHv, './page/API/pages/voice/voice.wxml', 0, 0);_(oDu,oGv);_(r,oDu);oAu.pop();oAu.pop();
    return r;
  };
        e_["./page/API/pages/voice/voice.wxml"]={f:m2,j:[],i:[],ti:["../../../common/head.wxml","../../../common/foot.wxml"],ic:[]};
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{env=window.__mergeData__(env,dd);}
try{
main(env,{},root,global);
if(typeof(window.__webview_engine_version__)=='undefined'||window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}}catch(err){console.log(err)}return root;}}}@code-separator-line:wx-image{width:%%?150rpx?%%;height:%%?150rpx?%%}.page-body-wrapper{justify-content:space-between;flex-grow:1;margin-bottom:%%?300rpx?%%}.page-body-time{display:flex;flex-direction:column;align-items:center}.time-big{font-size:%%?60rpx?%%;margin:%%?20rpx?%%}.time-small{font-size:%%?30rpx?%%}.page-body-buttons{margin-top:%%?60rpx?%%;display:flex;justify-content:space-around}.page-body-button{width:%%?250rpx?%%;text-align:center}.button-stop-record{width:%%?110rpx?%%;height:%%?110rpx?%%;border:%%?20rpx?%% solid #fff;background-color:#f55c23;border-radius:%%?130rpx?%%;margin:0 auto}@code-separator-line:__wxRoute = "page/API/pages/voice/voice";__wxRouteBegin = true;
define("page/API/pages/voice/voice.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var util = require('../../../../util/util.js');
var playTimeInterval;
var recordTimeInterval;

Page({
  data: {
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00'
  },
  onHide: function onHide() {
    if (this.data.playing) {
      this.stopVoice();
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly();
    }
  },
  startRecord: function startRecord() {
    this.setData({ recording: true });

    var that = this;
    recordTimeInterval = setInterval(function () {
      var recordTime = that.data.recordTime += 1;
      that.setData({
        formatedRecordTime: util.formatTime(that.data.recordTime),
        recordTime: recordTime
      });
    }, 1000);
    wx.startRecord({
      success: function success(res) {
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime)
        });
      },
      complete: function complete() {
        that.setData({ recording: false });
        clearInterval(recordTimeInterval);
      }
    });
  },
  stopRecord: function stopRecord() {
    wx.stopRecord();
  },
  stopRecordUnexpectedly: function stopRecordUnexpectedly() {
    var that = this;
    wx.stopRecord({
      success: function success() {
        console.log('stop record success');
        clearInterval(recordTimeInterval);
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        });
      }
    });
  },
  playVoice: function playVoice() {
    var that = this;
    playTimeInterval = setInterval(function () {
      var playTime = that.data.playTime + 1;
      console.log('update playTime', playTime);
      that.setData({
        playing: true,
        formatedPlayTime: util.formatTime(playTime),
        playTime: playTime
      });
    }, 1000);
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function success() {
        clearInterval(playTimeInterval);
        var playTime = 0;
        console.log('play voice finished');
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(playTime),
          playTime: playTime
        });
      }
    });
  },
  pauseVoice: function pauseVoice() {
    clearInterval(playTimeInterval);
    wx.pauseVoice();
    this.setData({
      playing: false
    });
  },
  stopVoice: function stopVoice() {
    clearInterval(playTimeInterval);
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    });
    wx.stopVoice();
  },
  clear: function clear() {
    clearInterval(playTimeInterval);
    wx.stopVoice();
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    });
  }
});
});require("page/API/pages/voice/voice.js")@code-separator-line:["div","template","navigator","image","view","import","block","text"]