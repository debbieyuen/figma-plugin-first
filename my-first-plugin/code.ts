figma.showUI(__html__);
figma.ui.resize(500, 500);
figma.ui.onmessage = pluginMessage => {

  const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
  // const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
  // const defaultDark = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;

  // let variable lets us reassign the value depending on which variable we create an instance of
  let selectedVariant;

  console.log(pluginMessage.imageVariant);

  // defaultVariant.createInstance();

  // console.log(postComponentSet);
  // console.log(postComponentSet.children);
  // console.log(postComponentSet.name);

  // console.log(pluginMessage.name);
  // console.log(pluginMessage.username);
  // console.log(pluginMessage.description);
  // console.log(pluginMessage.darkModeState);
  // console.log(pluginMessage.imageVariant);

  if (pluginMessage.darkModeState == true) {
    switch(pluginMessage.imageVariant) {
      case "2":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
        // create instance of dark mode, single image
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
        // create instance of dark mode, carousel
        break;
      default:
        // create instance of dark mode, no image
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
        break;
    }
    // defaultDark.createInstance();
    // console.log("Welcome to the dark side.");
  } else {
    switch(pluginMessage.imageVariant) {
      case "2":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
        // create instance of light mode, single image
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
        // create instance of light mode, carousel
        break;
      default:
        // create instance of light mode, no image
        selectedVariant = postComponentSet.defaultVariant as ComponentNode;
        break;
    }
    // defaultVariant.createInstance();
    // console.log("I'm Mr.LightSide");
  }
  // store the variant
  const newPost = selectedVariant.createInstance();

  // close plugin once it is done running
  figma.closePlugin();
}