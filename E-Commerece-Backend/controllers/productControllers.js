const model = require("../model/productModel");

exports.getProducts = async (req, res) => {
  try {
    const porducts = await model.find();
    res.json(porducts);
    console.log("Displayed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
    process.exit(1);
  }
};

exports.postProducts = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;
    const product = new model({name, description, image, price});
    await product.save();
    res.json(product);
    console.log("Posted Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
    process.exit(1);
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const deleted = await model.findByIdAndDelete(req.params.id);
    if (deleted) {
      console.log("Deleted Successfully");
      res.json({ message: "Deleted Successfully" });
    } else {
      console.log("Delete Failed");
      res.status(500).json({ message: "Deleted Successfully" });
      process.exit(1);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
    process.exit(1);
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const {name,description,image,price} = req.body;
    const Updated = await model.findByIdAndUpdate(req.params.id,{name,description,image,price},{new:true})
    if (Updated) {
      console.log("Updated Successfully");
      res.json({ message: "Updated Successfully" });
    } else {
      console.log("Update Failed");
      res.status(500).json({ message: "Updated Successfully" });
      process.exit(1);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
    process.exit(1);
  }
};
