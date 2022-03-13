// Blockly.ContextMenuTegistry.registry.unregister('blockHelp');
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var demoWorkspace;





function loadBlockly() {
  document.getElementById("buttonSave").disabled = false;
  document.getElementById("buttonRun").disabled = false;
  var tb;
  var ws;
  try{tb = check['exercise_1_toolbox']}
  catch(error){
    tb = toolbox_1;
    console.log(error);
    console.log('hier')
}

try{ws = check['exercise_1_workspace']}
catch(error){ws = workspace_1}

demoWorkspace = Blockly.inject('blocklyDiv', {toolbox: tb ,trashcan:true, move:{
    scrollbars: {
      horizontal: true,
      vertical: true
    },
    drag: true,
    wheel: false}
});

Blockly.serialization.workspaces.load(ws, demoWorkspace);
document.getElementById("buttonLoad").disabled = true;

var onResize = function(e) {
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(demoWorkspace);
};
window.addEventListener('resize', onResize, false);
onResize();
Blockly.svgResize(demoWorkspace);
Blockly.ContextMenuRegistry.registry.unregister('blockHelp');
}


function runCode() {
// Generate JavaScript code and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
  'if (--window.LoopTrap === 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}

function saveWorkspace(){
  var json = Blockly.serialization.workspaces.save(demoWorkspace);
  var str = JSON.stringify(json);
  console.log(str);
  return_saved_workspace(str);
  /*var str = JSON.stringify(json)
  return_saved_workspace(str);*/
}

function reloadWebpage(){
  reload_webpage();
}
