// Helper function to format names (capitalize first letter of each word)
export const formatName = (name: string) => {
  if (!name) return "friend";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getNameFromPath = () => {
  const pathSegments = window.location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Check if there is a type prefix (e.g., lec_, toho_, capstone_)
  if (!lastSegment || lastSegment === "") {
    return { type: "generic", name: "friend" };
  }

  // Check for different prefixes
  if (lastSegment.startsWith("lec_")) {
    const name = lastSegment.substring(4);
    // Format lecturer name (mr.john -> Mr. John)
    let prefix = "";
    if (name.toLowerCase().startsWith("mr.")) {
      prefix = "Mr. ";
      const formattedName =
        prefix + name.substring(3).charAt(0).toUpperCase() + name.substring(4);
      return { type: "lecturer", name: formattedName };
    } else if (name.toLowerCase().startsWith("ms.")) {
      prefix = "Ms. ";
      const formattedName =
        prefix + name.substring(3).charAt(0).toUpperCase() + name.substring(4);
      return { type: "lecturer", name: formattedName };
    }
    return { type: "lecturer", name: formatName(name) };
  }

  if (lastSegment.startsWith("toho_")) {
    return { type: "toho", name: formatName(lastSegment.substring(5)) };
  }

  if (lastSegment.startsWith("capstone_")) {
    return { type: "capstone", name: formatName(lastSegment.substring(9)) };
  }

  if (lastSegment.startsWith("best_")) {
    return { type: "best", name: formatName(lastSegment.substring(5)) };
  }

  // If no prefix, it's just a friend's name
  return { type: "friend", name: formatName(lastSegment) };
};

export const generateGraduationMessage = () => {
  const { name, type } = getNameFromPath();
  switch (type) {
    case "lecturer":
      return {
        name: `Dear ${name}`,
        message: `Thank you for your guidance and inspiration throughout my academic journey at RMIT. Your passion for teaching and dedication to students has made a tremendous impact on my education. As I celebrate my graduation, I'm grateful for the knowledge and wisdom you've shared.`,
      };

    case "toho":
      return {
        name: `Dear ${name}`,
        message: `The TOHO club wouldn't have been the same without you. Thanks for all the good times and support throughout our RMIT days. Really value the experiences we shared and how they've added to my university journey. Appreciate having you as part of this chapter!`,
      };

    case "capstone":
      return {
        name: `Hey ${name}`,
        message: `Really enjoyed working with you on our Capstone project! Your ideas and dedication made a big difference to our success. Thanks for being such a great teammate - made the whole experience much more enjoyable. Appreciate all your contributions!`,
      };

    case "best":
      return {
        name: `Dear ${name}`,
        message: `As I prepare to graduate, I want to take a moment to express my heartfelt gratitude for your unwavering support and friendship. Your presence in my life has made this journey at RMIT truly special. Thank you for being there through the ups and downs, and for being an incredible friend.`,
      };
    case "friend":
    default:
      return {
        name: `Hey ${name}`,
        message: `Thanks for making uni more fun! Appreciate all the laughs and good times at RMIT. Catch up soon?`,
      };
  }
};
