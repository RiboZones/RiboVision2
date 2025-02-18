(function(Clazz
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolPropertyManager");
Clazz_declarePackage ("JV");
Clazz_load (["J.api.JmolPropertyManager", "java.util.Hashtable"], "JV.PropertyManager", ["java.lang.Boolean", "$.Double", "$.Float", "java.util.Arrays", "$.Date", "$.Map", "JU.AU", "$.BArray", "$.BS", "$.Base64", "$.Lst", "$.M3", "$.M4", "$.P3", "$.PT", "$.SB", "$.V3", "J.api.Interface", "JM.BondSet", "$.LabelToken", "JS.SV", "$.T", "JU.BSUtil", "$.C", "$.Edge", "$.Elements", "$.Escape", "$.JmolMolecule", "$.Logger", "JV.ActionManager", "$.JC", "$.Viewer", "JV.binding.Binding"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.map = null;
Clazz_instantialize (this, arguments);
}, JV, "PropertyManager", null, J.api.JmolPropertyManager);
Clazz_prepareFields (c$, function () {
this.map =  new java.util.Hashtable ();
});
Clazz_makeConstructor (c$, 
function () {
});
Clazz_overrideMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
for (var i = 0, p = 0; i < JV.PropertyManager.propertyTypes.length; i += 3, p++) if (JV.PropertyManager.propertyTypes[i].length > 0) this.map.put (JV.PropertyManager.propertyTypes[i].toLowerCase (), Integer.$valueOf (p));

}, "JV.Viewer");
Clazz_overrideMethod (c$, "getPropertyNumber", 
function (infoType) {
var n = this.map.get (infoType == null ? "" : infoType.toLowerCase ());
return (n == null ? -1 : n.intValue ());
}, "~S");
Clazz_overrideMethod (c$, "getDefaultPropertyParam", 
function (propID) {
return (propID < 0 ? "" : JV.PropertyManager.propertyTypes[propID * 3 + 2]);
}, "~N");
Clazz_overrideMethod (c$, "checkPropertyParameter", 
function (name) {
var propID = this.getPropertyNumber (name);
var type = JV.PropertyManager.getParamType (propID);
return (type.length > 0 && type !== "<atom selection>");
}, "~S");
Clazz_overrideMethod (c$, "getProperty", 
function (returnType, infoType, paramInfo) {
if (JV.PropertyManager.propertyTypes.length != 135) JU.Logger.warn ("propertyTypes is not the right length: " + JV.PropertyManager.propertyTypes.length + " != " + 135);
var info;
if (infoType.indexOf (".") >= 0 || infoType.indexOf ("[") >= 0) {
var args = this.getArguments (infoType);
info = this.extractProperty (this.getPropertyAsObject (args[0].asString (), paramInfo, null), args, 1, null, false);
} else {
info = this.getPropertyAsObject (infoType, paramInfo, returnType);
}if (returnType == null) return info;
var requestedReadable = returnType.equalsIgnoreCase ("readable");
if (requestedReadable) returnType = (JV.PropertyManager.isReadableAsString (infoType) ? "String" : "JSON");
if (returnType.equalsIgnoreCase ("String")) return (info == null ? "" : info.toString ());
if (requestedReadable) return JU.Escape.toReadable (infoType, info);
 else if (returnType.equalsIgnoreCase ("JSON")) return "{" + JU.PT.toJSON (infoType, info) + "}";
return info;
}, "~S,~S,~O");
Clazz_defineMethod (c$, "getArguments", 
 function (propertyName) {
var lc = propertyName.toLowerCase ();
var pt = -1;
if (propertyName.indexOf ('"') >= 0 || propertyName.indexOf ('\'') >= 0) propertyName = this.fixSelectQuotes (propertyName);
while ((pt = lc.indexOf ("[select ", ++pt)) >= 0) {
var pt2 = lc.indexOf (" where ", pt);
var pt2b = lc.indexOf (" wherein ", pt);
if (pt2b > 0 && pt2b < pt2) pt2 = pt2b;
var pt3 = lc.lastIndexOf ("]");
if (pt2 < 0 || pt2 > pt3) continue;
propertyName = propertyName.substring (0, pt + 1) + propertyName.substring (pt + 1, pt3).$replace ('.', '\1').$replace ('[', '\2').$replace (']', '\3') + propertyName.substring (pt3);
}
propertyName = JU.PT.rep (JU.PT.rep (propertyName.$replace (']', '\0').$replace ('[', '\0'), "..", "\4").$replace ('.', '\0').$replace ('\1', '.').$replace ('\2', '[').$replace ('\3', ']'), "\4", "..");
propertyName = JU.PT.rep (propertyName, "\0\0", "\0");
var names = JU.PT.split (JU.PT.trim (propertyName, "\0"), "\0");
var args =  new Array (names.length);
for (var i = 0, n; i < names.length; i++) args[i] = (names[i].startsWith ("'") || names[i].startsWith ("\"") ? JS.SV.newS (JU.PT.trim (names[i], "'\"")) : (n = JU.PT.parseInt (names[i])) == -2147483648 ? JS.SV.newS (names[i]) : JS.SV.newI (n));

return args;
}, "~S");
Clazz_defineMethod (c$, "fixSelectQuotes", 
 function (propertyName) {
var a = propertyName.toCharArray ();
var inQuotes = false;
var inQuotes1 = false;
var inQuotes2 = false;
for (var i = a.length; --i >= 0; ) {
switch (a[i]) {
case '\'':
if (!inQuotes2) inQuotes = inQuotes1 = !inQuotes;
break;
case '"':
if (!inQuotes1) inQuotes = inQuotes2 = !inQuotes;
break;
case '.':
if (inQuotes) a[i] = '\1';
break;
case '[':
if (inQuotes) a[i] = '\2';
break;
case ']':
if (inQuotes) a[i] = '\3';
break;
}
}
propertyName =  String.instantialize (a);
return propertyName;
}, "~S");
Clazz_overrideMethod (c$, "extractProperty", 
function (prop, args, ptr, v2, isCompiled) {
if (ptr < 0) {
args = this.getArguments (args);
ptr = 0;
}if (ptr >= (args).length) return prop;
if (!isCompiled) args = this.compileSelect (args);
var pt;
var arg = (args)[ptr++];
var property = JS.SV.oValue (prop);
switch (arg.tok) {
case 2:
pt = arg.intValue - 1;
if (Clazz_instanceOf (property, JU.Lst)) {
var v = property;
if (pt < 0) pt += v.size ();
return (pt >= 0 && pt < v.size () ? this.extractProperty (v.get (pt), args, ptr, null, true) : "");
}if (Clazz_instanceOf (property, JU.M3)) {
var m = property;
var f =  Clazz_newArray (-1, [ Clazz_newFloatArray (-1, [m.m00, m.m01, m.m02]),  Clazz_newFloatArray (-1, [m.m10, m.m11, m.m12]),  Clazz_newFloatArray (-1, [m.m20, m.m21, m.m22])]);
if (pt < 0) pt += 3;
if (pt >= 0 && pt < 3) return this.extractProperty (f, args, --ptr, null, true);
return "";
}if (Clazz_instanceOf (property, JU.M4)) {
var m = property;
var f =  Clazz_newArray (-1, [ Clazz_newFloatArray (-1, [m.m00, m.m01, m.m02, m.m03]),  Clazz_newFloatArray (-1, [m.m10, m.m11, m.m12, m.m13]),  Clazz_newFloatArray (-1, [m.m20, m.m21, m.m22, m.m23]),  Clazz_newFloatArray (-1, [m.m30, m.m31, m.m32, m.m33])]);
if (pt < 0) pt += 4;
if (pt >= 0 && pt < 4) return this.extractProperty (f, args, --ptr, null, true);
return "";
}if (JU.AU.isAI (property)) {
var ilist = property;
if (pt < 0) pt += ilist.length;
if (pt >= 0 && pt < ilist.length) return Integer.$valueOf (ilist[pt]);
return "";
}if (JU.AU.isAD (property)) {
var dlist = property;
if (pt < 0) pt += dlist.length;
if (pt >= 0 && pt < dlist.length) return Double.$valueOf (dlist[pt]);
return "";
}if (JU.AU.isAF (property)) {
var flist = property;
if (pt < 0) pt += flist.length;
if (pt >= 0 && pt < flist.length) return Float.$valueOf (flist[pt]);
return "";
}if (JU.AU.isAII (property)) {
var iilist = property;
if (pt < 0) pt += iilist.length;
if (pt >= 0 && pt < iilist.length) return this.extractProperty (iilist[pt], args, ptr, null, true);
return "";
}if (JU.AU.isAFF (property)) {
var fflist = property;
if (pt < 0) pt += fflist.length;
if (pt >= 0 && pt < fflist.length) return this.extractProperty (fflist[pt], args, ptr, null, true);
return "";
}if (JU.AU.isAS (property)) {
var slist = property;
if (pt < 0) pt += slist.length;
if (pt >= 0 && pt < slist.length) return slist[pt];
return "";
}if (Clazz_instanceOf (property, Array)) {
var olist = property;
if (pt < 0) pt += olist.length;
if (pt >= 0 && pt < olist.length) return olist[pt];
return "";
}break;
case 1275082245:
case 4:
if (Clazz_instanceOf (property, java.util.Map)) {
var h = property;
var key;
var asMap = false;
var asArray = false;
var isCaseSensitive = false;
var keys = (arg.tok == 1275082245 ? (arg.value)[0] : null);
var whereArgs = null;
if (arg.tok == 1275082245) {
isCaseSensitive = true;
whereArgs = (arg.value)[1];
key = arg.myName;
asArray = (key.indexOf (";") >= 0);
if (key.contains ("**")) {
var isAll = keys.size () == 0;
var newKey = "";
for (var e, $e = h.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var k = e.getKey ();
for (var i = (isAll ? 1 : keys.size ()); --i >= 0; ) {
if (!isAll && !JU.PT.isLike (k, keys.get (i))) continue;
var o = e.getValue ();
var isList = false;
switch (Clazz_instanceOf (o, JS.SV) ? (o).tok : 0) {
case 7:
isList = true;
o = (o).getList ();
break;
case 6:
case 14:
o = (o).getMap ();
break;
default:
if (!(Clazz_instanceOf (o, java.util.Map)) && !(isList = (Clazz_instanceOf (o, JU.Lst)))) o = null;
}
if (o != null) {
if (isList) {
if (v2 == null) v2 =  new JU.Lst ();
var olst = o;
for (var n = olst.size (), j = 0; j < n; j++) {
o = olst.get (j);
if (!(Clazz_instanceOf (o, JS.SV)) || (o = (o).getMap ()) == null) continue;
if (whereArgs == null || this.vwr.checkSelect (o, whereArgs)) v2.addLast (o);
}
return v2;
}if (whereArgs == null || this.vwr.checkSelect (o, whereArgs)) newKey += "," + k;
}}
}
if (newKey.length == 0) return  new JU.Lst ();
key = newKey.substring (1);
asMap = !asArray;
keys = null;
} else if (whereArgs != null && !this.vwr.checkSelect (property, whereArgs)) return "";
} else {
key = arg.asString ();
if (key.equalsIgnoreCase ("keys")) {
var lst =  new JU.Lst ();
for (var k, $k = h.keySet ().iterator (); $k.hasNext () && ((k = $k.next ()) || true);) lst.addLast (k);

return this.extractProperty (lst, args, ptr, null, true);
}}var havePunctuation = (asArray || key.indexOf (",") >= 0 || key.indexOf (";") >= 0);
if (isCaseSensitive && !havePunctuation) {
havePunctuation = true;
key += ",";
}var isWild = (asArray || key.startsWith ("*") || key.endsWith ("*") || havePunctuation);
var wasV2 = (v2 != null);
if (isWild) {
if (!wasV2) v2 =  new JU.Lst ();
if (!asArray && (keys == null ? key.length == 1 : keys.size () == 0)) {
if (ptr == (args).length) {
if (!wasV2) return property;
v2.addLast (property);
return v2;
}return this.extractProperty (property, args, ptr, v2, true);
}}if (key.contains ("**")) key = JU.PT.rep (key, "**", "*");
if (isWild && !havePunctuation) key += ",";
if (asMap || asArray || key.contains (",")) {
var mapNew =  new java.util.Hashtable ();
if (keys != null && keys.size () == 0) {
keys = null;
key = "*";
}if (keys == null) {
var tokens = JU.PT.split (key, ",");
for (var i = tokens.length; --i >= 0; ) JV.PropertyManager.getMapSubset (h, tokens[i], mapNew, asArray ? v2 : null);

} else {
for (var i = keys.size (); --i >= 0; ) JV.PropertyManager.getMapSubset (h, keys.get (i), mapNew, asArray ? v2 : null);

}if (asMap && !wasV2) return mapNew;
if (ptr == (args).length) {
if (!asArray) {
if (!wasV2) return mapNew;
v2.addLast (mapNew);
}return v2;
}return this.extractProperty (mapNew, args, ptr, (wasV2 ? v2 : null), true);
}key = this.checkMap (h, key, isWild, v2, args, ptr, isCaseSensitive);
return (key != null && !isWild ? this.extractProperty (h.get (key), args, ptr, null, true) : !isWild ? "" : wasV2 ? v2 : v2);
}if (Clazz_instanceOf (property, JU.Lst)) {
var v = property;
if (v2 == null) v2 =  new JU.Lst ();
ptr--;
for (pt = 0; pt < v.size (); pt++) {
var o = v.get (pt);
if (Clazz_instanceOf (o, java.util.Map) || Clazz_instanceOf (o, JU.Lst) || (Clazz_instanceOf (o, JS.SV)) && ((o).getMap () != null || (o).getList () != null)) this.extractProperty (o, args, ptr, v2, true);
}
return v2;
}break;
}
return prop;
}, "~O,~O,~N,JU.Lst,~B");
c$.getMapSubset = Clazz_defineMethod (c$, "getMapSubset", 
 function (h, key, h2, v2) {
if (key.startsWith ("\"") || key.startsWith ("'")) key = JU.PT.trim (key, "\"'");
var val = h.get (key);
if (val != null) {
if (v2 == null) h2.put (key, val);
 else v2.addLast (val);
return;
}for (var e, $e = h.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var k = e.getKey ();
if (JU.PT.isLike (k, key)) {
if (v2 == null) h2.put (k, e.getValue ());
 else v2.addLast (e.getValue ());
}}
}, "java.util.Map,~S,java.util.Map,JU.Lst");
Clazz_defineMethod (c$, "compileSelect", 
 function (args) {
var argsNew = null;
for (var i = args.length; --i >= 0; ) {
if (args[i].tok == 4) {
var key = args[i].value;
var ucKey = key.toUpperCase ();
if (ucKey.startsWith ("SELECT ")) {
if (argsNew == null) argsNew = JU.AU.arrayCopyObject (args, args.length);
ucKey = (key = key.substring (6).trim ()).toUpperCase ();
if (ucKey.startsWith ("WHERE ") || ucKey.startsWith ("WHEREIN ")) ucKey = (key = "* " + key).toUpperCase ();
var pt = ucKey.indexOf (" WHEREIN ");
var ext = (pt < 0 ? "" : key.indexOf (";") >= 0 ? ";**" : ",**");
if (pt < 0) pt = ucKey.indexOf (" WHERE ");
var select = key.substring (0, pt < 0 ? key.length : pt).trim ();
if (select.startsWith ("(") && select.endsWith (")")) select = select.substring (1, select.length - 1) + ";";
if (pt < 0) {
argsNew[i] = JS.SV.newV (1275082245,  Clazz_newArray (-1, [this.getKeys (select), null]));
argsNew[i].myName = select;
} else {
select += ext;
argsNew[i] = JS.SV.newV (1275082245,  Clazz_newArray (-1, [this.getKeys (select), this.vwr.compileExpr (key.substring (pt + 6 + ext.length).trim ())]));
argsNew[i].myName = select;
}}}}
return (argsNew == null ? args : argsNew);
}, "~A");
Clazz_defineMethod (c$, "getKeys", 
 function (select) {
var keys =  new JU.Lst ();
select = JU.PT.rep (JU.PT.rep (select, "**", "*"), ";", ",") + ",";
var pt0 = 0;
var pt1 = -1;
while ((pt1 = select.indexOf (",", pt1 + 1)) >= 0) {
if (pt1 > pt0) {
var key = select.substring (pt0, pt1);
if (key.equals ("*")) {
if (keys.size () == 0) return keys;
continue;
}keys.addLast (key);
pt0 = pt1 + 1;
}}
return keys;
}, "~S");
Clazz_defineMethod (c$, "checkMap", 
 function (h, key, isWild, v2, args, ptr, isCaseSensitive) {
var isOK = (v2 == null && h.containsKey (key));
if (!isOK) {
var hasSemi = key.contains (";");
var keys = (hasSemi ? JU.PT.split (key, ";") : null);
var lckey = (isWild && !isCaseSensitive ? key.toLowerCase () : null);
for (var k, $k = h.keySet ().iterator (); $k.hasNext () && ((k = $k.next ()) || true);) {
if (hasSemi) {
for (var i = keys.length; --i >= 0; key = null) {
key = keys[i];
if (key.length == 0) continue;
if (isCaseSensitive) {
if (!JU.PT.isLike (k, key)) continue;
break;
}lckey = (key.indexOf ("*") >= 0 ? key.toLowerCase () : null);
if (this.checkKey (k, key, lckey)) break;
}
if (key == null) continue;
} else if (isCaseSensitive ? !JU.PT.isLike (k, key) : !this.checkKey (k, key, lckey)) continue;
if (v2 == null) return k;
v2.addLast (this.extractProperty (h.get (k), args, ptr, null, true));
if (!isWild && !hasSemi) return null;
}
}return (isOK ? key : null);
}, "java.util.Map,~S,~B,JU.Lst,~O,~N,~B");
Clazz_defineMethod (c$, "checkKey", 
 function (k, key, lckey) {
return k.equalsIgnoreCase (key) || lckey != null && JU.PT.isLike (k.toLowerCase (), lckey);
}, "~S,~S,~S");
c$.getPropertyName = Clazz_defineMethod (c$, "getPropertyName", 
 function (propID) {
return (propID < 0 ? "" : JV.PropertyManager.propertyTypes[propID * 3]);
}, "~N");
c$.getParamType = Clazz_defineMethod (c$, "getParamType", 
 function (propID) {
return (propID < 0 ? "" : JV.PropertyManager.propertyTypes[propID * 3 + 1]);
}, "~N");
c$.isReadableAsString = Clazz_defineMethod (c$, "isReadableAsString", 
 function (infoType) {
for (var i = JV.PropertyManager.readableTypes.length; --i >= 0; ) if (infoType.equalsIgnoreCase (JV.PropertyManager.readableTypes[i])) return true;

return false;
}, "~S");
Clazz_defineMethod (c$, "getPropertyAsObject", 
 function (infoType, paramInfo, returnType) {
if (infoType.equals ("tokenList")) {
return JS.T.getTokensLike (paramInfo);
}var id = this.getPropertyNumber (infoType);
var iHaveParameter = (paramInfo != null && paramInfo.toString ().length > 0);
var myParam = (iHaveParameter ? paramInfo : this.getDefaultPropertyParam (id));
switch (id) {
case 0:
return this.getAppletInfo ();
case 5:
return this.getAnimationInfo ();
case 14:
return this.getAllAtomInfo (this.vwr.getAtomBitSet (myParam));
case 24:
return this.vwr.getAuxiliaryInfoForAtoms (myParam);
case 15:
return this.getAllBondInfo (myParam);
case 25:
return this.getBoundBoxInfo ();
case 10:
return this.vwr.tm.fixedRotationCenter;
case 16:
return this.getAllChainInfo (this.vwr.getAtomBitSet (myParam));
case 37:
return this.vwr.getProperty ("DATA_API", "consoleText", null);
case 26:
return this.vwr.getDataObj (myParam.toString (), null, -1);
case 33:
return this.vwr.getErrorMessageUn ();
case 28:
return this.vwr.evaluateExpression (myParam.toString ());
case 20:
return this.vwr.getModelExtract (myParam, true, false, "MOL");
case 32:
return JV.PropertyManager.getFileInfo (this.vwr.getFileData (), myParam.toString ());
case 1:
return this.vwr.fm.getFullPathName (false);
case 2:
return this.vwr.getFileHeader ();
case 4:
case 3:
return (iHaveParameter ? this.vwr.getFileAsString3 (myParam.toString (), true, null) : this.vwr.getCurrentFileAsString ("prop"));
case 27:
var params = myParam.toString ().toLowerCase ();
return this.getImage (params, params.indexOf ("g64") < 0 && params.indexOf ("base64") < 0 && (returnType == null || returnType.equalsIgnoreCase ("java")));
case 35:
return this.vwr.getShapeProperty (24, "info");
case 36:
return this.vwr.getShapeProperty (24, "data");
case 40:
return this.vwr.getNMRCalculation ().getInfo (myParam.toString ());
case 41:
return this.getVariables (myParam.toString ());
case 21:
return this.vwr.getStatusChanged (myParam.toString ());
case 22:
return this.vwr;
case 38:
return this.vwr.getJspecViewProperties (myParam);
case 7:
return this.getLigandInfo (this.vwr.getAtomBitSet (myParam));
case 9:
return this.getMeasurementInfo ();
case 29:
return this.vwr.getMenu (myParam.toString ());
case 23:
return this.vwr.sm.messageQueue;
case 30:
return this.vwr.getMinimizationInfo ();
case 6:
return this.getModelInfo (this.vwr.getAtomBitSet (myParam));
case 18:
return this.getMoleculeInfo (this.vwr.getAtomBitSet (myParam));
case 34:
return this.getMouseInfo ();
case 11:
return this.vwr.tm.getOrientationInfo ();
case 31:
return this.vwr.ms.getPointGroupInfo (this.vwr.getAtomBitSet (myParam));
case 17:
return this.getAllPolymerInfo (this.vwr.getAtomBitSet (myParam));
case 39:
return this.vwr.getScriptQueueInfo ();
case 8:
return this.getShapeInfo ();
case 19:
return this.vwr.getStateInfo3 (myParam.toString (), 0, 0);
case 12:
return JU.M3.newM3 (this.vwr.tm.matrixRotate);
case 42:
return this.getAnnotationInfo (myParam, 1073741925);
case 43:
return this.getAnnotationInfo (myParam, 1073742189);
case 44:
myParam = JS.SV.oValue (myParam);
var info = (Clazz_instanceOf (myParam, java.util.Map) ? myParam : null);
return (info == null ? null : this.vwr.sm.processService (info));
}
var data =  new Array (45);
for (var i = 0; i < 45; i++) {
var paramType = JV.PropertyManager.getParamType (i);
var paramDefault = this.getDefaultPropertyParam (i);
var name = JV.PropertyManager.getPropertyName (i);
data[i] = (name.length == 0 || name.charAt (0) == 'X' ? "" : name + (paramType !== "" ? " " + JV.PropertyManager.getParamType (i) + (paramDefault !== "" ? " #default: " + this.getDefaultPropertyParam (i) : "") : ""));
}
java.util.Arrays.sort (data);
var info =  new JU.SB ();
info.append ("getProperty ERROR\n").append (infoType).append ("?\nOptions include:\n");
for (var i = 0; i < 45; i++) if (data[i].length > 0) info.append ("\n getProperty ").append (data[i]);

return info.toString ();
}, "~S,~O,~S");
Clazz_defineMethod (c$, "getImage", 
 function (params, asBytes) {
var height = -1;
var width = -1;
var pt;
if ((pt = params.indexOf ("height=")) >= 0) height = JU.PT.parseInt (params.substring (pt + 7));
if ((pt = params.indexOf ("width=")) >= 0) width = JU.PT.parseInt (params.substring (pt + 6));
if (width < 0 && height < 0) height = width = -1;
 else if (width < 0) width = height;
 else height = width;
var type = "JPG";
if (params.indexOf ("type=") >= 0) type = JU.PT.getTokens (JU.PT.replaceWithCharacter (params.substring (params.indexOf ("type=") + 5), ";,", ' '))[0];
var errMsg =  new Array (1);
var bytes = this.vwr.getImageAsBytes (type.toUpperCase (), width, height, -1, errMsg);
return (errMsg[0] != null ? errMsg[0] : asBytes ?  new JU.BArray (bytes) : JU.Base64.getBase64 (bytes).toString ());
}, "~S,~B");
Clazz_defineMethod (c$, "getVariables", 
 function (name) {
return (name.toLowerCase ().equals ("all") ? this.vwr.g.getAllVariables () : this.vwr.evaluateExpressionAsVariable (name));
}, "~S");
c$.getFileInfo = Clazz_defineMethod (c$, "getFileInfo", 
function (objHeader, type) {
var ht =  new java.util.Hashtable ();
if (objHeader == null) return ht;
var haveType = (type != null && type.length > 0);
if (Clazz_instanceOf (objHeader, java.util.Map)) {
return (haveType ? (objHeader).get (type) : objHeader);
}var lines = JU.PT.split (objHeader, "\n");
if (lines.length == 0 || lines[0].length < 6 || lines[0].charAt (6) != ' ' || !lines[0].substring (0, 6).equals (lines[0].substring (0, 6).toUpperCase ())) {
ht.put ("fileHeader", objHeader);
return ht;
}var keyLast = "";
var sb =  new JU.SB ();
if (haveType) type = type.toUpperCase ();
var key = "";
for (var i = 0; i < lines.length; i++) {
var line = lines[i];
if (line.length < 12) continue;
key = line.substring (0, 6).trim ();
var cont = line.substring (7, 10).trim ();
if (key.equals ("REMARK")) {
key += cont;
}if (!key.equals (keyLast)) {
if (haveType && keyLast.equals (type)) return sb.toString ();
if (!haveType) {
ht.put (keyLast, sb.toString ());
sb =  new JU.SB ();
}keyLast = key;
}if (!haveType || key.equals (type)) sb.append (line).appendC ('\n');
}
if (!haveType) {
ht.put (keyLast, sb.toString ());
}if (haveType) return (key.equals (type) ? sb.toString () : "");
return ht;
}, "~O,~S");
Clazz_defineMethod (c$, "getMoleculeInfo", 
function (atomExpression) {
var bsAtoms = this.vwr.getAtomBitSet (atomExpression);
var molecules = this.vwr.ms.getMolecules ();
var V =  new JU.Lst ();
var bsTemp =  new JU.BS ();
for (var i = 0; i < molecules.length; i++) {
bsTemp = JU.BSUtil.copy (bsAtoms);
var m = molecules[i];
bsTemp.and (m.atomList);
if (bsTemp.length () > 0) {
var info =  new java.util.Hashtable ();
info.put ("mf", m.getMolecularFormula (false, null, false));
info.put ("number", Integer.$valueOf (m.moleculeIndex + 1));
info.put ("modelNumber", this.vwr.ms.getModelNumberDotted (m.modelIndex));
info.put ("numberInModel", Integer.$valueOf (m.indexInModel + 1));
info.put ("nAtoms", Integer.$valueOf (m.ac));
info.put ("nElements", Integer.$valueOf (m.nElements));
V.addLast (info);
}}
return V;
}, "~O");
Clazz_overrideMethod (c$, "getModelInfo", 
function (atomExpression) {
var bsModels = this.vwr.ms.getModelBS (this.vwr.getAtomBitSet (atomExpression), false);
var m = this.vwr.ms;
var info =  new java.util.Hashtable ();
info.put ("modelSetName", m.modelSetName);
info.put ("modelIndex", Integer.$valueOf (this.vwr.am.cmi));
info.put ("modelCount", Integer.$valueOf (m.mc));
info.put ("isTainted", Boolean.$valueOf (m.tainted != null));
info.put ("canSkipLoad", Boolean.$valueOf (m.canSkipLoad));
info.put ("modelSetHasVibrationVectors", Boolean.$valueOf (m.modelSetHasVibrationVectors ()));
if (m.modelSetProperties != null) {
info.put ("modelSetProperties", m.modelSetProperties);
}info.put ("modelCountSelected", Integer.$valueOf (JU.BSUtil.cardinalityOf (bsModels)));
info.put ("modelsSelected", bsModels);
var vModels =  new JU.Lst ();
m.getMolecules ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
var model =  new java.util.Hashtable ();
model.put ("_ipt", Integer.$valueOf (i));
model.put ("num", Integer.$valueOf (m.getModelNumber (i)));
model.put ("file_model", m.getModelNumberDotted (i));
model.put ("name", m.getModelName (i));
var s = m.getModelTitle (i);
if (s != null) model.put ("title", s);
s = m.getModelFileName (i);
if (s != null) model.put ("file", s);
s = m.getInfo (i, "modelID");
if (s != null) model.put ("id", s);
model.put ("vibrationVectors", Boolean.$valueOf (this.vwr.modelHasVibrationVectors (i)));
var mi = m.am[i];
model.put ("atomCount", Integer.$valueOf (mi.act));
model.put ("bondCount", Integer.$valueOf (mi.getBondCount ()));
model.put ("groupCount", Integer.$valueOf (mi.getGroupCount ()));
model.put ("moleculeCount", Integer.$valueOf (mi.moleculeCount));
if (mi.isBioModel) model.put ("polymerCount", Integer.$valueOf ((mi).getBioPolymerCount ()));
model.put ("chainCount", Integer.$valueOf (m.getChainCountInModelWater (i, true)));
if (mi.properties != null) {
model.put ("modelProperties", mi.properties);
}var energy = m.getInfo (i, "Energy");
if (energy != null) {
model.put ("energy", energy);
}model.put ("atomCount", Integer.$valueOf (mi.act));
vModels.addLast (model);
}
info.put ("models", vModels);
return info;
}, "~O");
Clazz_overrideMethod (c$, "getLigandInfo", 
function (atomExpression) {
var bsAtoms = this.vwr.getAtomBitSet (atomExpression);
var bsSolvent = this.vwr.getAtomBitSet ("solvent");
var info =  new java.util.Hashtable ();
var ligands =  new JU.Lst ();
info.put ("ligands", ligands);
var ms = this.vwr.ms;
var bsExclude = JU.BSUtil.copyInvert (bsAtoms, ms.ac);
bsExclude.or (bsSolvent);
var atoms = ms.at;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) if (atoms[i].group.isProtein () || atoms[i].group.isDna () || atoms[i].group.isRna ()) atoms[i].group.setAtomBitsAndClear (bsExclude, bsAtoms);

var bsModelAtoms =  new Array (ms.mc);
for (var i = ms.mc; --i >= 0; ) {
bsModelAtoms[i] = this.vwr.getModelUndeletedAtomsBitSet (i);
bsModelAtoms[i].andNot (bsExclude);
}
var molList = JU.JmolMolecule.getMolecules (atoms, bsModelAtoms, null, bsExclude);
for (var i = 0; i < molList.length; i++) {
var bs = molList[i].atomList;
var ligand =  new java.util.Hashtable ();
ligands.addLast (ligand);
ligand.put ("atoms", JU.Escape.eBS (bs));
var names = "";
var sep = "";
var lastGroup = null;
var iChainLast = 0;
var sChainLast = null;
var reslist = "";
var model = "";
var resnolast = 2147483647;
var resnofirst = 2147483647;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
var atom = atoms[j];
if (lastGroup === atom.group) continue;
lastGroup = atom.group;
var resno = atom.getResno ();
var chain = atom.getChainID ();
if (resnolast != resno - 1) {
if (reslist.length != 0 && resnolast != resnofirst) reslist += "-" + resnolast;
chain = -1;
resnofirst = resno;
}model = "/" + ms.getModelNumberDotted (atom.mi);
if (iChainLast != 0 && chain != iChainLast) reslist += ":" + sChainLast + model;
if (chain == -1) reslist += " " + resno;
resnolast = resno;
iChainLast = atom.getChainID ();
sChainLast = atom.getChainIDStr ();
names += sep + atom.getGroup3 (false);
sep = "-";
}
reslist += (resnofirst == resnolast ? "" : "-" + resnolast) + (iChainLast == 0 ? "" : ":" + sChainLast) + model;
ligand.put ("groupNames", names);
ligand.put ("residueList", reslist.substring (1));
}
return info;
}, "~O");
Clazz_overrideMethod (c$, "getAtomData", 
function (atomExpression, type, allTrajectories) {
if (!atomExpression.startsWith ("{")) atomExpression = "{" + atomExpression + "}";
var isUser = type.toLowerCase ().startsWith ("user:");
var isProp = type.toLowerCase ().startsWith ("property_");
if (allTrajectories && !isUser && !isProp) type = type.toUpperCase ();
var exp = (isProp ? "%{" + type + "}" : isUser ? type.substring (5) : type.equals ("xyzrn") ? "%-2e %8.3x %8.3y %8.3z %4.2[vdw] 1 [%n]%r.%a#%i" : type.equals ("xyzvib") ? "%-2e %10.5x %10.5y %10.5z %10.5vx %10.5vy %10.5vz" : type.equals ("pdb") ? "{selected and not hetero}.label(\"ATOM  %5i %-4a%1A%3.3n %1c%4R%1E   %8.3x%8.3y%8.3z%6.2Q%6.2b          %2e  \").lines+{selected and hetero}.label(\"HETATM%5i %-4a%1A%3.3n %1c%4R%1E   %8.3x%8.3y%8.3z%6.2Q%6.2b          %2e  \").lines" : type.equals ("xyz") ? "%-2e %10.5x %10.5y %10.5z" : type.equals ("cfi") ? "print 'from Jmol" + JV.Viewer.getJmolVersion () + "\n'+{selected}.count + ' ' + {selected}.bonds.count + '\n'   + {selected}.format('%10.0[atomno] %10.0[elemno] %10.4[xyz]')  + {selected}.bonds.format('%i1 %i2') + '\n' + {selected}.bonds.format('%ORDER')" : null);
if (exp == null) return this.getModelExtract (this.vwr.getAtomBitSet (atomExpression), false, false, type.toUpperCase (), allTrajectories);
if (exp.startsWith ("print")) return this.vwr.runScript (exp);
if (exp.indexOf ("label") < 0) exp = atomExpression + ".label(\"" + exp + "\").lines";
 else if (!atomExpression.equals ("selected")) exp = JU.PT.rep (exp, "selected", atomExpression.substring (1, atomExpression.length - 1));
return this.vwr.evaluateExpression (exp);
}, "~S,~S,~B");
Clazz_overrideMethod (c$, "getModelExtract", 
function (bs, doTransform, isModelKit, type, allTrajectories) {
if (type.equalsIgnoreCase ("CML")) return this.getModelCml (bs, 2147483647, true, doTransform, allTrajectories);
if (type.equals ("PDB") || type.equals ("PQR")) return this.getPdbAtomData (bs, null, type.equals ("PQR"), doTransform, allTrajectories);
var asV3000 = type.equalsIgnoreCase ("V3000");
var asSDF = type.equalsIgnoreCase ("SDF");
var asXYZVIB = (!doTransform && type.equalsIgnoreCase ("XYZVIB"));
var asXYZRN = type.equalsIgnoreCase ("XYZRN");
var isXYZ = type.toUpperCase ().startsWith ("XYZ");
var asJSON = type.equalsIgnoreCase ("JSON") || type.equalsIgnoreCase ("CD");
var mol =  new JU.SB ();
var ms = this.vwr.ms;
if (!isXYZ && !asJSON) {
mol.append (isModelKit ? "Jmol Model Kit" : this.vwr.fm.getFullPathName (false).$replace ('\\', '/'));
var version = JV.Viewer.getJmolVersion ();
mol.append ("\n__Jmol-").append (version.substring (0, 2));
var cMM;
var cDD;
var cYYYY;
var cHH;
var cmm;
{
var c = new Date(); cMM = c.getMonth(); cDD = c.getDate();
cYYYY = c.getFullYear(); cHH = c.getHours(); cmm =
c.getMinutes();
}JU.PT.rightJustify (mol, "_00", "" + (1 + cMM));
JU.PT.rightJustify (mol, "00", "" + cDD);
mol.append (("" + cYYYY).substring (2, 4));
JU.PT.rightJustify (mol, "00", "" + cHH);
JU.PT.rightJustify (mol, "00", "" + cmm);
mol.append ("3D 1   1.00000     0.00000     0");
mol.append ("\nJmol version ").append (JV.Viewer.getJmolVersion ()).append (" EXTRACT: ").append (JU.Escape.eBS (bs)).append ("\n");
}var bsAtoms = JU.BSUtil.copy (bs);
var atoms = ms.at;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) if (doTransform && atoms[i].isDeleted ()) bsAtoms.clear (i);

var bsBonds = JV.PropertyManager.getCovalentBondsForAtoms (ms.bo, ms.bondCount, bsAtoms);
if (!asXYZVIB && bsAtoms.cardinality () == 0) return "";
var isOK = true;
var bsModels = this.vwr.ms.getModelBS (bsAtoms, true);
if (ms.trajectory != null && !allTrajectories) ms.trajectory.selectDisplayed (bsModels);
var q = (doTransform ? this.vwr.tm.getRotationQ () : null);
if (asSDF) {
var header = mol.toString ();
mol =  new JU.SB ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
mol.append (header);
var bsTemp = JU.BSUtil.copy (bsAtoms);
bsTemp.and (ms.getModelAtomBitSetIncludingDeleted (i, false));
bsBonds = JV.PropertyManager.getCovalentBondsForAtoms (ms.bo, ms.bondCount, bsTemp);
if (!(isOK = this.addMolFile (i, mol, bsTemp, bsBonds, false, false, q))) break;
mol.append ("$$$$\n");
}
} else if (isXYZ) {
var tokensXYZ = JM.LabelToken.compile (this.vwr, (asXYZRN ? "%-2e _XYZ_ %4.2[vdw] 1 [%n]%r.%a#%i\n" : "%-2e _XYZ_\n"), '\0', null);
var tokensVib = (asXYZVIB ? JM.LabelToken.compile (this.vwr, "%-2e _XYZ_ %12.5vx %12.5vy %12.5vz\n", '\0', null) : null);
var ptTemp =  new JU.P3 ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
var bsTemp = JU.BSUtil.copy (bsAtoms);
bsTemp.and (ms.getModelAtomBitSetIncludingDeleted (i, false));
if (bsTemp.cardinality () == 0) continue;
mol.appendI (bsTemp.cardinality ()).appendC ('\n');
var props = ms.am[i].properties;
mol.append ("Model[" + (i + 1) + "]: ");
if (ms.frameTitles[i] != null && ms.frameTitles[i].length > 0) {
mol.append (ms.frameTitles[i].$replace ('\n', ' '));
} else if (props == null) {
mol.append ("Jmol " + JV.Viewer.getJmolVersion ());
} else {
var sb =  new JU.SB ();
var e = props.propertyNames ();
var path = null;
while (e.hasMoreElements ()) {
var propertyName = e.nextElement ();
if (propertyName.equals (".PATH")) path = props.getProperty (propertyName);
 else sb.append (";").append (propertyName).append ("=").append (props.getProperty (propertyName));
}
if (path != null) sb.append (";PATH=").append (path);
path = sb.substring (sb.length () > 0 ? 1 : 0);
mol.append (path.$replace ('\n', ' '));
}mol.appendC ('\n');
var o =  Clazz_newArray (-1, [ptTemp]);
for (var j = bsTemp.nextSetBit (0); j >= 0; j = bsTemp.nextSetBit (j + 1)) {
var s = JM.LabelToken.formatLabelAtomArray (this.vwr, atoms[j], (asXYZVIB && ms.getVibration (j, false) != null ? tokensVib : tokensXYZ), '\0', null, ptTemp);
this.getPointTransf (i, ms, atoms[j], q, ptTemp);
s = JU.PT.rep (s, "_XYZ_", JU.PT.sprintf ("%12.5p %12.5p %12.5p", "p", o));
mol.append (s);
}
}
} else {
isOK = this.addMolFile (-1, mol, bsAtoms, bsBonds, asV3000, asJSON, q);
}return (isOK ? mol.toString () : "ERROR: Too many atoms or bonds -- use V3000 format.");
}, "JU.BS,~B,~B,~S,~B");
Clazz_defineMethod (c$, "addMolFile", 
 function (iModel, mol, bsAtoms, bsBonds, asV3000, asJSON, q) {
var nAtoms = bsAtoms.cardinality ();
var nBonds = bsBonds.cardinality ();
if (!asV3000 && !asJSON && (nAtoms > 999 || nBonds > 999)) return false;
var ms = this.vwr.ms;
var atomMap =  Clazz_newIntArray (ms.ac, 0);
var pTemp =  new JU.P3 ();
if (asV3000) {
mol.append ("  0  0  0  0  0  0            999 V3000");
} else if (asJSON) {
mol.append ("{\"mol\":{\"createdBy\":\"Jmol " + JV.Viewer.getJmolVersion () + "\",\"a\":[");
} else {
JU.PT.rightJustify (mol, "   ", "" + nAtoms);
JU.PT.rightJustify (mol, "   ", "" + nBonds);
mol.append ("  0  0  0  0              1 V2000");
}if (!asJSON) mol.append ("\n");
if (asV3000) {
mol.append ("M  V30 BEGIN CTAB\nM  V30 COUNTS ").appendI (nAtoms).append (" ").appendI (nBonds).append (" 0 0 0\n").append ("M  V30 BEGIN ATOM\n");
}for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1)) this.getAtomRecordMOL (iModel, ms, mol, atomMap[i] = ++n, ms.at[i], q, pTemp, asV3000, asJSON);

