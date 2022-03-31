Blockly.JavaScript['blockly_test'] = function(block) {
  var dropdown_zon_maan = String(block.getFieldValue('zon/maan'));
  get_weather_data(null);
  var output = '';
  switch(dropdown_zon_maan){
    case 'sunrise':
      output = "zon komt op om: " + data_firestore.weather["astro"][dropdown_zon_maan];
      break;
    case 'sunset':
      output = "zon gaat onder om: " + data_firestore.weather["astro"][dropdown_zon_maan];
      break;
    case 'moonrise':
      output = "maan komt op om: " + data_firestore.weather["astro"][dropdown_zon_maan];
      break;
    case 'moonset':
      output = "maan gaat onder om: " + data_firestore.weather["astro"][dropdown_zon_maan];
      break;
  }
    var code = Blockly.JavaScript.quote_(output);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mirra'] = function(block) {
  var dropdown_mirra_kind = String(block.getFieldValue('mirra_kind'));
  var output = data_firestore.mirra[dropdown_mirra_kind];
  var code = Number(output);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_print'] = function(block){
  const msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
  Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'set_output(eval("' + msg + '"));';
}