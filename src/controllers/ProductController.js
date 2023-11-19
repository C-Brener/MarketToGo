import Product from "../models/Product.js";

export default class ProductController {

    static async register(req, res) {

        const { name, price, finished_date, market } = req.body;
        const isFieldMissing = (field, fieldName) => {
            if (!field) {
                res.status(422).json({ message: `The ${fieldName} is necessary` });
                return true;
            }
            return false;
        };
        switch (true) {
            case isFieldMissing(name, "name"):
            case isFieldMissing(price, "price"):
            case isFieldMissing(finished_date, "finished_date"):
            case isFieldMissing(market, "market"):
                return;
        }
        const product = new Product({
            name: name,
            price: price,
            finished_date: finished_date,
            market: market
        });

        ProductController.handleProductCreate(product, req, res);
    }

    static async update(req, res) {
        const productId = req.params.id;
        const { name, price, finished_date, market } = req.body;
        const isFieldMissing = (field, fieldName) => {
            if (!field) {
                res.status(422).json({ message: `The ${fieldName} is necessary` });
                return true;
            }
            return false;
        };
        switch (true) {
            case isFieldMissing(name, "name"):
            case isFieldMissing(price, "price"):
            case isFieldMissing(finished_date, "finished_date"):
            case isFieldMissing(market, "market"):
                return;
        }

        try {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            else if (name) {
                product.name = name;
                product.price = price;
                product.finished_date = finished_date;
                product.market = market;
            }

            await product.save();

            res.status(200).json({ message: 'Product updated successfully', updatedProduct: product.name });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    }

    static async findById(req, res) {
        const productId = req.params.id;

        try {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ product });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error: error.message });
        }
    }

    static async findAll(req, res) {
        try {
            const products = await Product.find();

            if (products.length == 0) {
                res.status(204).json();
            } else {
                res.status(200).json({ products });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        const productId = req.params.id;

        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: `Product ${deletedProduct.name} deleted successfully` });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    }

    static async handleProductCreate(product, req, res) {
        try {
            await product.save();

            res.status(200).json({ message: `Product ${product.name} created` })
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
    }
}

