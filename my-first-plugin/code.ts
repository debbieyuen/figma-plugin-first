figma.showUI(__html__);
figma.ui.resize(500, 500);
figma.ui.onmessage = async (pluginMessage) => {

  //load font
  await figma.loadFontAsync({ family: "Rubik", style: "Regular"});

  // focus on the created component
  // an empty array
  const nodes: SceneNode[] = [];

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
  // store the corresponding text nodes
  // looking for these nodes from within the new post
  // find the node by name (node.name) and check they are of text node type (node.type == TEXT)
  const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
  const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
  const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;
  const numLikes = newPost.findOne(node => node.name === "likesLabel" && node.type === "TEXT") as TextNode;
  const numComments = newPost.findOne(node => node.name === "commentsLabel" && node.type === "TEXT") as TextNode;
  // overriding the text
  // replace characters with values submitted from the form
  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;
  numLikes.characters = (Math.floor(Math.random() * 1000) + 1).toString();
  numComments.characters = (Math.floor(Math.random() * 1000) + 1).toString();

  console.log(templateName.characters);
  console.log(templateUsername.characters);
  console.log(templateDescription.characters);

  nodes.push(newPost);
  // focus in on the created component
  figma.viewport.scrollAndZoomIntoView(nodes);
  // close plugin once it is done running
  figma.closePlugin();
}