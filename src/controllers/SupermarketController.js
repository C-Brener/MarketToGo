import Supermarket from "../models/Supermerket.js";

export default class SupermarketController{

    static async register(req, res){

        const { name, location, register} = req.body;
        const isFieldMissing = (field, fieldName) => {
            if (!field) {
            res.status(422).json({ message: `The ${fieldName} is necessary` });
            return true;
            }
            return false;
        };
        switch (true) {
            case isFieldMissing(name, "name"):
            case isFieldMissing(location, "location"):
            case isFieldMissing(register, "register"):
            return;
        }

        SupermarketController.handleSupermarketVerification(register, res);

        const supermarket= new Supermarket({
            name: name,
            location: location,
            register: register
        });

        SupermarketController.handleSupermarketCreate(supermarket, req, res);
    }

    static async update(req, res) {
        const supermarketId = req.params.id;
        const { name, location, register} = req.body;
        const isFieldMissing = (field, fieldName) => {
            if (!field) {
            res.status(422).json({ message: `The ${fieldName} is necessary` });
            return true;
            }
            return false;
        };
        switch (true) {
            case isFieldMissing(name, "name"):
            case isFieldMissing(location, "location"):
            case isFieldMissing(register, "register"):
            return;
        }
    
        try {
            const supermarket = await Supermarket.findById(supermarketId);
    
            if (!supermarket) {
                return res.status(404).json({ message: 'Supermarket not found' });
            }  
            else if (name) {
                supermarket.name = name;
                supermarket.location = location;
                supermarket.register = register;
            }
    
            await supermarket.save();
    
            res.status(200).json({ message: 'Supermarket updated successfully', updatedProduct: supermarket.name });
        } catch (error) {
            res.status(500).json({ message: 'Error supermarket product', error: error.message });
        }
    }

    static async findById(req, res) {
        const supermarketId = req.params.id;
    
        try {
            const supermarket = await Supermarket.findById(supermarketId);
    
            if (!supermarket) {
                return res.status(404).json({ message: 'Supermarket not found' });
            }
    
            res.status(200).json({ supermarket });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error: error.message });
        }
    }

    static async findAll(req, res) {
        try {
            const supermarkets = await Supermarket.find();
    
            res.status(200).json({ supermarkets });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    }

    static async deleteSupermarket(req, res) {
        const supermarketId = req.params.id;
    
        try {
            const deletedSupermarket = await Supermarket.findByIdAndDelete(supermarketId);
    
            if (!deletedSupermarket) {
                return res.status(404).json({ message: 'Supermarket not found' });
            }
    
            res.status(200).json({ message: `Supermarket ${deletedSupermarket.name} deleted successfully`});
        } catch (error) {
            res.status(500).json({ message: 'Error deleting supermarket', error: error.message });
        }
    }
  

    static async handleSupermarketCreate(supermarket, req, res) {
        try {
          await supermarket.save();
    
          res.status(200).json({ message: `Supermarket ${supermarket.name} created`})
        } catch (error) {
          res.status(500).json({ message: error });
          return;
        }
    }

    static async handleSupermarketVerification(register, res) {
        const supermaketrExists = await Supermarket.findOne({ register: register}).maxTimeMS(3000);
        if (supermaketrExists) {
          res.status(422).json({ message: `The user email already exist` });
          return;
        }
    }
    
}