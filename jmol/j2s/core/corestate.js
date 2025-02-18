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
Clazz_declarePackage ("JV");
c$ = Clazz_declareType (JV, "JmolStateCreator");
Clazz_declarePackage ("JV");
Clazz_load (["JV.JmolStateCreator", "java.util.Hashtable"], "JV.StateCreator", ["java.lang.Float", "java.util.Arrays", "$.Date", "javajs.awt.Font", "JU.BS", "$.P3", "$.PT", "$.SB", "J.c.PAL", "$.STR", "$.VDW", "JM.Atom", "$.AtomCollection", "$.Bond", "$.BondSet", "JS.T", "J.shape.Shape", "JU.BSUtil", "$.C", "$.ColorEncoder", "$.Edge", "$.Escape", "$.Logger", "JV.GlobalSettings", "$.JC", "$.StateManager", "$.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.temp = null;
this.temp2 = null;
this.temp3 = null;
this.undoWorking = false;
Clazz_instantialize (this, arguments);
}, JV, "StateCreator", JV.JmolStateCreator);
Clazz_prepareFields (c$, function () {
this.temp =  new java.util.Hashtable ();
this.temp2 =  new java.util.Hashtable ();
this.temp3 =  new java.util.Hashtable ();
});
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JV.StateCreator, []);
});
Clazz_overrideMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz_overrideMethod (c$, "getStateScript", 
function (type, width, height) {
var isAll = (type == null || type.equalsIgnoreCase ("all"));
var s =  new JU.SB ();
var sfunc = (isAll ?  new JU.SB ().append ("function _setState() {\n") : null);
if (isAll) {
s.append ("# Jmol state version " + JV.Viewer.getJmolVersion () + ";\n");
if (this.vwr.isApplet) {
this.app (s, "# fullName = " + JU.PT.esc (this.vwr.fullName));
this.app (s, "# documentBase = " + JU.PT.esc (JV.Viewer.appletDocumentBase));
this.app (s, "# codeBase = " + JU.PT.esc (JV.Viewer.appletCodeBase));
s.append ("\n");
}}var global = this.vwr.g;
if (isAll || type.equalsIgnoreCase ("windowState")) s.append (this.getWindowState (sfunc, width, height));
if (isAll || type.equalsIgnoreCase ("fileState")) s.append (this.getFileState (sfunc));
if (isAll || type.equalsIgnoreCase ("definedState")) s.append (this.getDefinedState (sfunc, true));
if (isAll || type.equalsIgnoreCase ("variableState")) s.append (this.getParameterState (global, sfunc));
if (isAll || type.equalsIgnoreCase ("dataState")) s.append (this.getDataState (sfunc));
if (isAll || type.equalsIgnoreCase ("modelState")) s.append (this.getModelState (sfunc, true, this.vwr.getBooleanProperty ("saveProteinStructureState")));
if (isAll || type.equalsIgnoreCase ("colorState")) s.append (this.getColorState (this.vwr.cm, sfunc));
if (isAll || type.equalsIgnoreCase ("frameState")) s.append (this.getAnimState (this.vwr.am, sfunc));
if (isAll || type.equalsIgnoreCase ("perspectiveState")) s.append (this.getViewState (this.vwr.tm, sfunc));
if (isAll || type.equalsIgnoreCase ("selectionState")) s.append (this.getSelectionState (this.vwr.slm, sfunc));
if (sfunc != null) {
this.app (sfunc, "set refreshing true");
this.app (sfunc, "set antialiasDisplay " + global.antialiasDisplay);
this.app (sfunc, "set antialiasTranslucent " + global.antialiasTranslucent);
this.app (sfunc, "set antialiasImages " + global.antialiasImages);
if (this.vwr.tm.spinOn) this.app (sfunc, "spin on");
sfunc.append ("}\n\n_setState;\n");
}if (isAll) s.appendSB (sfunc);
return s.toString ();
}, "~S,~N,~N");
Clazz_defineMethod (c$, "getDataState", 
 function (sfunc) {
var commands =  new JU.SB ();
var haveData = false;
var atomProps = this.getAtomicPropertyState (-1, null);
if (atomProps.length > 0) {
haveData = true;
commands.append (atomProps);
}if (this.vwr.userVdws != null) {
var info = this.vwr.getDefaultVdwNameOrData (0, J.c.VDW.USER, this.vwr.bsUserVdws);
if (info.length > 0) {
haveData = true;
commands.append (info);
}}if (this.vwr.nmrCalculation != null) haveData = new Boolean (haveData | this.vwr.nmrCalculation.getState (commands)).valueOf ();
if (this.vwr.dm != null) haveData = new Boolean (haveData | this.vwr.dm.getDataState (this, commands)).valueOf ();
if (!haveData) return "";
var cmd = "";
if (sfunc != null) {
sfunc.append ("  _setDataState;\n");
cmd = "function _setDataState() {\n";
commands.append ("}\n\n");
}return cmd + commands.toString ();
}, "JU.SB");
Clazz_defineMethod (c$, "getDefinedState", 
 function (sfunc, isAll) {
var ms = this.vwr.ms;
var len = ms.stateScripts.size ();
if (len == 0) return "";
var haveDefs = false;
var commands =  new JU.SB ();
var cmd;
for (var i = 0; i < len; i++) {
var ss = ms.stateScripts.get (i);
if (ss.inDefinedStateBlock && (cmd = ss.toString ()).length > 0) {
this.app (commands, cmd);
haveDefs = true;
}}
if (!haveDefs) return "";
cmd = "";
if (isAll && sfunc != null) {
sfunc.append ("  _setDefinedState;\n");
cmd = "function _setDefinedState() {\n\n";
}if (sfunc != null) commands.append ("\n}\n\n");
return cmd + commands.toString ();
}, "JU.SB,~B");
Clazz_overrideMethod (c$, "getModelState", 
function (sfunc, isAll, withProteinStructure) {
var commands =  new JU.SB ();
if (isAll && sfunc != null) {
sfunc.append ("  _setModelState;\n");
commands.append ("function _setModelState() {\n");
}var cmd;
var ms = this.vwr.ms;
var bonds = ms.bo;
var models = ms.am;
var modelCount = ms.mc;
if (isAll) {
var len = ms.stateScripts.size ();
for (var i = 0; i < len; i++) {
var ss = ms.stateScripts.get (i);
if (!ss.inDefinedStateBlock && (cmd = ss.toString ()).length > 0) {
this.app (commands, cmd);
}}
var sb =  new JU.SB ();
for (var i = 0; i < ms.bondCount; i++) if (!models[bonds[i].atom1.mi].isModelKit) if (bonds[i].isHydrogen () || (bonds[i].order & 131072) != 0) {
var bond = bonds[i];
var index = bond.atom1.i;
if (bond.atom1.group.isAdded (index)) index = -1 - index;
sb.appendI (index).appendC ('\t').appendI (bond.atom2.i).appendC ('\t').appendI (bond.order & -131073).appendC ('\t').appendF (bond.mad / 1000).appendC ('\t').appendF (bond.getEnergy ()).appendC ('\t').append (JU.Edge.getBondOrderNameFromOrder (bond.order)).append (";\n");
}
if (sb.length () > 0) commands.append ("data \"connect_atoms\"\n").appendSB (sb).append ("end \"connect_atoms\";\n");
commands.append ("\n");
}if (ms.haveHiddenBonds) {
var bs =  new JM.BondSet ();
for (var i = ms.bondCount; --i >= 0; ) if (bonds[i].mad != 0 && (bonds[i].shapeVisibilityFlags & JM.Bond.myVisibilityFlag) == 0) bs.set (i);

if (bs.isEmpty ()) ms.haveHiddenBonds = false;
 else commands.append ("  hide ").append (JU.Escape.eBond (bs)).append (";\n");
}this.vwr.setModelVisibility ();
if (withProteinStructure) commands.append (ms.getProteinStructureState (null, isAll ? 1073742327 : 1073742158));
this.getShapeState (commands, isAll, 2147483647);
if (isAll) {
var needOrientations = false;
for (var i = 0; i < modelCount; i++) if (models[i].isJmolDataFrame) {
needOrientations = true;
break;
}
var sb =  new JU.SB ();
for (var i = 0; i < modelCount; i++) {
sb.setLength (0);
var s = ms.getInfo (i, "modelID");
if (s != null && !s.equals (ms.getInfo (i, "modelID0"))) sb.append ("  frame ID ").append (JU.PT.esc (s)).append (";\n");
var t = ms.frameTitles[i];
if (t != null && t.length > 0) sb.append ("  frame title ").append (JU.PT.esc (t)).append (";\n");
if (needOrientations && models[i].orientation != null && !ms.isTrajectorySubFrame (i)) sb.append ("  ").append (models[i].orientation.getMoveToText (false)).append (";\n");
if (models[i].frameDelay != 0 && !ms.isTrajectorySubFrame (i)) sb.append ("  frame delay ").appendF (models[i].frameDelay / 1000).append (";\n");
if (models[i].simpleCage != null) {
sb.append ("  unitcell ").append (JU.Escape.eAP (models[i].simpleCage.getUnitCellVectors ())).append (";\n");
this.getShapeState (sb, isAll, 33);
}if (sb.length () > 0) commands.append ("  frame " + ms.getModelNumberDotted (i) + ";\n").appendSB (sb);
}
var loadUC = false;
if (ms.unitCells != null) {
var haveModulation = false;
for (var i = 0; i < modelCount; i++) {
var symmetry = ms.getUnitCell (i);
if (symmetry == null) continue;
sb.setLength (0);
if (symmetry.getState (sb)) {
loadUC = true;
commands.append ("  frame ").append (ms.getModelNumberDotted (i)).appendSB (sb).append (";\n");
}haveModulation = new Boolean (haveModulation | (this.vwr.ms.getLastVibrationVector (i, 1275072532) >= 0)).valueOf ();
}
if (loadUC) this.vwr.shm.loadShape (33);
this.getShapeState (commands, isAll, 33);
if (haveModulation) {
var temp =  new java.util.Hashtable ();
var ivib;
for (var i = modelCount; --i >= 0; ) {
if ((ivib = this.vwr.ms.getLastVibrationVector (i, 1275072532)) >= 0) for (var j = models[i].firstAtomIndex; j <= ivib; j++) {
var mset = ms.getModulation (j);
if (mset != null) JU.BSUtil.setMapBitSet (temp, j, j, mset.getState ());
}
}
commands.append (this.getCommands (temp, null, "select"));
}}commands.append ("  set fontScaling " + this.vwr.getBoolean (603979845) + ";\n");
}if (sfunc != null) commands.append ("\n}\n\n");
return commands.toString ();
}, "JU.SB,~B,~B");
Clazz_defineMethod (c$, "getShapeState", 
 function (commands, isAll, iShape) {
var shapes = this.vwr.shm.shapes;
if (shapes == null) return;
var cmd;
var shape;
var i;
var imax;
if (iShape == 2147483647) {
i = 0;
imax = 37;
} else {
imax = (i = iShape) + 1;
}for (; i < imax; ++i) if ((shape = shapes[i]) != null && (isAll || i >= 9 && i < 16) && (cmd = shape.getShapeState ()) != null && cmd.length > 1) commands.append (cmd);

commands.append ("  select *;\n");
}, "JU.SB,~B,~N");
Clazz_defineMethod (c$, "getWindowState", 
 function (sfunc, width, height) {
var global = this.vwr.g;
var str =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  initialize;\n  set refreshing false;\n  _setWindowState;\n");
str.append ("\nfunction _setWindowState() {\n");
}if (width != 0) str.append ("# preferredWidthHeight ").appendI (width).append (" ").appendI (height).append (";\n");
str.append ("# width ").appendI (width == 0 ? this.vwr.getScreenWidth () : width).append (";\n# height ").appendI (height == 0 ? this.vwr.getScreenHeight () : height).append (";\n");
this.app (str, "stateVersion = " + JV.JC.versionInt);
this.app (str, "background " + JU.Escape.escapeColor (global.objColors[0]));
for (var i = 1; i < 8; i++) if (global.objColors[i] != 0) this.app (str, JV.StateManager.getObjectNameFromId (i) + "Color = \"" + JU.Escape.escapeColor (global.objColors[i]) + '"');

if (global.backgroundImageFileName != null) {
this.app (str, "background IMAGE " + (global.backgroundImageFileName.startsWith (";base64,") ? "" : "/*file*/") + JU.PT.esc (global.backgroundImageFileName));
}str.append (this.getLightingState (false));
if (sfunc != null) str.append ("}\n\n");
return str.toString ();
}, "JU.SB,~N,~N");
Clazz_overrideMethod (c$, "getLightingState", 
function (isAll) {
var str =  new JU.SB ();
var g = this.vwr.gdata;
this.app (str, "set ambientPercent " + g.getAmbientPercent ());
this.app (str, "set diffusePercent " + g.getDiffusePercent ());
this.app (str, "set specular " + g.getSpecular ());
this.app (str, "set specularPercent " + g.getSpecularPercent ());
this.app (str, "set specularPower " + g.getSpecularPower ());
var se = g.getSpecularExponent ();
var pe = g.getPhongExponent ();
this.app (str, (Math.pow (2, se) == pe ? "set specularExponent " + se : "set phongExponent " + pe));
this.app (str, "set celShading " + g.getCel ());
this.app (str, "set celShadingPower " + g.getCelPower ());
this.app (str, "set zShadePower " + this.vwr.g.zShadePower);
if (isAll) this.getZshadeState (str, this.vwr.tm, true);
return str.toString ();
}, "~B");
Clazz_defineMethod (c$, "getFileState", 
 function (sfunc) {
var commands =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  _setFileState;\n");
commands.append ("function _setFileState() {\n\n");
}if (commands.indexOf ("append") < 0 && this.vwr.getModelSetFileName ().equals ("zapped")) commands.append ("  zap;\n");
this.appendLoadStates (commands);
if (sfunc != null) commands.append ("\n}\n\n");
return commands.toString ();
}, "JU.SB");
Clazz_defineMethod (c$, "appendLoadStates", 
 function (cmds) {
var ligandModelSet = this.vwr.ligandModelSet;
if (ligandModelSet != null) {
for (var key, $key = ligandModelSet.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
var data = this.vwr.ligandModels.get (key + "_data");
if (data != null) cmds.append ("  ").append (JU.Escape.encapsulateData ("ligand_" + key, data.trim () + "\n", 0));
data = this.vwr.ligandModels.get (key + "_file");
if (data != null) cmds.append ("  ").append (JU.Escape.encapsulateData ("file_" + key, data.trim () + "\n", 0));
}
}var commands =  new JU.SB ();
var ms = this.vwr.ms;
var models = ms.am;
var modelCount = ms.mc;
for (var i = 0; i < modelCount; i++) {
if (ms.isJmolDataFrameForModel (i) || ms.isTrajectorySubFrame (i)) continue;
var m = models[i];
var pt = commands.indexOf (m.loadState);
if (pt < 0 || pt != commands.lastIndexOf (m.loadState)) commands.append (models[i].loadState);
if (models[i].isModelKit) {
var bs = ms.getModelAtomBitSetIncludingDeleted (i, false);
if (ms.tainted != null) {
if (ms.tainted[2] != null) ms.tainted[2].andNot (bs);
if (ms.tainted[3] != null) ms.tainted[3].andNot (bs);
}m.loadScript =  new JU.SB ();
this.getInlineData (commands, this.vwr.getModelExtract (bs, false, true, "MOL"), i > 0, null);
} else {
commands.appendSB (m.loadScript);
}}
var s = commands.toString ();
if (s.indexOf ("data \"append ") < 0) {
var i = s.indexOf ("load /*data*/");
var j = s.indexOf ("load /*file*/");
if (j >= 0 && j < i) i = j;
if ((j = s.indexOf ("load \"@")) >= 0 && j < i) i = j;
if (i >= 0) s = s.substring (0, i) + "zap;" + s.substring (i);
}cmds.append (s);
}, "JU.SB");
Clazz_overrideMethod (c$, "getInlineData", 
function (loadScript, strModel, isAppend, loadFilter) {
var tag = (isAppend ? "append" : "model") + " inline";
loadScript.append ("load /*data*/ data \"").append (tag).append ("\"\n").append (strModel).append ("end \"").append (tag).append (loadFilter == null || loadFilter.length == 0 ? "" : " filter" + JU.PT.esc (loadFilter)).append ("\";");
}, "JU.SB,~S,~B,~S");
Clazz_defineMethod (c$, "getColorState", 
 function (cm, sfunc) {
var s =  new JU.SB ();
var n = this.getCEState (cm.ce, s);
if (n > 0 && sfunc != null) sfunc.append ("\n  _setColorState\n");
return (n > 0 && sfunc != null ? "function _setColorState() {\n" + s.append ("}\n\n").toString () : s.toString ());
}, "JV.ColorManager,JU.SB");
Clazz_defineMethod (c$, "getCEState", 
 function (p, s) {
var n = 0;
for (var entry, $entry = p.schemes.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var name = entry.getKey ();
if ( new Boolean (name.length > 0 & n++ >= 0).valueOf ()) s.append ("color \"" + name + "=" + JU.ColorEncoder.getColorSchemeList (entry.getValue ()) + "\";\n");
}
return n;
}, "JU.ColorEncoder,JU.SB");
Clazz_defineMethod (c$, "getAnimState", 
 function (am, sfunc) {
var modelCount = this.vwr.ms.mc;
if (modelCount < 2) return "";
var commands =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  _setFrameState;\n");
commands.append ("function _setFrameState() {\n");
}commands.append ("# frame state;\n");
commands.append ("# modelCount ").appendI (modelCount).append (";\n# first ").append (this.vwr.getModelNumberDotted (0)).append (";\n# last ").append (this.vwr.getModelNumberDotted (modelCount - 1)).append (";\n");
if (am.backgroundModelIndex >= 0) this.app (commands, "set backgroundModel " + this.vwr.getModelNumberDotted (am.backgroundModelIndex));
if (this.vwr.tm.bsFrameOffsets != null) {
this.app (commands, "frame align " + JU.Escape.eBS (this.vwr.tm.bsFrameOffsets));
} else if (this.vwr.ms.translations != null) {
for (var i = modelCount; --i >= 0; ) {
var t = (this.vwr.ms.getTranslation (i));
if (t != null) this.app (commands, "frame " + this.vwr.ms.getModelNumberDotted (i) + " align " + t);
}
}this.app (commands, "frame RANGE " + am.getModelSpecial (-1) + " " + am.getModelSpecial (1));
this.app (commands, "animation DIRECTION " + (am.animationDirection == 1 ? "+1" : "-1"));
this.app (commands, "animation FPS " + am.animationFps);
this.app (commands, "animation MODE " + JS.T.nameOf (am.animationReplayMode) + " " + am.firstFrameDelay + " " + am.lastFrameDelay);
if (am.morphCount > 0) this.app (commands, "animation MORPH " + am.morphCount);
var showModel = true;
if (am.animationFrames != null) {
this.app (commands, "anim frames " + JU.Escape.eAI (am.animationFrames));
var i = am.caf;
this.app (commands, "frame " + (i + 1));
showModel = (am.cmi != am.modelIndexForFrame (i));
}if (showModel) {
var s = am.getModelSpecial (0);
this.app (commands, s.equals ("0") ? "frame *" : "model " + s);
}this.app (commands, "animation " + (!am.animationOn ? "OFF" : am.currentDirection == 1 ? "PLAY" : "PLAYREV"));
if (am.animationOn && am.animationPaused) this.app (commands, "animation PAUSE");
if (sfunc != null) commands.append ("}\n\n");
return commands.toString ();
}, "JV.AnimationManager,JU.SB");
Clazz_defineMethod (c$, "getParameterState", 
 function (global, sfunc) {
var list =  new Array (global.htBooleanParameterFlags.size () + global.htNonbooleanParameterValues.size ());
var commands =  new JU.SB ();
var isState = (sfunc != null);
if (isState) {
sfunc.append ("  _setParameterState;\n");
commands.append ("function _setParameterState() {\n\n");
}var n = 0;
for (var key, $key = global.htBooleanParameterFlags.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (JV.GlobalSettings.doReportProperty (key)) list[n++] = "set " + key + " " + global.htBooleanParameterFlags.get (key);

for (var key, $key = global.htNonbooleanParameterValues.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (JV.GlobalSettings.doReportProperty (key)) {
var value = global.htNonbooleanParameterValues.get (key);
if (key.charAt (0) == '=') {
key = key.substring (1);
} else {
key = (key.indexOf ("default") == 0 ? " " : "") + "set " + key;
value = JU.Escape.e (value);
}list[n++] = key + " " + value;
}
switch (global.axesMode) {
case 603979808:
list[n++] = "set axes unitcell";
break;
case 603979804:
list[n++] = "set axes molecular";
break;
default:
list[n++] = "set axes window";
}
java.util.Arrays.sort (list, 0, n);
for (var i = 0; i < n; i++) if (list[i] != null) this.app (commands, list[i]);

var s = JV.StateManager.getVariableList (global.htUserVariables, 0, false, true);
if (s.length > 0) {
commands.append ("\n#user-defined atom sets; \n");
commands.append (s);
}if (this.vwr.shm.getShape (5) != null) commands.append (this.getDefaultLabelState (this.vwr.shm.shapes[5]));
if (global.haveSetStructureList) {
var slist = global.structureList;
commands.append ("struture HELIX set " + JU.Escape.eAF (slist.get (J.c.STR.HELIX)));
commands.append ("struture SHEET set " + JU.Escape.eAF (slist.get (J.c.STR.SHEET)));
commands.append ("struture TURN set " + JU.Escape.eAF (slist.get (J.c.STR.TURN)));
}if (sfunc != null) commands.append ("\n}\n\n");
return commands.toString ();
}, "JV.GlobalSettings,JU.SB");
Clazz_defineMethod (c$, "getDefaultLabelState", 
 function (l) {
var s =  new JU.SB ().append ("\n# label defaults;\n");
this.app (s, "select none");
this.app (s, J.shape.Shape.getColorCommand ("label", l.defaultPaletteID, l.defaultColix, l.translucentAllowed));
this.app (s, "background label " + J.shape.Shape.encodeColor (l.defaultBgcolix));
this.app (s, "set labelOffset " + JV.JC.getXOffset (l.defaultOffset) + " " + (JV.JC.getYOffset (l.defaultOffset)));
var align = JV.JC.getHorizAlignmentName (l.defaultAlignment);
this.app (s, "set labelAlignment " + (align.length < 5 ? "left" : align));
var pointer = JV.JC.getPointerName (l.defaultPointer);
this.app (s, "set labelPointer " + (pointer.length == 0 ? "off" : pointer));
if ((l.defaultZPos & 32) != 0) this.app (s, "set labelFront");
 else if ((l.defaultZPos & 16) != 0) this.app (s, "set labelGroup");
this.app (s, J.shape.Shape.getFontCommand ("label", javajs.awt.Font.getFont3D (l.defaultFontId)));
return s.toString ();
}, "J.shape.Labels");
Clazz_defineMethod (c$, "getSelectionState", 
 function (sm, sfunc) {
var commands =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  _setSelectionState;\n");
commands.append ("function _setSelectionState() {\n");
}if (this.vwr.ms.trajectory != null) this.app (commands, this.vwr.ms.trajectory.getState ());
var temp =  new java.util.Hashtable ();
var cmd = null;
this.addBs (commands, "hide ", sm.bsHidden);
this.addBs (commands, "subset ", sm.bsSubset);
this.addBs (commands, "delete ", sm.bsDeleted);
this.addBs (commands, "fix ", sm.bsFixed);
temp.put ("-", this.vwr.slm.getSelectedAtomsNoSubset ());
cmd = this.getCommands (temp, null, "select");
if (cmd == null) this.app (commands, "select none");
 else commands.append (cmd);
this.app (commands, "set hideNotSelected " + sm.hideNotSelected);
commands.append (this.vwr.getShapeProperty (1, "selectionState"));
if (this.vwr.getSelectionHalosEnabled ()) this.app (commands, "SelectionHalos ON");
if (sfunc != null) commands.append ("}\n\n");
return commands.toString ();
}, "JV.SelectionManager,JU.SB");
Clazz_defineMethod (c$, "getViewState", 
 function (tm, sfunc) {
var commands =  new JU.SB ();
var moveToText = tm.getMoveToText (0, false);
if (sfunc != null) {
sfunc.append ("  _setPerspectiveState;\n");
commands.append ("function _setPerspectiveState() {\n");
}this.app (commands, "set perspectiveModel " + tm.perspectiveModel);
this.app (commands, "set scaleAngstromsPerInch " + tm.scale3DAngstromsPerInch);
this.app (commands, "set perspectiveDepth " + tm.perspectiveDepth);
this.app (commands, "set visualRange " + tm.visualRangeAngstroms);
if (!tm.isWindowCentered ()) this.app (commands, "set windowCentered false");
this.app (commands, "set cameraDepth " + tm.cameraDepth);
var navigating = (tm.mode == 1);
if (navigating) this.app (commands, "set navigationMode true");
this.app (commands, this.vwr.ms.getBoundBoxCommand (false));
this.app (commands, "center " + JU.Escape.eP (tm.fixedRotationCenter));
commands.append (this.vwr.getOrientationText (1073742035, null));
this.app (commands, moveToText);
if (!navigating && !tm.zoomEnabled) this.app (commands, "zoom off");
commands.append ("  slab ").appendI (tm.slabPercentSetting).append (";depth ").appendI (tm.depthPercentSetting).append (tm.slabEnabled && !navigating ? ";slab on" : "").append (";\n");
commands.append ("  set slabRange ").appendF (tm.slabRange).append (";\n");
if (tm.slabPlane != null) commands.append ("  slab plane ").append (JU.Escape.eP4 (tm.slabPlane)).append (";\n");
if (tm.depthPlane != null) commands.append ("  depth plane ").append (JU.Escape.eP4 (tm.depthPlane)).append (";\n");
this.getZshadeState (commands, tm, false);
commands.append (this.getSpinState (true)).append ("\n");
if (this.vwr.ms.modelSetHasVibrationVectors () && tm.vibrationOn) this.app (commands, "set vibrationPeriod " + tm.vibrationPeriod + ";vibration on");
if (navigating) {
commands.append (tm.getNavigationState ());
if (tm.depthPlane != null || tm.slabPlane != null) commands.append ("  slab on;\n");
}if (sfunc != null) commands.append ("}\n\n");
return commands.toString ();
}, "JV.TransformManager,JU.SB");
Clazz_defineMethod (c$, "getZshadeState", 
 function (s, tm, isAll) {
if (isAll) {
this.app (s, "set zDepth " + tm.zDepthPercentSetting);
this.app (s, "set zSlab " + tm.zSlabPercentSetting);
if (!tm.zShadeEnabled) this.app (s, "set zShade false");
}if (tm.zShadeEnabled) this.app (s, "set zShade true");
try {
if (tm.zSlabPoint != null) this.app (s, "set zSlab " + JU.Escape.eP (tm.zSlabPoint));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "JU.SB,JV.TransformManager,~B");
Clazz_overrideMethod (c$, "getSpinState", 
function (isAll) {
var tm = this.vwr.tm;
var s = "  set spinX " + Clazz_floatToInt (tm.spinX) + "; set spinY " + Clazz_floatToInt (tm.spinY) + "; set spinZ " + Clazz_floatToInt (tm.spinZ) + "; set spinFps " + Clazz_floatToInt (tm.spinFps) + ";";
if (!Float.isNaN (tm.navFps)) s += "  set navX " + Clazz_floatToInt (tm.navX) + "; set navY " + Clazz_floatToInt (tm.navY) + "; set navZ " + Clazz_floatToInt (tm.navZ) + "; set navFps " + Clazz_floatToInt (tm.navFps) + ";";
if (tm.navOn) s += " navigation on;";
if (!tm.spinOn) return s;
var prefix = (tm.isSpinSelected ? "\n  select " + JU.Escape.eBS (this.vwr.bsA ()) + ";\n  rotateSelected" : "\n ");
if (tm.isSpinInternal) {
var pt = JU.P3.newP (tm.internalRotationCenter);
pt.sub (tm.rotationAxis);
s += prefix + " spin " + tm.rotationRate + " " + JU.Escape.eP (tm.internalRotationCenter) + " " + JU.Escape.eP (pt);
} else if (tm.isSpinFixed) {
s += prefix + " spin axisangle " + JU.Escape.eP (tm.rotationAxis) + " " + tm.rotationRate;
} else {
s += " spin on";
}return s + ";";
}, "~B");
Clazz_overrideMethod (c$, "getCommands", 
function (htDefine, htMore, selectCmd) {
var s =  new JU.SB ();
var setPrev = this.getCommands2 (htDefine, s, null, selectCmd);
if (htMore != null) this.getCommands2 (htMore, s, setPrev, "select");
return s.toString ();
}, "java.util.Map,java.util.Map,~S");
Clazz_defineMethod (c$, "getCommands2", 
 function (ht, s, setPrev, selectCmd) {
if (ht == null) return "";
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var set = JU.Escape.eBS (entry.getValue ());
if (set.length < 5) continue;
set = selectCmd + " " + set;
if (!set.equals (setPrev)) this.app (s, set);
setPrev = set;
if (key.indexOf ("-") != 0) this.app (s, key);
}
return setPrev;
}, "java.util.Map,JU.SB,~S,~S");
Clazz_defineMethod (c$, "app", 
 function (s, cmd) {
if (cmd.length != 0) s.append ("  ").append (cmd).append (";\n");
}, "JU.SB,~S");
Clazz_defineMethod (c$, "addBs", 
 function (sb, key, bs) {
if (bs == null || bs.length () == 0) return;
this.app (sb, key + JU.Escape.eBS (bs));
}, "JU.SB,~S,JU.BS");
Clazz_overrideMethod (c$, "getFontState", 
function (myType, font3d) {
var objId = JV.StateManager.getObjectIdFromName (myType.equalsIgnoreCase ("axes") ? "axis" : myType);
if (objId < 0) return "";
var mad = this.vwr.getObjectMad (objId);
var s =  new JU.SB ().append ("\n");
this.app (s, myType + (mad == 0 ? " off" : mad == 1 ? " on" : mad == -1 ? " dotted" : mad < 20 ? " " + mad : " " + (mad / 2000)));
if (s.length () < 3) return "";
var fcmd = J.shape.Shape.getFontCommand (myType, font3d);
if (fcmd.length > 0) fcmd = "  " + fcmd + ";\n";
return (s + fcmd);
}, "~S,javajs.awt.Font");
Clazz_overrideMethod (c$, "getFontLineShapeState", 
function (s, myType, tickInfos) {
var isOff = (s.indexOf (" off") >= 0);
var sb =  new JU.SB ();
sb.append (s);
for (var i = 0; i < 4; i++) if (tickInfos[i] != null) this.appendTickInfo (myType, sb, tickInfos[i]);

if (isOff) sb.append ("  " + myType + " off;\n");
return sb.toString ();
}, "~S,~S,~A");
Clazz_defineMethod (c$, "appendTickInfo", 
 function (myType, sb, t) {
sb.append ("  ");
sb.append (myType);
JV.StateCreator.addTickInfo (sb, t, false);
sb.append (";\n");
}, "~S,JU.SB,JM.TickInfo");
c$.addTickInfo = Clazz_defineMethod (c$, "addTickInfo", 
 function (sb, tickInfo, addFirst) {
sb.append (" ticks ").append (tickInfo.type).append (" ").append (JU.Escape.eP (tickInfo.ticks));
var isUnitCell = (tickInfo.scale != null && Float.isNaN (tickInfo.scale.x));
if (isUnitCell) sb.append (" UNITCELL");
if (tickInfo.tickLabelFormats != null) sb.append (" format ").append (JU.Escape.eAS (tickInfo.tickLabelFormats, false));
if (!isUnitCell && tickInfo.scale != null) sb.append (" scale ").append (JU.Escape.eP (tickInfo.scale));
if (addFirst && !Float.isNaN (tickInfo.first) && tickInfo.first != 0) sb.append (" first ").appendF (tickInfo.first);
if (tickInfo.reference != null) sb.append (" point ").append (JU.Escape.eP (tickInfo.reference));
}, "JU.SB,JM.TickInfo,~B");
Clazz_overrideMethod (c$, "getShapeSetState", 
function (as, shape, monomerCount, monomers, bsSizeDefault, temp, temp2) {
var type = JV.JC.shapeClassBases[shape.shapeID];
for (var i = 0; i < monomerCount; i++) {
var atomIndex1 = monomers[i].firstAtomIndex;
var atomIndex2 = monomers[i].lastAtomIndex;
if (as.bsSizeSet != null && (as.bsSizeSet.get (i) || as.bsColixSet != null && as.bsColixSet.get (i))) {
if (bsSizeDefault.get (i)) {
JU.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + (as.bsSizeSet.get (i) ? " on" : " off"));
} else {
JU.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + " " + JU.PT.escF (as.mads[i] / 2000));
}}if (as.bsColixSet != null && as.bsColixSet.get (i)) JU.BSUtil.setMapBitSet (temp2, atomIndex1, atomIndex2, J.shape.Shape.getColorCommand (type, as.paletteIDs[i], as.colixes[i], shape.translucentAllowed));
}
}, "J.shape.AtomShape,J.shape.Shape,~N,~A,JU.BS,java.util.Map,java.util.Map");
Clazz_overrideMethod (c$, "getMeasurementState", 
function (shape, mList, measurementCount, font3d, ti) {
var commands =  new JU.SB ();
this.app (commands, "measures delete");
for (var i = 0; i < measurementCount; i++) {
var m = mList.get (i);
var count = m.count;
var sb =  new JU.SB ().append ("measure");
if (m.thisID != null) sb.append (" ID ").append (JU.PT.esc (m.thisID));
if (m.mad != 0) sb.append (" radius ").appendF (m.thisID == null || m.mad > 0 ? m.mad / 2000 : 0);
if (m.colix != 0) sb.append (" color ").append (JU.Escape.escapeColor (JU.C.getArgb (m.colix)));
if (m.text != null) {
sb.append (" font ").append (m.text.font.getInfo ());
if (m.text.pymolOffset != null) sb.append (" offset ").append (JU.Escape.eAF (m.text.pymolOffset));
}var tickInfo = m.tickInfo;
if (tickInfo != null) JV.StateCreator.addTickInfo (sb, tickInfo, true);
for (var j = 1; j <= count; j++) sb.append (" ").append (m.getLabel (j, true, true));

sb.append ("; # " + shape.getInfoAsString (i));
this.app (commands, sb.toString ());
}
this.app (commands, "select *; set measures " + this.vwr.g.measureDistanceUnits);
this.app (commands, J.shape.Shape.getFontCommand ("measures", font3d));
var nHidden = 0;
var temp =  new java.util.Hashtable ();
var bs = JU.BS.newN (measurementCount);
for (var i = 0; i < measurementCount; i++) {
var m = mList.get (i);
if (m.isHidden) {
nHidden++;
bs.set (i);
}if (shape.bsColixSet != null && shape.bsColixSet.get (i)) JU.BSUtil.setMapBitSet (temp, i, i, J.shape.Shape.getColorCommandUnk ("measure", m.colix, shape.translucentAllowed));
if (m.strFormat != null) JU.BSUtil.setMapBitSet (temp, i, i, "measure " + JU.PT.esc (m.strFormat));
}
if (nHidden > 0) if (nHidden == measurementCount) this.app (commands, "measures off; # lines and numbers off");
 else for (var i = 0; i < measurementCount; i++) if (bs.get (i)) JU.BSUtil.setMapBitSet (temp, i, i, "measure off");

if (ti != null) {
commands.append (" measure ");
JV.StateCreator.addTickInfo (commands, ti, true);
commands.append (";\n");
}if (shape.mad >= 0) commands.append (" set measurements " + (shape.mad / 2000)).append (";\n");
var s = this.getCommands (temp, null, "select measures");
if (s != null && s.length != 0) {
commands.append (s);
this.app (commands, "select measures ({null})");
}return commands.toString ();
}, "J.shape.Measures,JU.Lst,~N,javajs.awt.Font,JM.TickInfo");
Clazz_overrideMethod (c$, "getBondState", 
function (shape, bsOrderSet, reportAll) {
this.clearTemp ();
var modelSet = this.vwr.ms;
var haveTainted = false;
var bonds = modelSet.bo;
var bondCount = modelSet.bondCount;
var r;
if (reportAll || shape.bsSizeSet != null) {
var i0 = (reportAll ? bondCount - 1 : shape.bsSizeSet.nextSetBit (0));
for (var i = i0; i >= 0; i = (reportAll ? i - 1 : shape.bsSizeSet.nextSetBit (i + 1))) JU.BSUtil.setMapBitSet (this.temp, i, i, "wireframe " + ((r = bonds[i].mad) == 1 ? "on" : "" + (r / 2000)));

}if (reportAll || bsOrderSet != null) {
var i0 = (reportAll ? bondCount - 1 : bsOrderSet.nextSetBit (0));
for (var i = i0; i >= 0; i = (reportAll ? i - 1 : bsOrderSet.nextSetBit (i + 1))) {
var bond = bonds[i];
if (reportAll || (bond.order & 131072) == 0) JU.BSUtil.setMapBitSet (this.temp, i, i, "bondOrder " + JU.Edge.getBondOrderNameFromOrder (bond.order));
}
}if (shape.bsColixSet != null) for (var i = shape.bsColixSet.nextSetBit (0); i >= 0; i = shape.bsColixSet.nextSetBit (i + 1)) {
var colix = bonds[i].colix;
if ((colix & -30721) == 2) JU.BSUtil.setMapBitSet (this.temp, i, i, J.shape.Shape.getColorCommand ("bonds", J.c.PAL.CPK.id, colix, shape.translucentAllowed));
 else JU.BSUtil.setMapBitSet (this.temp, i, i, J.shape.Shape.getColorCommandUnk ("bonds", colix, shape.translucentAllowed));
}
var s = this.getCommands (this.temp, null, "select BONDS") + "\n" + (haveTainted ? this.getCommands (this.temp2, null, "select BONDS") + "\n" : "");
this.clearTemp ();
return s;
}, "J.shape.Shape,JU.BS,~B");
Clazz_defineMethod (c$, "clearTemp", 
 function () {
this.temp.clear ();
this.temp2.clear ();
});
Clazz_overrideMethod (c$, "getAtomShapeSetState", 
function (shape, bioShapes) {
this.clearTemp ();
for (var i = bioShapes.length; --i >= 0; ) {
var bs = bioShapes[i];
if (bs.monomerCount > 0) {
if (!bs.isActive || bs.bsSizeSet == null && bs.bsColixSet == null) continue;
this.vwr.getShapeSetState (bs, shape, bs.monomerCount, bs.getMonomers (), bs.bsSizeDefault, this.temp, this.temp2);
}}
var s = "\n" + this.getCommands (this.temp, this.temp2, shape.shapeID == 9 ? "Backbone" : "select");
this.clearTemp ();
return s;
}, "J.shape.Shape,~A");
Clazz_defineMethod (c$, "getShapeState", 
function (shape) {
var s;
switch (shape.shapeID) {
case 31:
var es = shape;
var sb =  new JU.SB ();
sb.append ("\n  set echo off;\n");
for (var t, $t = es.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) {
sb.append (this.getTextState (t));
if (t.hidden) sb.append ("  set echo ID ").append (JU.PT.esc (t.target)).append (" hidden;\n");
}
s = sb.toString ();
break;
case 8:
var hs = shape;
s = this.getAtomShapeState (hs) + (hs.colixSelection == 2 ? "" : hs.colixSelection == 0 ? "  color SelectionHalos NONE;\n" : J.shape.Shape.getColorCommandUnk ("selectionHalos", hs.colixSelection, hs.translucentAllowed) + ";\n");
if (hs.bsHighlight != null) s += "  set highlight " + JU.Escape.eBS (hs.bsHighlight) + "; " + J.shape.Shape.getColorCommandUnk ("highlight", hs.colixHighlight, hs.translucentAllowed) + ";\n";
break;
case 35:
this.clearTemp ();
var h = shape;
if (h.atomFormats != null) for (var i = this.vwr.ms.ac; --i >= 0; ) if (h.atomFormats[i] != null) JU.BSUtil.setMapBitSet (this.temp, i, i, "set hoverLabel " + JU.PT.esc (h.atomFormats[i]));

s = "\n  hover " + JU.PT.esc ((h.labelFormat == null ? "" : h.labelFormat)) + ";\n" + this.getCommands (this.temp, null, "select");
this.clearTemp ();
break;
case 5:
this.clearTemp ();
var l = shape;
for (var i = l.bsSizeSet.nextSetBit (0); i >= 0; i = l.bsSizeSet.nextSetBit (i + 1)) {
var t = l.getLabel (i);
var cmd = "label ";
if (t == null) {
cmd += JU.PT.esc (l.formats[i]);
} else {
cmd += JU.PT.esc (t.textUnformatted);
if (t.pymolOffset != null) cmd += ";set labelOffset " + JU.Escape.eAF (t.pymolOffset);
}JU.BSUtil.setMapBitSet (this.temp, i, i, cmd);
if (l.bsColixSet != null && l.bsColixSet.get (i)) JU.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getColorCommand ("label", l.paletteIDs[i], l.colixes[i], l.translucentAllowed));
if (l.bsBgColixSet != null && l.bsBgColixSet.get (i)) JU.BSUtil.setMapBitSet (this.temp2, i, i, "background label " + J.shape.Shape.encodeColor (l.bgcolixes[i]));
var text = l.getLabel (i);
var sppm = (text != null ? text.scalePixelsPerMicron : 0);
if (sppm > 0) JU.BSUtil.setMapBitSet (this.temp2, i, i, "set labelScaleReference " + (10000 / sppm));
if (l.offsets != null && l.offsets.length > i) {
var offsetFull = l.offsets[i];
JU.BSUtil.setMapBitSet (this.temp2, i, i, "set " + (JV.JC.isOffsetAbsolute (offsetFull) ? "labelOffsetAbsolute " : "labelOffset ") + JV.JC.getXOffset (offsetFull) + " " + JV.JC.getYOffset (offsetFull));
var align = JV.JC.getHorizAlignmentName (offsetFull >> 2);
var pointer = JV.JC.getPointerName (offsetFull);
if (pointer.length > 0) JU.BSUtil.setMapBitSet (this.temp2, i, i, "set labelPointer " + pointer);
if ((offsetFull & 32) != 0) JU.BSUtil.setMapBitSet (this.temp2, i, i, "set labelFront");
 else if ((offsetFull & 16) != 0) JU.BSUtil.setMapBitSet (this.temp2, i, i, "set labelGroup");
if (align.length > 0) JU.BSUtil.setMapBitSet (this.temp3, i, i, "set labelAlignment " + align);
}if (l.mads != null && l.mads[i] < 0) JU.BSUtil.setMapBitSet (this.temp2, i, i, "set toggleLabel");
if (l.bsFontSet != null && l.bsFontSet.get (i)) JU.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getFontCommand ("label", javajs.awt.Font.getFont3D (l.fids[i])));
}
s = this.getCommands (this.temp, this.temp2, "select") + this.getCommands (null, this.temp3, "select");
this.temp3.clear ();
this.clearTemp ();
break;
case 0:
this.clearTemp ();
var ac = this.vwr.ms.ac;
var atoms = this.vwr.ms.at;
var balls = shape;
var colixes = balls.colixes;
var pids = balls.paletteIDs;
var r = 0;
for (var i = 0; i < ac; i++) {
if (shape.bsSizeSet != null && shape.bsSizeSet.get (i)) {
if ((r = atoms[i].madAtom) < 0) JU.BSUtil.setMapBitSet (this.temp, i, i, "Spacefill on");
 else JU.BSUtil.setMapBitSet (this.temp, i, i, "Spacefill " + (r / 2000));
}if (shape.bsColixSet != null && shape.bsColixSet.get (i)) {
var pid = atoms[i].paletteID;
if (pid != J.c.PAL.CPK.id || JU.C.isColixTranslucent (atoms[i].colixAtom)) JU.BSUtil.setMapBitSet (this.temp, i, i, J.shape.Shape.getColorCommand ("atoms", pid, atoms[i].colixAtom, shape.translucentAllowed));
if (colixes != null && i < colixes.length) JU.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getColorCommand ("balls", pids[i], colixes[i], shape.translucentAllowed));
}}
s = this.getCommands (this.temp, this.temp2, "select");
this.clearTemp ();
break;
default:
s = "";
}
return s;
}, "J.shape.Shape");
Clazz_defineMethod (c$, "getTextState", 
 function (t) {
var s =  new JU.SB ();
var text = t.getText ();
if (text == null || t.isLabelOrHover || t.target.equals ("error")) return "";
var isImage = (t.image != null);
var strOff = null;
var echoCmd = "set echo ID " + JU.PT.esc (t.target);
switch (t.valign) {
case 3:
if (t.movableXPercent == 2147483647 || t.movableYPercent == 2147483647) {
strOff = (t.movableXPercent == 2147483647 ? t.movableX + " " : t.movableXPercent + "% ") + (t.movableYPercent == 2147483647 ? t.movableY + "" : t.movableYPercent + "%");
} else {
strOff = "[" + t.movableXPercent + " " + t.movableYPercent + "%]";
}case 4:
if (strOff == null) strOff = JU.Escape.eP (t.xyz);
s.append ("  ").append (echoCmd).append (" ").append (strOff);
if (t.align != 4) s.append (";  ").append (echoCmd).append (" ").append (JV.JC.getHorizAlignmentName (t.align));
break;
default:
s.append ("  set echo ").append (JV.JC.getEchoName (t.valign)).append (" ").append (JV.JC.getHorizAlignmentName (t.align));
}
if (t.movableZPercent != 2147483647) s.append (";  ").append (echoCmd).append (" depth ").appendI (t.movableZPercent);
if (isImage) s.append ("; ").append (echoCmd).append (" IMAGE /*file*/");
 else s.append ("; echo ");
s.append (JU.PT.esc (text));
s.append (";\n");
if (isImage && t.imageScale != 1) s.append ("  ").append (echoCmd).append (" scale ").appendF (t.imageScale).append (";\n");
if (t.script != null) s.append ("  ").append (echoCmd).append (" script ").append (JU.PT.esc (t.script)).append (";\n");
if (t.modelIndex >= 0) s.append ("  ").append (echoCmd).append (" model ").append (this.vwr.getModelNumberDotted (t.modelIndex)).append (";\n");
if (t.pointerPt != null) {
s.append ("  ").append (echoCmd).append (" point ").append (Clazz_instanceOf (t.pointerPt, JM.Atom) ? "({" + (t.pointerPt).i + "})" : JU.Escape.eP (t.pointerPt)).append (";\n");
}t.appendFontCmd (s);
s.append ("; color echo");
if (JU.C.isColixTranslucent (t.colix)) s.append (JU.C.getColixTranslucencyLabel (t.colix));
s.append (" ").append (JU.C.getHexCode (t.colix));
if (t.bgcolix != 0) {
s.append ("; color echo background ");
if (JU.C.isColixTranslucent (t.bgcolix)) s.append (JU.C.getColixTranslucencyLabel (t.bgcolix)).append (" ");
s.append (JU.C.getHexCode (t.bgcolix));
}s.append (";\n");
return s.toString ();
}, "JM.Text");
Clazz_overrideMethod (c$, "getAllSettings", 
function (prefix) {
var g = this.vwr.g;
var commands =  new JU.SB ();
var list =  new Array (g.htBooleanParameterFlags.size () + g.htNonbooleanParameterValues.size () + g.htUserVariables.size ());
var n = 0;
var _prefix = "_" + prefix;
for (var key, $key = g.htBooleanParameterFlags.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (prefix == null || key.indexOf (prefix) == 0 || key.indexOf (_prefix) == 0) list[n++] = (key.indexOf ("_") == 0 ? key + " = " : "set " + key + " ") + g.htBooleanParameterFlags.get (key);
}
for (var key, $key = g.htNonbooleanParameterValues.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (key.charAt (0) != '@' && (prefix == null || key.indexOf (prefix) == 0 || key.indexOf (_prefix) == 0)) {
var value = g.htNonbooleanParameterValues.get (key);
if (Clazz_instanceOf (value, String)) value = JV.StateCreator.chop (JU.PT.esc (value));
list[n++] = (key.indexOf ("_") == 0 ? key + " = " : "set " + key + " ") + value;
}}
for (var key, $key = g.htUserVariables.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (prefix == null || key.indexOf (prefix) == 0) {
var value = g.htUserVariables.get (key);
var s = value.escape ();
list[n++] = key + " " + (key.startsWith ("@") ? "" : "= ") + (value.tok == 4 ? JV.StateCreator.chop (JU.PT.esc (s)) : s);
}}
java.util.Arrays.sort (list, 0, n);
for (var i = 0; i < n; i++) if (list[i] != null) this.app (commands, list[i]);

commands.append ("\n");
return commands.toString ();
}, "~S");
c$.chop = Clazz_defineMethod (c$, "chop", 
 function (s) {
var len = s.length;
if (len < 512) return s;
var sb =  new JU.SB ();
var sep = "\"\\\n    + \"";
var pt = 0;
for (var i = 72; i < len; pt = i, i += 72) {
while (s.charAt (i - 1) == '\\') i++;

sb.append ((pt == 0 ? "" : sep)).append (s.substring (pt, i));
}
sb.append (sep).append (s.substring (pt, len));
return sb.toString ();
}, "~S");
Clazz_overrideMethod (c$, "getAtomShapeState", 
function (shape) {
this.clearTemp ();
var type = JV.JC.shapeClassBases[shape.shapeID];
var isVector = (shape.shapeID == 18);
var mad;
if (shape.bsSizeSet != null) for (var i = shape.bsSizeSet.nextSetBit (0); i >= 0; i = shape.bsSizeSet.nextSetBit (i + 1)) JU.BSUtil.setMapBitSet (this.temp, i, i, type + " " + ((mad = shape.mads[i]) < 0 ? (isVector && mad < -1 ? "" + -mad : "on") : JU.PT.escF (mad / 2000)));

if (shape.bsColixSet != null) for (var i = shape.bsColixSet.nextSetBit (0); i >= 0; i = shape.bsColixSet.nextSetBit (i + 1)) JU.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getColorCommand (type, shape.paletteIDs[i], shape.colixes[i], shape.translucentAllowed));

var s = this.getCommands (this.temp, this.temp2, "select");
this.clearTemp ();
return s;
}, "J.shape.AtomShape");
Clazz_overrideMethod (c$, "getFunctionCalls", 
function (f) {
if (f == null) f = "";
var s =  new JU.SB ();
var pt = f.indexOf ("*");
var isGeneric = (pt >= 0);
var isStatic = (f.indexOf ("static_") == 0);
var namesOnly = (f.equalsIgnoreCase ("names") || f.equalsIgnoreCase ("static_names"));
if (namesOnly) f = "";
if (isGeneric) f = f.substring (0, pt);
f = f.toLowerCase ();
if (isStatic || f.length == 0) this.addFunctions (s, JV.Viewer.staticFunctions, f, isGeneric, namesOnly);
if (!isStatic || f.length == 0) this.addFunctions (s, this.vwr.localFunctions, f, isGeneric, namesOnly);
return s.toString ();
}, "~S");
Clazz_defineMethod (c$, "addFunctions", 
 function (s, ht, selectedFunction, isGeneric, namesOnly) {
var names =  new Array (ht.size ());
var n = 0;
for (var name, $name = ht.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) if (selectedFunction.length == 0 && !name.startsWith ("_") || name.equalsIgnoreCase (selectedFunction) || isGeneric && name.toLowerCase ().indexOf (selectedFunction) == 0) names[n++] = name;

java.util.Arrays.sort (names, 0, n);
for (var i = 0; i < n; i++) {
var f = ht.get (names[i]);
s.append (namesOnly ? f.getSignature () : f.toString ());
s.appendC ('\n');
}
}, "JU.SB,java.util.Map,~S,~B,~B");
c$.isTainted = Clazz_defineMethod (c$, "isTainted", 
 function (tainted, atomIndex, type) {
return (tainted != null && tainted[type] != null && tainted[type].get (atomIndex));
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "getAtomicPropertyState", 
function (taintWhat, bsSelected) {
if (!this.vwr.g.preserveState) return "";
var bs;
var commands =  new JU.SB ();
for (var type = 0; type < 16; type++) if (taintWhat < 0 || type == taintWhat) if ((bs = (bsSelected != null ? bsSelected : this.vwr.ms.getTaintedAtoms (type))) != null) this.getAtomicPropertyStateBuffer (commands, type, bs, null, null);

return commands.toString ();
}, "~N,JU.BS");
Clazz_overrideMethod (c$, "getAtomicPropertyStateBuffer", 
function (commands, type, bs, label, fData) {
if (!this.vwr.g.preserveState) return;
var s =  new JU.SB ();
var dataLabel = (label == null ? JM.AtomCollection.userSettableValues[type] : label) + " set";
var n = 0;
var isDefault = (type == 2);
var atoms = this.vwr.ms.at;
var tainted = this.vwr.ms.tainted;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (atoms[i].isDeleted ()) continue;
s.appendI (i + 1).append (" ").append (atoms[i].getElementSymbol ()).append (" ").append (atoms[i].getInfo ().$replace (' ', '_')).append (" ");
switch (type) {
case 16:
if (i < fData.length) s.appendF (fData[i]);
break;
case 13:
s.appendI (atoms[i].getAtomNumber ());
break;
case 15:
s.appendI (atoms[i].group.getResno ());
break;
case 14:
s.appendI (atoms[i].getSeqID ());
break;
case 0:
s.append (atoms[i].getAtomName ());
break;
case 1:
s.append (atoms[i].getAtomType ());
break;
case 2:
if (JV.StateCreator.isTainted (tainted, i, 2)) isDefault = false;
s.appendF (atoms[i].x).append (" ").appendF (atoms[i].y).append (" ").appendF (atoms[i].z);
break;
case 12:
var v = atoms[i].getVibrationVector ();
if (v == null) s.append ("0 0 0");
 else if (Float.isNaN (v.modScale)) s.appendF (v.x).append (" ").appendF (v.y).append (" ").appendF (v.z);
 else s.appendF (1.4E-45).append (" ").appendF (1.4E-45).append (" ").appendF (v.modScale);
break;
case 3:
s.appendI (atoms[i].getAtomicAndIsotopeNumber ());
break;
case 4:
s.appendI (atoms[i].getFormalCharge ());
break;
case 6:
s.appendF (atoms[i].getBondingRadius ());
break;
case 7:
s.appendI (atoms[i].getOccupancy100 ());
break;
case 8:
s.appendF (atoms[i].getPartialCharge ());
break;
case 9:
s.appendF (atoms[i].getBfactor100 () / 100);
break;
case 10:
s.appendI (atoms[i].getValence ());
break;
case 11:
s.appendF (atoms[i].getVanderwaalsRadiusFloat (this.vwr, J.c.VDW.AUTO));
break;
}
s.append (" ;\n");
++n;
}
if (n == 0) return;
if (isDefault) dataLabel += "(default)";
commands.append ("\n  DATA \"" + dataLabel + "\"\n").appendI (n).append (" ;\nJmol Property Data Format 1 -- Jmol ").append (JV.Viewer.getJmolVersion ()).append (";\n");
commands.appendSB (s);
commands.append ("  end \"" + dataLabel + "\";\n");
}, "JU.SB,~N,JU.BS,~S,~A");
Clazz_overrideMethod (c$, "undoMoveAction", 
function (action, n) {
switch (action) {
case 4165:
case 4139:
switch (n) {
case -2:
this.vwr.undoClear ();
break;
case -1:
(action == 4165 ? this.vwr.actionStates : this.vwr.actionStatesRedo).clear ();
break;
case 0:
n = 2147483647;
default:
if (n > 100) n = (action == 4165 ? this.vwr.actionStates : this.vwr.actionStatesRedo).size ();
for (var i = 0; i < n; i++) this.undoMoveActionClear (0, action, true);

}
break;
}
}, "~N,~N");
Clazz_overrideMethod (c$, "undoMoveActionClear", 
function (taintedAtom, type, clearRedo) {
if (!this.vwr.g.preserveState) return;
var modelIndex = (taintedAtom >= 0 ? this.vwr.ms.at[taintedAtom].mi : this.vwr.ms.mc - 1);
switch (type) {
case 4139:
case 4165:
this.vwr.stopMinimization ();
var s = "";
var list1;
var list2;
switch (type) {
default:
case 4165:
list1 = this.vwr.actionStates;
list2 = this.vwr.actionStatesRedo;
break;
case 4139:
list1 = this.vwr.actionStatesRedo;
list2 = this.vwr.actionStates;
if (this.vwr.actionStatesRedo.size () == 1) return;
break;
}
if (list1.size () == 0 || this.undoWorking) return;
this.undoWorking = true;
list2.add (0, list1.remove (0));
s = this.vwr.actionStatesRedo.get (0);
if (type == 4165 && list2.size () == 1) {
var pt =  Clazz_newIntArray (-1, [1]);
type = JU.PT.parseIntNext (s, pt);
taintedAtom = JU.PT.parseIntNext (s, pt);
this.undoMoveActionClear (taintedAtom, type, false);
}if (this.vwr.ms.am[modelIndex].isModelKit || s.indexOf ("zap ") < 0) {
if (JU.Logger.debugging) this.vwr.log (s);
this.vwr.evalStringQuiet (s);
} else {
this.vwr.actionStates.clear ();
}break;
default:
if (this.undoWorking && clearRedo) return;
this.undoWorking = true;
var bs;
var sb =  new JU.SB ();
sb.append ("#" + type + " " + taintedAtom + " " + ( new java.util.Date ()) + "\n");
if (taintedAtom >= 0) {
bs = this.vwr.getModelUndeletedAtomsBitSet (modelIndex);
this.vwr.ms.taintAtoms (bs, type);
sb.append (this.getAtomicPropertyState (-1, null));
} else {
bs = this.vwr.getModelUndeletedAtomsBitSet (modelIndex);
sb.append ("zap ");
sb.append (JU.Escape.eBS (bs)).append (";");
this.getInlineData (sb, this.vwr.getModelExtract (bs, false, true, "MOL"), true, null);
sb.append ("set refreshing false;").append (this.vwr.acm.getPickingState ()).append (this.vwr.tm.getMoveToText (0, false)).append ("set refreshing true;");
}if (clearRedo) {
this.vwr.actionStates.add (0, sb.toString ());
this.vwr.actionStatesRedo.clear ();
} else {
this.vwr.actionStatesRedo.add (1, sb.toString ());
}if (this.vwr.actionStates.size () == 100) {
this.vwr.actionStates.remove (99);
}}
this.undoWorking = !clearRedo;
}, "~N,~N,~B");
Clazz_overrideMethod (c$, "syncScript", 
function (script, applet, port) {
var sm = this.vwr.sm;
if ("GET_GRAPHICS".equalsIgnoreCase (script)) {
sm.setSyncDriver (5);
sm.syncSend (script, applet, 0);
this.vwr.setBooleanProperty ("_syncMouse", false);
this.vwr.setBooleanProperty ("_syncScript", false);
return;
}if ("=".equals (applet)) {
applet = "~";
sm.setSyncDriver (2);
}var disableSend = "~".equals (applet);
if (port > 0 || !disableSend && !".".equals (applet)) {
sm.syncSend (script, applet, port);
if (!"*".equals (applet) || script.startsWith ("{")) return;
}if (script.equalsIgnoreCase ("on") || script.equalsIgnoreCase ("true")) {
sm.setSyncDriver (1);
return;
}if (script.equalsIgnoreCase ("off") || script.equalsIgnoreCase ("false")) {
sm.setSyncDriver (0);
return;
}if (script.equalsIgnoreCase ("slave")) {
sm.setSyncDriver (2);
return;
}var syncMode = sm.getSyncMode ();
if (syncMode == 0) return;
if (syncMode != 1) disableSend = false;
if (JU.Logger.debugging) JU.Logger.debug (this.vwr.htmlName + " syncing with script: " + script);
if (disableSend) sm.setSyncDriver (3);
if (script.indexOf ("Mouse: ") != 0) {
var serviceMode = JV.JC.getServiceCommand (script);
switch (serviceMode) {
case 63:
case 35:
case 42:
case 49:
case 56:
sm.syncSend (script, ".", port);
return;
case -1:
break;
case 0:
case 28:
if (disableSend) return;
case 21:
case 7:
case 14:
if ((script = this.vwr.getJSV ().processSync (script, serviceMode)) == null) return;
}
this.vwr.evalStringQuietSync (script, true, false);
return;
}this.mouseScript (script);
if (disableSend) this.vwr.setSyncDriver (4);
}, "~S,~S,~N");
Clazz_overrideMethod (c$, "mouseScript", 
function (script) {
var tokens = JU.PT.getTokens (script);
var key = tokens[1];
try {
key = (key.toLowerCase () + "...............").substring (0, 15);
switch (("zoombyfactor...zoomby.........rotatezby......rotatexyby.....translatexyby..rotatemolecule.spinxyby.......rotatearcball..").indexOf (key)) {
case 0:
switch (tokens.length) {
case 3:
this.vwr.zoomByFactor (JU.PT.parseFloat (tokens[2]), 2147483647, 2147483647);
return;
case 5:
this.vwr.zoomByFactor (JU.PT.parseFloat (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseInt (tokens[4]));
return;
}
break;
case 15:
switch (tokens.length) {
case 3:
this.vwr.zoomBy (JU.PT.parseInt (tokens[2]));
return;
}
break;
case 30:
switch (tokens.length) {
case 3:
this.vwr.rotateZBy (JU.PT.parseInt (tokens[2]), 2147483647, 2147483647);
return;
case 5:
this.vwr.rotateZBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseInt (tokens[4]));
}
break;
case 45:
this.vwr.rotateXYBy (JU.PT.parseFloat (tokens[2]), JU.PT.parseFloat (tokens[3]));
return;
case 60:
this.vwr.translateXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]));
return;
case 75:
this.vwr.rotateSelected (JU.PT.parseFloat (tokens[2]), JU.PT.parseFloat (tokens[3]), null);
return;
case 90:
this.vwr.spinXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseFloat (tokens[4]));
return;
case 105:
this.vwr.rotateXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]));
return;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.vwr.showString ("error reading SYNC command: " + script, false);
}, "~S");
Clazz_defineStatics (c$,
"MAX_ACTION_UNDO", 100);
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