if (asV3000) {
mol.append ("M  V30 END ATOM\nM  V30 BEGIN BOND\n");
} else if (asJSON) {
mol.append ("],\"b\":[");
}for (var i = bsBonds.nextSetBit (0), n = 0; i >= 0; i = bsBonds.nextSetBit (i + 1)) this.getBondRecordMOL (mol, ++n, ms.bo[i], atomMap, asV3000, asJSON);

if (asV3000) {
mol.append ("M  V30 END BOND\nM  V30 END CTAB\n");
}if (asJSON) mol.append ("]}}");
 else {
mol.append ("M  END\n");
}if (!asJSON && !asV3000) {
var pc = ms.getPartialCharges ();
if (pc != null) {
mol.append ("> <JMOL_PARTIAL_CHARGES>\n").appendI (nAtoms).appendC ('\n');
for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1)) mol.appendI (++n).append (" ").appendF (pc[i]).appendC ('\n');

}}return true;
}, "~N,JU.SB,JU.BS,JU.BS,~B,~B,JU.Quat");
c$.getCovalentBondsForAtoms = Clazz_defineMethod (c$, "getCovalentBondsForAtoms", 
 function (bonds, bondCount, bsAtoms) {
var bsBonds =  new JU.BS ();
for (var i = 0; i < bondCount; i++) {
var bond = bonds[i];
if (bsAtoms.get (bond.atom1.i) && bsAtoms.get (bond.atom2.i) && bond.isCovalent ()) bsBonds.set (i);
}
return bsBonds;
}, "~A,~N,JU.BS");
Clazz_defineMethod (c$, "getAtomRecordMOL", 
 function (iModel, ms, mol, n, a, q, pTemp, asV3000, asJSON) {
this.getPointTransf (iModel, ms, a, q, pTemp);
var elemNo = a.getElementNumber ();
var sym = (a.isDeleted () ? "Xx" : JU.Elements.elementSymbolFromNumber (elemNo));
var iso = a.getIsotopeNumber ();
var charge = a.getFormalCharge ();
var o =  Clazz_newArray (-1, [pTemp]);
if (asV3000) {
mol.append ("M  V30 ").appendI (n).append (" ").append (sym).append (JU.PT.sprintf (" %12.5p %12.5p %12.5p 0", "p", o));
if (charge != 0) mol.append (" CHG=").appendI (charge);
if (iso != 0) mol.append (" MASS=").appendI (iso);
mol.append ("\n");
} else if (asJSON) {
if (n != 1) mol.append (",");
mol.append ("{");
if (a.getElementNumber () != 6) mol.append ("\"l\":\"").append (a.getElementSymbol ()).append ("\",");
if (charge != 0) mol.append ("\"c\":").appendI (charge).append (",");
if (iso != 0 && iso != JU.Elements.getNaturalIsotope (elemNo)) mol.append ("\"m\":").appendI (iso).append (",");
mol.append ("\"x\":").appendF (a.x).append (",\"y\":").appendF (a.y).append (",\"z\":").appendF (a.z).append ("}");
} else {
mol.append (JU.PT.sprintf ("%10.5p%10.5p%10.5p", "p", o));
mol.append (" ").append (sym);
if (sym.length == 1) mol.append (" ");
if (iso > 0) iso -= JU.Elements.getNaturalIsotope (a.getElementNumber ());
mol.append (" ");
JU.PT.rightJustify (mol, "  ", "" + iso);
JU.PT.rightJustify (mol, "   ", "" + (charge == 0 ? 0 : 4 - charge));
mol.append ("  0  0  0  0\n");
}}, "~N,JM.ModelSet,JU.SB,~N,JM.Atom,JU.Quat,JU.P3,~B,~B");
Clazz_defineMethod (c$, "getPointTransf", 
 function (i, ms, a, q, pTemp) {
if (ms.isTrajectory (i >= 0 ? i : a.mi)) ms.trajectory.getFractional (a, pTemp);
 else pTemp.setT (a);
if (q != null) q.transform2 (pTemp, pTemp);
}, "~N,JM.ModelSet,JM.Atom,JU.Quat,JU.P3");
Clazz_defineMethod (c$, "getBondRecordMOL", 
 function (mol, n, b, atomMap, asV3000, asJSON) {
var a1 = atomMap[b.atom1.i];
var a2 = atomMap[b.atom2.i];
var order = b.getValence ();
if (order > 3) order = 1;
switch (b.order & -131073) {
case 515:
order = (asJSON ? -3 : 4);
break;
case 66:
order = (asJSON ? -3 : 5);
break;
case 513:
order = (asJSON ? 1 : 6);
break;
case 514:
order = (asJSON ? 2 : 7);
break;
case 33:
order = (asJSON ? -1 : 8);
break;
}
if (asV3000) {
mol.append ("M  V30 ").appendI (n).append (" ").appendI (order).append (" ").appendI (a1).append (" ").appendI (a2).appendC ('\n');
} else if (asJSON) {
if (n != 1) mol.append (",");
mol.append ("{\"b\":").appendI (a1 - 1).append (",\"e\":").appendI (a2 - 1);
if (order != 1) {
mol.append (",\"o\":");
if (order < 0) {
mol.appendF (-order / 2);
} else {
mol.appendI (order);
}}mol.append ("}");
} else {
JU.PT.rightJustify (mol, "   ", "" + a1);
JU.PT.rightJustify (mol, "   ", "" + a2);
mol.append ("  ").appendI (order).append ("  0  0  0\n");
}}, "JU.SB,~N,JM.Bond,~A,~B,~B");
Clazz_overrideMethod (c$, "getChimeInfo", 
function (tok, bs) {
switch (tok) {
case 1073741982:
break;
case 1073741864:
return this.getBasePairInfo (bs);
default:
return this.getChimeInfoA (this.vwr.ms.at, tok, bs);
}
var sb =  new JU.SB ();
this.vwr.getChimeMessenger ().getAllChimeInfo (sb);
return sb.appendC ('\n').toString ().substring (1);
}, "~N,JU.BS");
Clazz_defineMethod (c$, "getChimeInfoA", 
 function (atoms, tok, bs) {
var info =  new JU.SB ();
info.append ("\n");
var s = "";
var clast = null;
var glast = null;
var modelLast = -1;
var n = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = atoms[i];
switch (tok) {
default:
return "";
case 1113589787:
s = a.getInfo ();
break;
case 1140850689:
s = "" + a.getAtomNumber ();
break;
case 1086324742:
s = a.getGroup3 (false);
break;
case 1086324740:
case 1073742120:
case 1086324744:
case 1086324743:
var id = a.getChainID ();
s = (id == 0 ? " " : a.getChainIDStr ());
if (id >= 300) s = JU.PT.esc (s);
switch (tok) {
case 1073742120:
s = "[" + a.getGroup3 (false) + "]" + a.group.getSeqcodeString () + ":" + s;
break;
case 1086324744:
case 1086324743:
if (a.mi != modelLast) {
info.appendC ('\n');
n = 0;
modelLast = a.mi;
info.append ("Model " + a.getModelNumber ());
glast = null;
clast = null;
}if (a.group.chain !== clast) {
info.appendC ('\n');
n = 0;
clast = a.group.chain;
info.append ("Chain " + s + ":\n");
glast = null;
}var g = a.group;
if (g !== glast) {
glast = g;
if (tok == 1086324743) {
info.append (a.getGroup1 ('?'));
} else {
if ((n++) % 5 == 0 && n > 1) info.appendC ('\n');
JU.PT.leftJustify (info, "          ", "[" + a.getGroup3 (false) + "]" + a.getResno () + " ");
}}continue;
}
break;
}
if (info.indexOf ("\n" + s + "\n") < 0) info.append (s).appendC ('\n');
}
if (tok == 1086324744) info.appendC ('\n');
return info.toString ().substring (1);
}, "~A,~N,JU.BS");
Clazz_overrideMethod (c$, "getModelFileInfo", 
function (frames) {
var ms = this.vwr.ms;
var sb =  new JU.SB ();
for (var i = 0; i < ms.mc; ++i) {
if (frames != null && !frames.get (i)) continue;
var s = "[\"" + ms.getModelNumberDotted (i) + "\"] = ";
sb.append ("\n\nfile").append (s).append (JU.PT.esc (ms.getModelFileName (i)));
var id = ms.getInfo (i, "modelID");
if (id != null) sb.append ("\nid").append (s).append (JU.PT.esc (id));
sb.append ("\ntitle").append (s).append (JU.PT.esc (ms.getModelTitle (i)));
sb.append ("\nname").append (s).append (JU.PT.esc (ms.getModelName (i)));
sb.append ("\ntype").append (s).append (JU.PT.esc (ms.getModelFileType (i)));
}
return sb.toString ();
}, "JU.BS");
Clazz_defineMethod (c$, "getAllAtomInfo", 
function (bs) {
var V =  new JU.Lst ();
var ptTemp =  new JU.P3 ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
V.addLast (this.getAtomInfoLong (i, ptTemp));
}
return V;
}, "JU.BS");
Clazz_defineMethod (c$, "getAtomInfoLong", 
 function (i, ptTemp) {
var ms = this.vwr.ms;
var atom = ms.at[i];
var info =  new java.util.Hashtable ();
ms.getAtomIdentityInfo (i, info, ptTemp);
info.put ("element", ms.getElementName (i));
info.put ("elemno", Integer.$valueOf (ms.at[i].getElementNumber ()));
info.put ("x", Float.$valueOf (atom.x));
info.put ("y", Float.$valueOf (atom.y));
info.put ("z", Float.$valueOf (atom.z));
info.put ("coord", JU.P3.newP (atom));
if (ms.vibrations != null && ms.vibrations[i] != null) ms.vibrations[i].getInfo (info);
info.put ("bondCount", Integer.$valueOf (atom.getCovalentBondCount ()));
info.put ("radius", Float.$valueOf ((atom.getRasMolRadius () / 120.0)));
info.put ("model", atom.getModelNumberForLabel ());
var shape = atom.atomPropertyString (this.vwr, 1086324748);
if (shape != null) info.put ("shape", shape);
info.put ("visible", Boolean.$valueOf (atom.checkVisible ()));
info.put ("clickabilityFlags", Integer.$valueOf (atom.clickabilityFlags));
info.put ("visibilityFlags", Integer.$valueOf (atom.shapeVisibilityFlags));
info.put ("spacefill", Float.$valueOf (atom.getRadius ()));
var strColor = JU.Escape.escapeColor (this.vwr.gdata.getColorArgbOrGray (atom.colixAtom));
if (strColor != null) info.put ("color", strColor);
info.put ("colix", Integer.$valueOf (atom.colixAtom));
var isTranslucent = JU.C.isColixTranslucent (atom.colixAtom);
if (isTranslucent) info.put ("translucent", Boolean.$valueOf (isTranslucent));
info.put ("formalCharge", Integer.$valueOf (atom.getFormalCharge ()));
info.put ("partialCharge", Float.$valueOf (atom.getPartialCharge ()));
var d = atom.getSurfaceDistance100 () / 100;
if (d >= 0) info.put ("surfaceDistance", Float.$valueOf (d));
if (ms.am[atom.mi].isBioModel) {
info.put ("resname", atom.getGroup3 (false));
var insCode = atom.group.getInsertionCode ();
var seqNum = atom.getResno ();
if (seqNum > 0) info.put ("resno", Integer.$valueOf (seqNum));
if (insCode.charCodeAt (0) != 0) info.put ("insertionCode", "" + insCode);
info.put ("name", ms.at[i].getAtomName ());
info.put ("chain", atom.getChainIDStr ());
info.put ("atomID", Integer.$valueOf (atom.atomID));
info.put ("groupID", Integer.$valueOf (atom.group.groupID));
if (atom.altloc != '\0') info.put ("altLocation", "" + atom.altloc);
info.put ("structure", Integer.$valueOf (atom.group.getProteinStructureType ().getId ()));
info.put ("polymerLength", Integer.$valueOf (atom.group.getBioPolymerLength ()));
info.put ("occupancy", Integer.$valueOf (atom.getOccupancy100 ()));
var temp = atom.getBfactor100 ();
info.put ("temp", Integer.$valueOf (Clazz_doubleToInt (temp / 100)));
}return info;
}, "~N,JU.P3");
Clazz_defineMethod (c$, "getAllBondInfo", 
function (bsOrArray) {
var v =  new JU.Lst ();
var ms = this.vwr.ms;
var bondCount = ms.bondCount;
var bonds = ms.bo;
var bs1;
if (Clazz_instanceOf (bsOrArray, String)) {
bsOrArray = this.vwr.getAtomBitSet (bsOrArray);
}var ptTemp =  new JU.P3 ();
if (Clazz_instanceOf (bsOrArray, Array)) {
bs1 = (bsOrArray)[0];
var bs2 = (bsOrArray)[1];
for (var i = 0; i < bondCount; i++) {
var ia = bonds[i].atom1.i;
var ib = bonds[i].atom2.i;
if (bs1.get (ia) && bs2.get (ib) || bs2.get (ia) && bs1.get (ib)) v.addLast (this.getBondInfo (i, ptTemp));
}
} else if (Clazz_instanceOf (bsOrArray, JM.BondSet)) {
bs1 = bsOrArray;
for (var i = bs1.nextSetBit (0); i >= 0 && i < bondCount; i = bs1.nextSetBit (i + 1)) v.addLast (this.getBondInfo (i, ptTemp));

} else if (Clazz_instanceOf (bsOrArray, JU.BS)) {
bs1 = bsOrArray;
var thisAtom = (bs1.cardinality () == 1 ? bs1.nextSetBit (0) : -1);
for (var i = 0; i < bondCount; i++) {
if (thisAtom >= 0 ? (bonds[i].atom1.i == thisAtom || bonds[i].atom2.i == thisAtom) : bs1.get (bonds[i].atom1.i) && bs1.get (bonds[i].atom2.i)) v.addLast (this.getBondInfo (i, ptTemp));
}
}return v;
}, "~O");
Clazz_defineMethod (c$, "getBondInfo", 
 function (i, ptTemp) {
var bond = this.vwr.ms.bo[i];
var atom1 = bond.atom1;
var atom2 = bond.atom2;
var info =  new java.util.Hashtable ();
info.put ("_bpt", Integer.$valueOf (i));
var infoA =  new java.util.Hashtable ();
this.vwr.ms.getAtomIdentityInfo (atom1.i, infoA, ptTemp);
var infoB =  new java.util.Hashtable ();
this.vwr.ms.getAtomIdentityInfo (atom2.i, infoB, ptTemp);
info.put ("atom1", infoA);
info.put ("atom2", infoB);
info.put ("order", Float.$valueOf (JU.PT.fVal (JU.Edge.getBondOrderNumberFromOrder (bond.order))));
info.put ("type", JU.Edge.getBondOrderNameFromOrder (bond.order));
info.put ("radius", Float.$valueOf ((bond.mad / 2000.)));
info.put ("length_Ang", Float.$valueOf (atom1.distance (atom2)));
info.put ("visible", Boolean.$valueOf (bond.shapeVisibilityFlags != 0));
var strColor = JU.Escape.escapeColor (this.vwr.gdata.getColorArgbOrGray (bond.colix));
if (strColor != null) info.put ("color", strColor);
info.put ("colix", Integer.$valueOf (bond.colix));
if (JU.C.isColixTranslucent (bond.colix)) info.put ("translucent", Boolean.TRUE);
return info;
}, "~N,JU.P3");
Clazz_defineMethod (c$, "getAllChainInfo", 
function (bs) {
var finalInfo =  new java.util.Hashtable ();
var modelVector =  new JU.Lst ();
var modelCount = this.vwr.ms.mc;
for (var i = 0; i < modelCount; ++i) {
var modelInfo =  new java.util.Hashtable ();
var info = this.getChainInfo (i, bs);
if (info.size () > 0) {
modelInfo.put ("modelIndex", Integer.$valueOf (i));
modelInfo.put ("chains", info);
modelVector.addLast (modelInfo);
}}
finalInfo.put ("models", modelVector);
return finalInfo;
}, "JU.BS");
Clazz_defineMethod (c$, "getChainInfo", 
 function (modelIndex, bs) {
var model = this.vwr.ms.am[modelIndex];
var nChains = model.getChainCount (true);
var infoChains =  new JU.Lst ();
var ptTemp =  new JU.P3 ();
for (var i = 0; i < nChains; i++) {
var chain = model.getChainAt (i);
var infoChain =  new JU.Lst ();
var nGroups = chain.groupCount;
var arrayName =  new java.util.Hashtable ();
for (var igroup = 0; igroup < nGroups; igroup++) {
var group = chain.groups[igroup];
if (bs.get (group.firstAtomIndex)) infoChain.addLast (group.getGroupInfo (igroup, ptTemp));
}
if (!infoChain.isEmpty ()) {
arrayName.put ("residues", infoChain);
infoChains.addLast (arrayName);
}}
return infoChains;
}, "~N,JU.BS");
Clazz_defineMethod (c$, "getAllPolymerInfo", 
 function (bs) {
var info =  new java.util.Hashtable ();
if (this.vwr.ms.bioModelset != null) this.vwr.ms.bioModelset.getAllPolymerInfo (bs, info);
return info;
}, "JU.BS");
Clazz_defineMethod (c$, "getBasePairInfo", 
 function (bs) {
var info =  new JU.SB ();
var vHBonds =  new JU.Lst ();
this.vwr.ms.calcRasmolHydrogenBonds (bs, bs, vHBonds, true, 1, false, null);
for (var i = vHBonds.size (); --i >= 0; ) {
var b = vHBonds.get (i);
JV.PropertyManager.getAtomResidueInfo (info, b.atom1);
info.append (" - ");
JV.PropertyManager.getAtomResidueInfo (info, b.atom2);
info.append ("\n");
}
return info.toString ();
}, "JU.BS");
c$.getAtomResidueInfo = Clazz_defineMethod (c$, "getAtomResidueInfo", 
 function (info, atom) {
info.append ("[").append (atom.getGroup3 (false)).append ("]").append (atom.group.getSeqcodeString ()).append (":");
var id = atom.getChainID ();
info.append (id == 0 ? " " : atom.getChainIDStr ());
}, "JU.SB,JM.Atom");
Clazz_defineMethod (c$, "getAppletInfo", 
 function () {
var info =  new java.util.Hashtable ();
info.put ("htmlName", this.vwr.htmlName);
info.put ("syncId", this.vwr.syncId);
info.put ("fullName", this.vwr.fullName);
info.put ("codeBase", "" + JV.Viewer.appletCodeBase);
if (this.vwr.isApplet) {
info.put ("documentBase", JV.Viewer.appletDocumentBase);
info.put ("registry", this.vwr.sm.getRegistryInfo ());
}info.put ("version", JV.JC.version);
info.put ("date", JV.JC.date);
info.put ("javaVendor", JV.Viewer.strJavaVendor);
info.put ("javaVersion", JV.Viewer.strJavaVersion + (!this.vwr.isJS ? "" : this.vwr.isWebGL ? "(WebGL)" : "(HTML5)"));
info.put ("operatingSystem", JV.Viewer.strOSName);
return info;
});
Clazz_defineMethod (c$, "getAnimationInfo", 
 function () {
var am = this.vwr.am;
var info =  new java.util.Hashtable ();
info.put ("firstModelIndex", Integer.$valueOf (am.firstFrameIndex));
info.put ("lastModelIndex", Integer.$valueOf (am.lastFrameIndex));
info.put ("animationDirection", Integer.$valueOf (am.animationDirection));
info.put ("currentDirection", Integer.$valueOf (am.currentDirection));
info.put ("displayModelIndex", Integer.$valueOf (am.cmi));
if (am.animationFrames != null) {
info.put ("isMovie", Boolean.TRUE);
info.put ("frames", JU.Escape.eAI (am.animationFrames));
info.put ("currentAnimationFrame", Integer.$valueOf (am.caf));
}info.put ("displayModelNumber", this.vwr.getModelNumberDotted (am.cmi));
info.put ("displayModelName", (am.cmi >= 0 ? this.vwr.getModelName (am.cmi) : ""));
info.put ("animationFps", Integer.$valueOf (am.animationFps));
info.put ("animationReplayMode", JS.T.nameOf (am.animationReplayMode));
info.put ("firstFrameDelay", Float.$valueOf (am.firstFrameDelay));
info.put ("lastFrameDelay", Float.$valueOf (am.lastFrameDelay));
info.put ("animationOn", Boolean.$valueOf (am.animationOn));
info.put ("animationPaused", Boolean.$valueOf (am.animationPaused));
return info;
});
Clazz_defineMethod (c$, "getBoundBoxInfo", 
 function () {
var pts = this.vwr.ms.getBoxInfo (null, 1).getBoundBoxPoints (true);
var info =  new java.util.Hashtable ();
info.put ("center", JU.P3.newP (pts[0]));
info.put ("vector", JU.V3.newV (pts[1]));
info.put ("corner0", JU.P3.newP (pts[2]));
info.put ("corner1", JU.P3.newP (pts[3]));
return info;
});
Clazz_defineMethod (c$, "getShapeInfo", 
 function () {
var info =  new java.util.Hashtable ();
var commands =  new JU.SB ();
var shapes = this.vwr.shm.shapes;
if (shapes != null) for (var i = 0; i < 37; ++i) {
var shape = shapes[i];
if (shape != null) {
var shapeType = JV.JC.shapeClassBases[i];
var shapeDetail = shape.getShapeDetail ();
if (shapeDetail != null) info.put (shapeType, shapeDetail);
}}
if (commands.length () > 0) info.put ("shapeCommands", commands.toString ());
return info;
});
Clazz_defineMethod (c$, "getAnnotationInfo", 
 function (atomExpression, type) {
var bsAtoms = this.vwr.getAtomBitSet (atomExpression);
var iModel = this.vwr.ms.getModelBS (bsAtoms, false).nextSetBit (0);
if (iModel < 0) return null;
var modelinfo = this.vwr.ms.getModelAuxiliaryInfo (iModel);
var objAnn = modelinfo.get (type == 1073741925 ? "domains" : "validation");
if (objAnn == null || objAnn.tok != 6) return null;
this.vwr.getAnnotationParser (false).initializeAnnotation (objAnn, type, iModel);
return objAnn.mapGet ("_list");
}, "~O,~N");
Clazz_defineMethod (c$, "getMeasurementInfo", 
 function () {
return this.vwr.getShapeProperty (6, "info");
});
Clazz_defineMethod (c$, "getMouseInfo", 
 function () {
if (!this.vwr.haveDisplay) return null;
var info =  new java.util.Hashtable ();
var list =  new JU.Lst ();
var am = this.vwr.acm;
for (var obj, $obj = am.b.getBindings ().values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
if (Clazz_instanceOf (obj, Boolean)) continue;
if (JU.AU.isAI (obj)) {
var binding = obj;
obj =  Clazz_newArray (-1, [JV.binding.Binding.getMouseActionName (binding[0], false), JV.ActionManager.getActionName (binding[1])]);
}list.addLast (obj);
}
info.put ("bindings", list);
info.put ("bindingName", am.b.name);
info.put ("actionNames", JV.ActionManager.actionNames);
info.put ("actionInfo", JV.ActionManager.actionInfo);
info.put ("bindingInfo", JU.PT.split (am.getBindingInfo (null), "\n"));
return info;
});
Clazz_overrideMethod (c$, "getPdbAtomData", 
function (bs, out, isPQR, doTransform, allTrajectories) {
if (this.vwr.ms.ac == 0 || bs.nextSetBit (0) < 0) return "";
if (out == null) {
out = this.vwr.getOutputChannel (null, null);
} else {
isPQR = new Boolean (isPQR | (out.getType ().indexOf ("PQR") >= 0)).valueOf ();
doTransform = new Boolean (doTransform | (out.getType ().indexOf ("-coord true") >= 0)).valueOf ();
}var atoms = this.vwr.ms.at;
var models = this.vwr.ms.am;
var iModel = atoms[bs.nextSetBit (0)].mi;
var iModelLast = -1;
var isBiomodel = false;
var occTemp = "%6.2Q%6.2b          ";
if (isPQR) {
occTemp = "%8.4P%7.4V       ";
var charge = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) charge += atoms[i].getPartialCharge ();

out.append ("REMARK   1 PQR file generated by Jmol " + JV.Viewer.getJmolVersion ()).append ("\nREMARK   1 " + "created " + ( new java.util.Date ())).append ("\nREMARK   1 Forcefield Used: unknown\nREMARK   1").append ("\nREMARK   5").append ("\nREMARK   6 Total charge on this protein: " + charge + " e\nREMARK   6\n");
}var lastAtomIndex = bs.length () - 1;
var showModels = (iModel != atoms[lastAtomIndex].mi);
var lines =  new JU.Lst ();
var isMultipleBondPDB = models[iModel].isPdbWithMultipleBonds;
var tokens;
var ptTemp =  new JU.P3 ();
var o =  Clazz_newArray (-1, [ptTemp]);
var q = (doTransform ? this.vwr.tm.getRotationQ () : null);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = atoms[i];
isBiomodel = models[a.mi].isBioModel;
if (showModels && a.mi != iModelLast) {
if (iModelLast != -1) out.append ("ENDMDL\n");
iModelLast = a.mi;
out.append ("MODEL     " + (iModelLast + 1) + "\n");
lines =  new JU.Lst ();
}var sa = a.getAtomName ();
var leftJustify = (a.getElementSymbol ().length == 2 || sa.length >= 4 || JU.PT.isDigit (sa.charAt (0)));
var isHetero = a.isHetero ();
if (!isBiomodel) tokens = (leftJustify ? JM.LabelToken.compile (this.vwr, "HETATM%5.-5i %-4.4a%1AUNK %1c   1%1E   _XYZ_" + occTemp, '\0', null) : JM.LabelToken.compile (this.vwr, "HETATM%5.-5i  %-3.3a%1AUNK %1c   1%1E   _XYZ_" + occTemp, '\0', null));
 else if (isHetero) tokens = (leftJustify ? JM.LabelToken.compile (this.vwr, "HETATM%5.-5i %-4.4a%1A%3.3n %1c%4.-4R%1E   _XYZ_" + occTemp, '\0', null) : JM.LabelToken.compile (this.vwr, "HETATM%5.-5i  %-3.3a%1A%3.3n %1c%4.-4R%1E   _XYZ_" + occTemp, '\0', null));
 else tokens = (leftJustify ? JM.LabelToken.compile (this.vwr, "ATOM  %5.-5i %-4.4a%1A%3.3n %1c%4.-4R%1E   _XYZ_" + occTemp, '\0', null) : JM.LabelToken.compile (this.vwr, "ATOM  %5.-5i  %-3.3a%1A%3.3n %1c%4.-4R%1E   _XYZ_" + occTemp, '\0', null));
var XX = a.getElementSymbolIso (false).toUpperCase ();
XX = this.pdbKey (a.group.getBioPolymerIndexInModel ()) + this.pdbKey (a.group.groupIndex) + JM.LabelToken.formatLabelAtomArray (this.vwr, a, tokens, '\0', null, ptTemp) + (XX.length == 1 ? " " + XX : XX.substring (0, 2)) + "  ";
this.getPointTransf (-1, this.vwr.ms, a, q, ptTemp);
var xyz = JU.PT.sprintf ("%8.3p%8.3p%8.3p", "p", o);
if (xyz.length > 24) xyz = JU.PT.sprintf ("%8.2p%8.2p%8.2p", "p", o);
XX = JU.PT.rep (XX, "_XYZ_", xyz);
lines.addLast (XX);
}
var map =  new java.util.Hashtable ();
this.fixPDBFormat (lines, map, out);
if (showModels) {
out.append ("ENDMDL\n");
} else {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = atoms[i];
var isHetero = (!isBiomodel || a.isHetero ());
var isCysS = !isHetero && (a.getElementNumber () == 16);
if (isHetero || isMultipleBondPDB || isCysS) {
var bonds = a.bonds;
if (bonds != null) for (var j = 0; j < bonds.length; j++) {
var iThis = a.getAtomNumber ();
var a2 = bonds[j].getOtherAtom (a);
if (!bs.get (a2.i)) continue;
var n = bonds[j].getCovalentOrder ();
if (n == 1 && (isMultipleBondPDB && !isHetero && !isCysS || isCysS && a2.getElementNumber () != 16)) continue;
var iOther = a2.getAtomNumber ();
switch (n) {
case 2:
case 3:
if (iOther < iThis) continue;
case 1:
out.append ("CONECT").append (JU.PT.formatStringS ("%5s", "s", "" + map.get (Integer.$valueOf (iThis))));
var s = JU.PT.formatStringS ("%5s", "s", "" + map.get (Integer.$valueOf (iOther)));
for (var k = 0; k < n; k++) out.append (s);

out.append ("\n");
break;
}
}
}}
}return out.toString ();
}, "JU.BS,JU.OC,~B,~B,~B");
Clazz_defineMethod (c$, "pdbKey", 
 function (np) {
var xp = (np < 0 ? "!999" : "   " + np);
return xp.substring (xp.length - 4);
}, "~N");
Clazz_defineMethod (c$, "fixPDBFormat", 
 function (lines, map, out) {
lines.addLast ("!999!999XXXXXX99999999999999999999!99!");
var alines =  new Array (lines.size ());
lines.toArray (alines);
java.util.Arrays.sort (alines);
lines.clear ();
for (var i = 0, n = alines.length; i < n; i++) {
lines.addLast (alines[i]);
}
var lastPoly = null;
var lastLine = null;
var n = lines.size ();
for (var i = 0; i < n; i++) {
var s = lines.get (i);
var poly = s.substring (0, 4);
s = s.substring (8);
var isTerm = false;
var isLast = (s.indexOf ("!99!") >= 0);
if (!poly.equals (lastPoly) || isLast) {
if (lastPoly != null && !lastPoly.equals ("!999")) {
isTerm = true;
s = "TER   " + lastLine.substring (6, 11) + "      " + lastLine.substring (17, 27);
lines.add (i, poly + "!!!!" + s);
n++;
}lastPoly = poly;
}if (isLast && !isTerm) break;
lastLine = s;
if (map != null && !isTerm) map.put (Integer.$valueOf (JU.PT.parseInt (s.substring (6, 11))), Integer.$valueOf (i + 1));
var si = "     " + (i + 1);
out.append (s.substring (0, 6)).append (si.substring (si.length - 5)).append (s.substring (11)).append ("\n");
}
}, "JU.Lst,java.util.Map,JU.OC");
Clazz_overrideMethod (c$, "getPdbData", 
function (modelIndex, type, bsSelected, parameters, out, addStructure) {
if (this.vwr.ms.isJmolDataFrameForModel (modelIndex)) modelIndex = this.vwr.ms.getJmolDataSourceFrame (modelIndex);
if (modelIndex < 0) return "";
var model = this.vwr.ms.am[modelIndex];
var isPDB = model.isBioModel;
if (parameters == null && !isPDB) return null;
if (out == null) out = this.vwr.getOutputChannel (null, null);
var pdbCONECT =  new JU.SB ();
var isDraw = (type.indexOf ("draw") >= 0);
var bsAtoms = null;
var bsWritten =  new JU.BS ();
var ctype = '\u0000';
var tokens = this.vwr.ms.getLabeler ().compile (this.vwr, "ATOM  %-6i%4a%1A%3.-3n %1c%4R%1E   ", '\0', null);
if (parameters == null) {
ctype = (type.length > 11 && type.indexOf ("quaternion ") >= 0 ? type.charAt (11) : 'R');
(model).getPdbData (type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten);
bsAtoms = this.vwr.getModelUndeletedAtomsBitSet (modelIndex);
} else {
bsAtoms = parameters[0];
var dataX = parameters[1];
var dataY = parameters[2];
var dataZ = parameters[3];
var haveY = (dataY != null);
var haveZ = (dataZ != null);
var minXYZ = parameters[4];
var maxXYZ = parameters[5];
var factors = parameters[6];
var center = parameters[7];
var format = parameters[8];
var properties = parameters[9];
var isPDBFormat = (factors != null && format == null);
var atoms = this.vwr.ms.at;
if (isPDBFormat) {
out.append ("REMARK   6 Jmol PDB-encoded data: ").append (type).append ("; ").append (JV.Viewer.getJmolVersion ()).append ("; ").append (this.vwr.apiPlatform.getDateFormat (null)).append ("\n");
out.append ("REMARK   6 Jmol data").append (" min = ").append (JU.Escape.eP (minXYZ)).append (" max = ").append (JU.Escape.eP (maxXYZ)).append (" unScaledXyz = xyz * ").append (JU.Escape.eP (factors)).append (" + ").append (JU.Escape.eP (center)).append (";\n");
var atomNames = null;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var name = "" + atoms[i].getAtomName ();
if (atomNames != null || name.length > 4) {
if (atomNames == null) {
atomNames = "";
i = -1;
continue;
}atomNames += " " + name;
}}
if (atomNames != null) out.append ("REMARK   6 Jmol atom names").append (atomNames).append ("\n");
var resNames = null;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var name = "" + atoms[i].getGroup3 (true);
if (resNames != null || name.length > 3) {
if (resNames == null) {
resNames = "";
i = -1;
continue;
}resNames += " " + name;
}}
if (resNames != null) out.append ("REMARK   6 Jmol residue names").append (resNames).append ("\n");
for (var i = 0; i < properties.length; i++) if (properties[i] != null) out.append ("REMARK   6 Jmol property ").append (properties[i]).append (";\n");

}var strExtra = "";
var atomLast = null;
var ptTemp =  new JU.P3 ();
if (!isPDBFormat) {
if (format == null) format = "%-5i %-10s %-13.5f " + (haveZ ? "%-13.5f %-13.5f" : haveY ? "%-13.5f" : "");
format += "\n";
}for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1), n++) {
var x = dataX[n];
var y = (haveY ? dataY[n] : 0);
var z = (haveZ ? dataZ[n] : 0);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) continue;
var a = atoms[i];
if (isPDBFormat) {
out.append (JM.LabelToken.formatLabelAtomArray (this.vwr, a, tokens, '\0', null, ptTemp));
if (isPDB) bsWritten.set (i);
out.append (JU.PT.sprintf ("%-8.2f%-8.2f%-10.2f    %6.3f          %2s    %s\n", "ssF",  Clazz_newArray (-1, [a.getElementSymbolIso (false).toUpperCase (), strExtra,  Clazz_newFloatArray (-1, [x, y, z, 0])])));
if (atomLast != null && atomLast.group.getBioPolymerIndexInModel () == a.group.getBioPolymerIndexInModel ()) pdbCONECT.append ("CONECT").append (JU.PT.formatStringI ("%5i", "i", atomLast.getAtomNumber ())).append (JU.PT.formatStringI ("%5i", "i", a.getAtomNumber ())).appendC ('\n');
} else if (haveZ) {
out.append (JU.PT.sprintf (format, "isF",  Clazz_newArray (-1, [Integer.$valueOf (a.getAtomNumber ()), a.getAtomName (),  Clazz_newFloatArray (-1, [x, y, z])])));
} else if (haveY) {
out.append (JU.PT.sprintf (format, "isF",  Clazz_newArray (-1, [Integer.$valueOf (a.getAtomNumber ()), a.getAtomName (),  Clazz_newFloatArray (-1, [x, y])])));
} else {
out.append (JU.PT.sprintf (format, "isF",  Clazz_newArray (-1, [Integer.$valueOf (a.getAtomNumber ()), a.getAtomName (),  Clazz_newFloatArray (-1, [x])])));
}atomLast = a;
}
}out.append (pdbCONECT.toString ());
if (isDraw) return out.toString ();
bsSelected.and (bsAtoms);
if (isPDB && addStructure) out.append ("\n\n" + this.vwr.ms.getProteinStructureState (bsWritten, ctype == 'R' ? 4138 : 1073742086));
return out.toString ();
}, "~N,~S,JU.BS,~A,JU.OC,~B");
Clazz_overrideMethod (c$, "getModelCml", 
function (bs, atomsMax, addBonds, doTransform, allTrajectories) {
var sb =  new JU.SB ();
var nAtoms = JU.BSUtil.cardinalityOf (bs);
if (nAtoms == 0) return "";
J.api.Interface.getInterface ("JU.XmlUtil", this.vwr, "file");
JU.XmlUtil.openTag (sb, "molecule");
JU.XmlUtil.openTag (sb, "atomArray");
var bsAtoms =  new JU.BS ();
var atoms = this.vwr.ms.at;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (--atomsMax < 0) break;
var atom = atoms[i];
var name = atom.getAtomName ();
JU.PT.rep (name, "\"", "''");
bsAtoms.set (atom.i);
JU.XmlUtil.appendTag (sb, "atom/",  Clazz_newArray (-1, ["id", "a" + (atom.i + 1), "title", atom.getAtomName (), "elementType", atom.getElementSymbol (), "x3", "" + atom.x, "y3", "" + atom.y, "z3", "" + atom.z]));
}
JU.XmlUtil.closeTag (sb, "atomArray");
if (addBonds) {
JU.XmlUtil.openTag (sb, "bondArray");
var bondCount = this.vwr.ms.bondCount;
var bonds = this.vwr.ms.bo;
for (var i = 0; i < bondCount; i++) {
var bond = bonds[i];
var a1 = bond.atom1;
var a2 = bond.atom2;
if (!bsAtoms.get (a1.i) || !bsAtoms.get (a2.i)) continue;
var order = JU.Edge.getCmlBondOrder (bond.order);
if (order == null) continue;
JU.XmlUtil.appendTag (sb, "bond/",  Clazz_newArray (-1, ["atomRefs2", "a" + (bond.atom1.i + 1) + " a" + (bond.atom2.i + 1), "order", order]));
}
JU.XmlUtil.closeTag (sb, "bondArray");
}JU.XmlUtil.closeTag (sb, "molecule");
return sb.toString ();
}, "JU.BS,~N,~B,~B,~B");
Clazz_defineStatics (c$,
"atomExpression", "<atom selection>");
c$.propertyTypes = c$.prototype.propertyTypes =  Clazz_newArray (-1, ["appletInfo", "", "", "fileName", "", "", "fileHeader", "", "", "fileContents", "<pathname>", "", "fileContents", "", "", "animationInfo", "", "", "modelInfo", "<atom selection>", "{*}", "ligandInfo", "<atom selection>", "{*}", "shapeInfo", "", "", "measurementInfo", "", "", "centerInfo", "", "", "orientationInfo", "", "", "transformInfo", "", "", "", "", "", "atomInfo", "<atom selection>", "(visible)", "bondInfo", "<atom selection>", "(visible)", "chainInfo", "<atom selection>", "(visible)", "polymerInfo", "<atom selection>", "(visible)", "moleculeInfo", "<atom selection>", "(visible)", "stateInfo", "<state type>", "all", "extractModel", "<atom selection>", "(visible)", "jmolStatus", "statusNameList", "", "jmolViewer", "", "", "messageQueue", "", "", "auxiliaryInfo", "<atom selection>", "{*}", "boundBoxInfo", "", "", "dataInfo", "<data type>", "types", "image", "<width=www,height=hhh>", "", "evaluate", "<expression>", "", "menu", "<type>", "current", "minimizationInfo", "", "", "pointGroupInfo", "<atom selection>", "(visible)", "fileInfo", "<type>", "", "errorMessage", "", "", "mouseInfo", "", "", "isosurfaceInfo", "", "", "isosurfaceData", "", "", "consoleText", "", "", "JSpecView", "<key>", "", "scriptQueueInfo", "", "", "nmrInfo", "<elementSymbol> or 'all' or 'shifts'", "all", "variableInfo", "<name>", "all", "domainInfo", "<atom selection>", "{visible}", "validationInfo", "<atom selection>", "{visible}", "service", "<hashTable>", ""]);
Clazz_defineStatics (c$,
"PROP_APPLET_INFO", 0,
"PROP_FILENAME", 1,
"PROP_FILEHEADER", 2,
"PROP_FILECONTENTS_PATH", 3,
"PROP_FILECONTENTS", 4,
"PROP_ANIMATION_INFO", 5,
"PROP_MODEL_INFO", 6,
"PROP_LIGAND_INFO", 7,
"PROP_SHAPE_INFO", 8,
"PROP_MEASUREMENT_INFO", 9,
"PROP_CENTER_INFO", 10,
"PROP_ORIENTATION_INFO", 11,
"PROP_TRANSFORM_INFO", 12,
"PROP_ATOM_INFO", 14,
"PROP_BOND_INFO", 15,
"PROP_CHAIN_INFO", 16,
"PROP_POLYMER_INFO", 17,
"PROP_MOLECULE_INFO", 18,
"PROP_STATE_INFO", 19,
"PROP_EXTRACT_MODEL", 20,
"PROP_JMOL_STATUS", 21,
"PROP_JMOL_VIEWER", 22,
"PROP_MESSAGE_QUEUE", 23,
"PROP_AUXILIARY_INFO", 24,
"PROP_BOUNDBOX_INFO", 25,
"PROP_DATA_INFO", 26,
"PROP_IMAGE", 27,
"PROP_EVALUATE", 28,
"PROP_MENU", 29,
"PROP_MINIMIZATION_INFO", 30,
"PROP_POINTGROUP_INFO", 31,
"PROP_FILE_INFO", 32,
"PROP_ERROR_MESSAGE", 33,
"PROP_MOUSE_INFO", 34,
"PROP_ISOSURFACE_INFO", 35,
"PROP_ISOSURFACE_DATA", 36,
"PROP_CONSOLE_TEXT", 37,
"PROP_JSPECVIEW", 38,
"PROP_SCRIPT_QUEUE_INFO", 39,
"PROP_NMR_INFO", 40,
"PROP_VAR_INFO", 41,
"PROP_DOM_INFO", 42,
"PROP_VAL_INFO", 43,
"PROP_SERVICE", 44,
"PROP_COUNT", 45,
"readableTypes",  Clazz_newArray (-1, ["", "stateinfo", "extractmodel", "filecontents", "fileheader", "image", "menu", "minimizationInfo"]));
});
})(Clazz
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
