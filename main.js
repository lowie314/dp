// Blockly.ContextMenuTegistry.registry.unregister('blockHelp');
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var demoWorkspace;
var toolboxExercise;





function loadBlockly() {
  document.getElementById("buttonSave").disabled = false;
  document.getElementById("buttonRun").disabled = false;
  var workspaceExercise;

  
  try{toolboxExercise= loadedData['toolbox']}
  catch(error){
    toolboxExercise= toolbox_1;
    //console.log(error);
    //console.log('hier')
}

try{workspaceExercise = loadedData['workspace']}
catch(error){workspaceExercise = workspace_1}

demoWorkspace = Blockly.inject('blocklyDiv', {toolbox: toolboxExercise,trashcan:true, move:{
    scrollbars: {
      horizontal: true,
      vertical: true
    },
    drag: true,
    wheel: false}
});


//console.log("ingelezen");
Blockly.serialization.workspaces.load(workspaceExercise, demoWorkspace);
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
  var total_exercise = {
    toolbox: toolboxExercise,
    workspace: json
  }
  var str = JSON.stringify(total_exercise);
  return_saved_workspace(str);
}

function reloadWebpage(){
  reload_webpage();
}
