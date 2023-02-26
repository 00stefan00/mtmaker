

function newClicked() {
    console.log(`newClicked`);
    buildEmptyMt()
}

function importClicked() {
    console.log(`importClicked`);
}

function exportClicked() {
    console.log(`exportClicked`);
}

function buildEmptyMt(){
    var contentElement = document.getElementById('content');

    var maxColumn = 5

    tree = createElement("div", "mission_tree")

    contentElement.append(tree)

    for (var i = 0; i < maxColumn; i++) {
        mission_branch = createElement("div", "mission_branch", i)
        tree.append(mission_branch)

        mission_node = createElement("div", "mission_node", `${i}-${1}`)

        mission_branch.append(mission_node)

    }
}

function getMissionNode(branch, mission){
    return document.getElementsByClassName("mission_node").namedItem(`${branch}-${mission}`)
}

function createElement(type, className=undefined, idName=undefined){
    element = document.createElement(type);
    if (className !== undefined) {
        element.setAttribute("class", className)
    }
    if (idName !== undefined) {
        element.setAttribute("id", idName)
    }
    return element
}