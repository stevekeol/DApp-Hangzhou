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
    Z([3, 'page-foot']);Z([3, 'none']);Z([3, 'switchTab']);Z([3, '/page/component/index']);Z([3, 'icon-foot']);Z([3, '../../../../image/icon_foot.png']);Z([3, 'page-head']);Z([3, 'page-head-title']);Z([a, [[7],[3, "title"]]]);Z([3, 'page-head-line']);Z([[7],[3, "desc"]]);Z([3, 'page-head-desc']);Z([3, 'container']);Z([3, 'head']);Z([[8], "title", [1, "checkbox"]]);Z([3, 'page-body']);Z([3, 'page-section page-section-gap']);Z([3, 'page-section-title']);Z([3, '默认样式']);Z([3, 'checkbox']);Z([3, 'true']);Z([3, 'cb']);Z([3, '选中\n      ']);Z([3, '未选中\n      ']);Z([3, 'page-section']);Z([3, '推荐展示样式']);Z([3, 'weui-cells weui-cells_after-title']);Z([3, 'checkboxChange']);Z([[7],[3, "items"]]);Z([[6],[[7],[3, "item"]],[3, "value"]]);Z([3, 'weui-cell weui-check__label']);Z([3, 'weui-cell__hd']);Z([[6],[[7],[3, "item"]],[3, "checked"]]);Z([3, 'weui-cell__bd']);Z([a, [[6],[[7],[3, "item"]],[3, "name"]]]);Z([3, 'foot']);
  })(z);d_["./page/common/foot.wxml"] = {};d_["./page/common/foot.wxml"]["foot"]=function(e,s,r,gg){
    var b='./page/common/foot.wxml:foot'
    r.wxVkey=b
    if(p_[b]){_wl(b,'./page/common/foot.wxml');return}
    p_[b]=true
    try{
      var oQJ = _m( "navigator", ["class", 0,"hoverClass", 1,"openType", 1,"url", 2], e, s, gg);var oRJ = _m( "image", ["class", 4,"src", 1], e, s, gg);_(oQJ,oRJ);_(r,oQJ);
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
      var oVJ = _n("view");_r(oVJ, 'class', 6, e, s, gg);var oWJ = _n("view");_r(oWJ, 'class', 7, e, s, gg);var oXJ = _o(8, e, s, gg);_(oWJ,oXJ);_(oVJ,oWJ);var oYJ = _n("view");_r(oYJ, 'class', 9, e, s, gg);_(oVJ,oYJ);var oZJ = _v();
      if (_o(10, e, s, gg)) {
        oZJ.wxVkey = 1;var oaJ = _n("view");_r(oaJ, 'class', 11, e, s, gg);var ocJ = _o(10, e, s, gg);_(oaJ,ocJ);_(oZJ, oaJ);
      } _(oVJ,oZJ);_(r,oVJ);
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
        e_["./page/common/head.wxml"]={f:m1,j:[],i:[],ti:[],ic:[]};d_["./page/component/pages/checkbox/checkbox.wxml"] = {};
  var m2=function(e,s,r,gg){
    var ofJ = e_["./page/component/pages/checkbox/checkbox.wxml"].i;_ai(ofJ, '../../../common/head.wxml', e_, './page/component/pages/checkbox/checkbox.wxml', 0, 0);_ai(ofJ, '../../../common/foot.wxml', e_, './page/component/pages/checkbox/checkbox.wxml', 0, 0);var oiJ = _n("view");_r(oiJ, 'class', 12, e, s, gg);var ojJ = _v();
       var okJ = _o(13, e, s, gg);
       var omJ = _gd('./page/component/pages/checkbox/checkbox.wxml', okJ, e_, d_);
       if (omJ) {
         var olJ = _1(14,e,s,gg);
         omJ(olJ,olJ,ojJ, gg);
       } else _w(okJ, './page/component/pages/checkbox/checkbox.wxml', 0, 0);_(oiJ,ojJ);var onJ = _n("view");_r(onJ, 'class', 15, e, s, gg);var ooJ = _n("view");_r(ooJ, 'class', 16, e, s, gg);var opJ = _n("view");_r(opJ, 'class', 17, e, s, gg);var oqJ = _o(18, e, s, gg);_(opJ,oqJ);_(ooJ,opJ);var orJ = _n("label");_r(orJ, 'class', 19, e, s, gg);var osJ = _m( "checkbox", ["checked", 20,"value", 1], e, s, gg);_(orJ,osJ);var otJ = _o(22, e, s, gg);_(orJ,otJ);_(ooJ,orJ);var ouJ = _n("label");_r(ouJ, 'class', 19, e, s, gg);var ovJ = _n("checkbox");_r(ovJ, 'value', 21, e, s, gg);_(ouJ,ovJ);var owJ = _o(23, e, s, gg);_(ouJ,owJ);_(ooJ,ouJ);_(onJ,ooJ);var oxJ = _n("view");_r(oxJ, 'class', 24, e, s, gg);var oyJ = _n("view");_r(oyJ, 'class', 17, e, s, gg);var ozJ = _o(25, e, s, gg);_(oyJ,ozJ);_(oxJ,oyJ);var o_J = _n("view");_r(o_J, 'class', 26, e, s, gg);var oAK = _n("checkbox-group");_r(oAK, 'bindchange', 27, e, s, gg);var oBK = _v();var oCK = function(oGK,oFK,oEK,gg){var oDK = _n("label");_r(oDK, 'class', 30, oGK, oFK, gg);var oIK = _n("view");_r(oIK, 'class', 31, oGK, oFK, gg);var oJK = _m( "checkbox", ["value", 29,"checked", 3], oGK, oFK, gg);_(oIK,oJK);_(oDK,oIK);var oKK = _n("view");_r(oKK, 'class', 33, oGK, oFK, gg);var oLK = _o(34, oGK, oFK, gg);_(oKK,oLK);_(oDK,oKK);_(oEK, oDK);return oEK;};_2(28, oCK, e, s, gg, oBK, "item", "index", '{{item.value}}');_(oAK,oBK);_(o_J,oAK);_(oxJ,o_J);_(onJ,oxJ);_(oiJ,onJ);var oMK = _v();
       var oNK = _o(35, e, s, gg);
       var oPK = _gd('./page/component/pages/checkbox/checkbox.wxml', oNK, e_, d_);
       if (oPK) {
         var oOK = {};
         oPK(oOK,oOK,oMK, gg);
       } else _w(oNK, './page/component/pages/checkbox/checkbox.wxml', 0, 0);_(oiJ,oMK);_(r,oiJ);ofJ.pop();ofJ.pop();
    return r;
  };
        e_["./page/component/pages/checkbox/checkbox.wxml"]={f:m2,j:[],i:[],ti:["../../../common/head.wxml","../../../common/foot.wxml"],ic:[]};
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{env=window.__mergeData__(env,dd);}
try{
main(env,{},root,global);
if(typeof(window.__webview_engine_version__)=='undefined'||window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}}catch(err){console.log(err)}return root;}}}@code-separator-line:/*!
 * weui.js v1.1.0 (https://github.com/weui/weui-wxss)
 * Copyright 2016, wechat ui team
 * MIT license
 */body{line-height:1.6;font-family:-apple-system-font,"Helvetica Neue",sans-serif}wx-icon{vertical-align:middle}.weui-cells{position:relative;margin-top:1.17647059em;background-color:#fff;line-height:1.41176471;font-size:17px}.weui-cells:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:%%?1rpx?%% solid #d9d9d9;color:#d9d9d9}.weui-cells:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:%%?1rpx?%% solid #d9d9d9;color:#d9d9d9}.weui-cells__title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#999;font-size:14px}.weui-cells_after-title{margin-top:0}.weui-cells__tips{margin-top:.3em;color:#999;padding-left:15px;padding-right:15px;font-size:14px}.weui-cell{padding:10px 15px;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-cell:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:%%?1rpx?%% solid #d9d9d9;color:#d9d9d9;left:15px}.weui-cell:first-child:before{display:none}.weui-cell_active{background-color:#ececec}.weui-cell_primary{-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.weui-cell__bd{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-cell__ft{text-align:right;color:#999}.weui-cell_access{color:inherit}.weui-cell__ft_in-access{padding-right:13px;position:relative}.weui-cell__ft_in-access:after{content:" ";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:2px}.weui-cell_link{color:#586c94;font-size:14px}.weui-cell_link:active{background-color:#ececec}.weui-cell_link:first-child:before{display:block}.weui-icon-radio{margin-left:3.2px;margin-right:3.2px}.weui-icon-checkbox_circle,.weui-icon-checkbox_success{margin-left:4.6px;margin-right:4.6px}.weui-check__label:active{background-color:#ececec}.weui-check{position:absolute;left:-9999px}.weui-check__hd_in-checkbox{padding-right:.35em}.weui-cell__ft_in-radio{padding-left:.35em}.weui-cell_input{padding-top:0;padding-bottom:0}.weui-label{width:105px;word-wrap:break-word;word-break:break-all}.weui-input{height:2.58823529em;min-height:2.58823529em;line-height:2.58823529em}.weui-toptips{position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);top:42px;left:0;right:0;padding:5px;font-size:14px;text-align:center;color:#fff;z-index:5000;word-wrap:break-word;word-break:break-all}.weui-toptips_warn{background-color:#e64340}.weui-textarea{display:block;width:100%}.weui-textarea-counter{color:#b2b2b2;text-align:right}.weui-textarea-counter_warn{color:#e64340}.weui-cell_warn{color:#e64340}.weui-form-preview{position:relative;background-color:#fff}.weui-form-preview:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:%%?1rpx?%% solid #d9d9d9;color:#d9d9d9}.weui-form-preview:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:%%?1rpx?%% solid #d9d9d9;color:#d9d9d9}.weui-form-preview__value{font-size:14px}.weui-form-preview__value_in-hd{font-size:26px}.weui-form-preview__hd{position:relative;padding:10px 15px;text-align:right;line-height:2.5em}.weui-form-preview__hd:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:%%?1rpx?%% solid #d9d9d9;color:#d9d9d9;left:15px}.weui-form-preview__bd{padding:10px 15px;font-size:.9em;text-align:right;color:#999;line-height:2}.weui-form-preview__ft{position:relative;line-height:50px;display:-webkit-box;display:-webkit-flex;display:flex}.weui-form-preview__ft:after{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:%%?1rpx?%% solid #d5d5d6;color:#d5d5d6}.weui-form-preview__item{overflow:hidden}.weui-form-preview__label{float:left;margin-right:1em;min-width:4em;color:#999;text-align:justify;text-align-last:justify}.weui-form-preview__value{display:block;overflow:hidden;word-break:normal;word-wrap:break-word}.weui-form-preview__btn{position:relative;display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#3cc51f;text-align:center}.weui-form-preview__btn:after{content:" ";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:%%?1rpx?%% solid #d5d5d6;color:#d5d5d6}.weui-form-preview__btn:first-child:after{display:none}.weui-form-preview__btn_active{background-color:#eee}.weui-form-preview__btn_default{color:#999}.weui-form-preview__btn_primary{color:#0bb20c}.weui-cell_select{padding:0}.weui-select{position:relative;padding-left:15px;padding-right:30px;height:2.58823529em;min-height:2.58823529em;line-height:2.58823529em;border-right:%%?1rpx?%% solid #d9d9d9}.weui-select:before{content:" ";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-select_in-select-after{padding-left:0}.weui-cell__bd_in-select-before,.weui-cell__hd_in-select-after{padding-left:15px}.weui-cell_vcode{padding-right:0}.weui-vcode-img{margin-left:5px;height:2.58823529em;vertical-align:middle}.weui-vcode-btn{display:inline-block;height:2.58823529em;margin-left:5px;padding:0 .6em 0 .7em;border-left:1px solid #e5e5e5;line-height:2.58823529em;vertical-align:middle;font-size:17px;color:#3cc51f;white-space:nowrap}.weui-vcode-btn:active{color:#52a341}.weui-cell_switch{padding-top:6px;padding-bottom:6px}.weui-uploader__hd{display:-webkit-box;display:-webkit-flex;display:flex;padding-bottom:10px;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-uploader__title{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-uploader__info{color:#b2b2b2}.weui-uploader__bd{margin-bottom:-4px;margin-right:-9px;overflow:hidden}.weui-uploader__file{float:left;margin-right:9px;margin-bottom:9px}.weui-uploader__img{display:block;width:79px;height:79px}.weui-uploader__file_status{position:relative}.weui-uploader__file_status:before{content:" ";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.5)}.weui-uploader__file-content{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}.weui-uploader__input-box{float:left;position:relative;margin-right:9px;margin-bottom:9px;width:77px;height:77px;border:1px solid #d9d9d9}.weui-uploader__input-box:after,.weui-uploader__input-box:before{content:" ";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#d9d9d9}.weui-uploader__input-box:before{width:2px;height:39.5px}.weui-uploader__input-box:after{width:39.5px;height:2px}.weui-uploader__input-box:active{border-color:#999}.weui-uploader__input-box:active:after,.weui-uploader__input-box:active:before{background-color:#999}.weui-uploader__input{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0}.weui-article{padding:20px 15px;font-size:15px}.weui-article__section{margin-bottom:1.5em}.weui-article__h1{font-size:18px;font-weight:400;margin-bottom:.9em}.weui-article__h2{font-size:16px;font-weight:400;margin-bottom:.34em}.weui-article__h3{font-weight:400;font-size:15px;margin-bottom:.34em}.weui-article__p{margin:0 0 .8em}.weui-msg{padding-top:36px;text-align:center}.weui-msg__link{display:inline;color:#586c94}.weui-msg__icon-area{margin-bottom:30px}.weui-msg__text-area{margin-bottom:25px;padding:0 20px}.weui-msg__title{margin-bottom:5px;font-weight:400;font-size:20px}.weui-msg__desc{font-size:14px;color:#999}.weui-msg__opr-area{margin-bottom:25px}.weui-msg__extra-area{margin-bottom:15px;font-size:14px;color:#999}@media screen and (min-height:438px){.weui-msg__extra-area{position:fixed;left:0;bottom:0;width:100%;text-align:center}}.weui-flex{display:-webkit-box;display:-webkit-flex;display:flex}.weui-flex__item{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-btn{margin-top:15px}.weui-btn:first-child{margin-top:0}.weui-btn-area{margin:1.17647059em 15px .3em}.weui-agree{display:block;padding:.5em 15px;font-size:13px}.weui-agree__text{color:#999}.weui-agree__link{display:inline;color:#586c94}.weui-agree__checkbox{position:absolute;left:-9999px}.weui-agree__checkbox-icon{position:relative;top:2px;display:inline-block;border:1px solid #d1d1d1;background-color:#fff;border-radius:3px;width:11px;height:11px}.weui-agree__checkbox-icon-check{position:absolute;top:1px;left:1px}.weui-footer{color:#999;font-size:14px;text-align:center}.weui-footer_fixed-bottom{position:fixed;bottom:.52em;left:0;right:0}.weui-footer__links{font-size:0}.weui-footer__link{display:inline-block;vertical-align:top;margin:0 .62em;position:relative;font-size:14px;color:#586c94}.weui-footer__link:before{content:" ";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:%%?1rpx?%% solid #c7c7c7;color:#c7c7c7;left:-.65em;top:.36em;bottom:.36em}.weui-footer__link:first-child:before{display:none}.weui-footer__text{padding:0 .34em;font-size:12px}.weui-grids{border-top:%%?1rpx?%% solid #d9d9d9;border-left:%%?1rpx?%% solid #d9d9d9;overflow:hidden}.weui-grid{position:relative;float:left;padding:20px 10px;width:33.33333333%;box-sizing:border-box;border-right:%%?1rpx?%% solid #d9d9d9;border-bottom:%%?1rpx?%% solid #d9d9d9}.weui-grid_active{background-color:#ececec}.weui-grid__icon{display:block;width:28px;height:28px;margin:0 auto}.weui-grid__label{margin-top:5px;display:block;text-align:center;color:#000;font-size:14px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.weui-loading{margin:0 5px;width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:weuiLoading 1s steps(12,end) infinite;animation:weuiLoading 1s steps(12,end) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}@-webkit-keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg);transform:rotate3d(0,0,1,360deg)}}@keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg);transform:rotate3d(0,0,1,360deg)}}.weui-badge{display:inline-block;padding:.15em .4em;min-width:8px;border-radius:18px;background-color:#f43530;color:#fff;line-height:1.2;text-align:center;font-size:12px;vertical-align:middle}.weui-badge_dot{padding:.4em;min-width:0}.weui-loadmore{width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center}.weui-loadmore__tips{display:inline-block;vertical-align:middle}.weui-loadmore_line{border-top:1px solid #e5e5e5;margin-top:2.4em}.weui-loadmore__tips_in-line{position:relative;top:-.9em;padding:0 .55em;background-color:#fff;color:#999}.weui-loadmore__tips_in-dot{position:relative;padding:0 .16em;width:4px;height:1.6em}.weui-loadmore__tips_in-dot:before{content:" ";position:absolute;top:50%;left:50%;margin-top:-1px;margin-left:-2px;width:4px;height:4px;border-radius:50%;background-color:#e5e5e5}.weui-panel{background-color:#fff;margin-top:10px;position:relative;overflow:hidden}.weui-panel:first-child{margin-top:0}.weui-panel:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:%%?1rpx?%% solid #e5e5e5;color:#e5e5e5}.weui-panel:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:%%?1rpx?%% solid #e5e5e5;color:#e5e5e5}.weui-panel__hd{padding:14px 15px 10px;color:#999;font-size:13px;position:relative}.weui-panel__hd:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:%%?1rpx?%% solid #e5e5e5;color:#e5e5e5;left:15px}.weui-media-box{padding:15px;position:relative}.weui-media-box:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:%%?1rpx?%% solid #e5e5e5;color:#e5e5e5;left:15px}.weui-media-box:first-child:before{display:none}.weui-media-box__title{font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;word-wrap:break-word;word-break:break-all}.weui-media-box__desc{color:#999;font-size:13px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-media-box__info{margin-top:15px;padding-bottom:5px;font-size:13px;color:#cecece;line-height:1em;list-style:none;overflow:hidden}.weui-media-box__info__meta{float:left;padding-right:1em}.weui-media-box__info__meta_extra{padding-left:1em;border-left:1px solid #cecece}.weui-media-box__title_in-text{margin-bottom:8px}.weui-media-box_appmsg{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-media-box__thumb{width:100%;height:100%;vertical-align:top}.weui-media-box__hd_in-appmsg{margin-right:.8em;width:60px;height:60px;line-height:60px;text-align:center}.weui-media-box__bd_in-appmsg{-webkit-box-flex:1;-webkit-flex:1;flex:1;min-width:0}.weui-media-box_small-appmsg{padding:0}.weui-cells_in-small-appmsg{margin-top:0}.weui-cells_in-small-appmsg:before{display:none}.weui-progress{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-progress__bar{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-progress__opr{margin-left:15px;font-size:0}.weui-navbar{display:-webkit-box;display:-webkit-flex;display:flex;position:absolute;z-index:500;top:0;width:100%;border-bottom:%%?1rpx?%% solid #ccc}.weui-navbar__item{position:relative;display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;padding:13px 0;text-align:center;font-size:0}.weui-navbar__item.weui-bar__item_on{color:#1aad19}.weui-navbar__slider{position:absolute;content:" ";left:0;bottom:0;width:6em;height:3px;background-color:#1aad19;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-navbar__title{display:inline-block;font-size:15px;max-width:8em;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.weui-tab{position:relative;height:100%}.weui-tab__panel{box-sizing:border-box;height:100%;padding-top:50px;overflow:auto;-webkit-overflow-scrolling:touch}.weui-search-bar{position:relative;padding:8px 10px;display:-webkit-box;display:-webkit-flex;display:flex;box-sizing:border-box;background-color:#efeff4;border-top:%%?1rpx?%% solid #d7d6dc;border-bottom:%%?1rpx?%% solid #d7d6dc}.weui-icon-search{margin-right:8px;font-size:inherit}.weui-icon-search_in-box{position:absolute;left:10px;top:7px}.weui-search-bar__text{display:inline-block;font-size:14px;vertical-align:middle}.weui-search-bar__form{position:relative;-webkit-box-flex:1;-webkit-flex:auto;flex:auto;border-radius:5px;background:#fff;border:%%?1rpx?%% solid #e6e6ea}.weui-search-bar__box{position:relative;padding-left:30px;padding-right:30px;width:100%;box-sizing:border-box;z-index:1}.weui-search-bar__input{height:28px;line-height:28px;font-size:14px}.weui-icon-clear{position:absolute;top:0;right:0;padding:7px 8px;font-size:0}.weui-search-bar__label{position:absolute;top:0;right:0;bottom:0;left:0;z-index:2;border-radius:3px;text-align:center;color:#9b9b9b;background:#fff;line-height:28px}.weui-search-bar__cancel-btn{margin-left:10px;line-height:28px;color:#09bb07;white-space:nowrap}.checkbox{margin-right:%%?20rpx?%%}@code-separator-line:__wxRoute = "page/component/pages/checkbox/checkbox";__wxRouteBegin = true;
define("page/component/pages/checkbox/checkbox.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

Page({
  data: {
    items: [{ value: 'USA', name: '美国' }, { value: 'CHN', name: '中国', checked: 'true' }, { value: 'BRA', name: '巴西' }, { value: 'JPN', name: '日本' }, { value: 'ENG', name: '英国' }, { value: 'FRA', name: '法国' }]
  },
  checkboxChange: function checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var items = this.data.items,
        values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      items: items
    });
  }
});
});require("page/component/pages/checkbox/checkbox.js")@code-separator-line:["div","template","navigator","image","view","import","label","checkbox","checkbox-group"]