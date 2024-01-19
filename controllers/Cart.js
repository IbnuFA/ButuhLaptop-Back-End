import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import {
  ErrorResponseMessage,
  SuccessResponseMessage,
} from '../utils/response-message.js';
import { getFileURL,  } from "../services/file-upload-service.js";

//done
export const getCartByUser = async (req, res) => {
  try {
    let cart = await Cart.findAll({
      where: { userUuid: req.user.uuid },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image', 'description'],
        },
        {
          model: User,
          attributes: ['uuid', 'first_name', 'last_name', 'role', 'email'],
        },
      ],
    });
    cart = cart.map(({ dataValues }) => dataValues);
    cart = await Promise.all(cart.map(async (item) => {
      let imageURL;
      try {
          imageURL = await getFileURL(item.product.dataValues.image);
      } catch (error) {
        console.log(error)
          imageURL = item.product.dataValues.image;
      }

      return {
        ...item,
        product: {
          ...item.product.dataValues,
          image: imageURL,
        },
      }
    }));
    res.status(200).json({ msg: SuccessResponseMessage[200], data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};


export const addProductToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.user.uuid
  //find product in product table
  const product = await Product.findOne({ where: { id: product_id } });
  if (!product) {
    res.status(404).json({ msg: ErrorResponseMessage[404] });
    return;
  }
  //check product stock
  if (product.stock < quantity) {
    res.status(400).json({
      msg:
        'Gagal menambahkan ke keranjang. Stok Produk hanya tersisa' +
        product.stock,
    });
  }
  try {
    let productInCart = await Cart.findOne({
      where: {userUuid: userId, productId: product_id}
    });
    // console.log(productInCart)
    if(productInCart){
      await Cart.update({
        quantity: productInCart.dataValues.quantity + quantity
      }, {
        where: {id: productInCart.dataValues.id}
      })
    } else {
      const data = {
        userUuid: req.user.uuid,
        productId: product.dataValues.id,
        quantity,
        status: 0,
      };
      productInCart = await Cart.create(data);
    }
    let finalProductCart = await Cart.findOne({
      where: {userUuid: userId, productId: product_id}
    });
    res.status(201).json({ msg: SuccessResponseMessage[201], data: finalProductCart.dataValues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

//TODO: test
export const removeProductFromCart = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const findCart = await Cart.findOne({
      where: {userUuid: userId, productId: req.params.id}
    });
    if (!findCart) {
      return res.status(404).json({ msg: ErrorResponseMessage[404] });
    }

    if(findCart.dataValues.quantity === 1) {
      await Cart.destroy({ where: { id: findCart.dataValues.id } });
    } else {
      await Cart.update({
        quantity: findCart.dataValues.quantity - 1
      }, {
        where: {id: findCart.dataValues.id}
      })
    }

    res.status(200).json({ msg: SuccessResponseMessage[200] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
