export const animationCreator = (node) => (animation) => (fn) => {
  if(animation.type){
    node.className =  'animated ' + animation.type
    return setTimeout(() => fn, animation.duration || 1000)

  } else {
    return fn
  }
}
