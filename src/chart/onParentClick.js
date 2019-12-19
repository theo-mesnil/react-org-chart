module.exports = onParentClick

function onParentClick(config = {}, children) {
  const { treeData, getParent, render } = config
  const result = getParent(treeData)

  // Check if the result is a promise and render the children
  if (result.then) {
    return result.then(handler)
  } else {
    return handler(result)
  }

  function handler(result) {
    const currentNodeId = treeData.postNumber
    const currentUserName = treeData.userName
    const tree = result.children.map(item => {
      if (
        item.postNumber === currentNodeId &&
        item.userName === currentUserName
      ) {
        return { ...item, ...treeData }
      } else {
        return item
      }
    })

    result.children = tree
    config.treeData = result

    return render(config)
  }
}
