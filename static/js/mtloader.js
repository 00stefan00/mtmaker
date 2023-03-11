 var modal = document.getElementById("modal");

function openModal() {
  modal.style.display = "block";
}

var rawText;
var lines;
function parseJSON() {
  // Get the selected file from the input element
  var selectedFile = document.getElementById("file-input").files[0];

  // Create a new FileReader object
  var reader = new FileReader();

  reader.onload = function(event) {
    var contents = event.target.result;
    rawText = contents;
    lines = rawText.split(`\r\n`);
    parse(lines)
  };

  reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
  };

  reader.readAsText(selectedFile);
}

// When the user clicks on the close button or outside of the modal, close the modal popup
function closeModal(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Attach an event listener to the window object to listen for clicks outside of the modal popup
window.addEventListener("click", closeModal);

function parse(lines){
  var indentationDepth = 0
  var branch = 0
  var branchName = ''
  var start = 0
  noneCodeBlock = ''
  for (var i = 0; i < lines.length; i++) {
    activeLine = lines[i].replace(/\t/g, '');
    if (activeLine.length < 1 || activeLine.startswith('#')){
      noneCodeBlock += activeLine
      noneCodeBlock += `\r\n`
    } 
    else if (startsWithBranchKeyword(activeLine)){
      dealWithBranchKeyWord(lines, i)
      indentationDepth++
    }
    else if (containsVariableDeclaration(activeLine)){
      if(containsOpeningBracket(activeLine)) {
        if(indentationDepth < 1) {
          branch++
        }
        indentationDepth++
        branch = getFirstWord(activeLine)
      }
    }
  }
}

function containsVariableDeclaration(line){
  regex = /^\w+=/;
  startsWithWordAndEquals = regex.test(line)
}

function containsOpeningBracket(line) {
  return line.includes("{");
}

function containsClosingBracket(line) {
  return line.includes("}");
}

function getFirstWord(line) {
  return line.split(' ')[0]
}

function startsWithBranchKeyword(line){
  branchKeyWords = ['slot', 'generic', 'ai', 'potential']
  branchKeyWords.includes(getFirstWord(line))
}

function dealWithBranchKeyWord(lines, i){
  branchInfo = {}
  switch(lines[i]) {

    case 'slot':
      branchInfo['slot'] = lines[i].split('=')[1]
  }

}