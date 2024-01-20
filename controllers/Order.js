import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import OrderDetail from '../models/Order-Detail.js';
import { getShippingCost } from '../services/logistic-service.js';
import { SuccessResponseMessage } from '../utils/response-message.js';
import { readableOrderStatus } from '../utils/util-functions.js';
import Shipping from '../models/Shipping.js';
import { ValidationError } from 'sequelize';
import { OrderStatus } from '../utils/global.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

export const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.findAll({
      attributes: ['id', 'products_price', 'total_price', 'currency', 'status', 'payment_prove', 'createdAt', 'updatedAt'],
      order: [['status', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['uuid', 'first_name', 'last_name', 'role', 'email', 'city_id', 'province_id', 'postal_code'],
        },
        {
          model: OrderDetail,
          attributes: ['id'],
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price', 'image', 'description', 'weight'],
            },
          ],
        },
      ],
    });

    res.status(200).json({ msg: SuccessResponseMessage[200], data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.uuid;
    let orders = await Order.findAll({
      attributes: ['id', 'products_price', 'total_price', 'currency', 'status', 'payment_prove', 'createdAt', 'updatedAt'],
      where: { userUuid: userId },
      order: [['status', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['uuid', 'first_name', 'last_name', 'role', 'email', 'city_id', 'province_id', 'postal_code'],
        },
        {
          model: OrderDetail,
          attributes: ['id'],
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price', 'image', 'description', 'weight'],
            },
          ],
        },
      ],
    });

    res.status(200).json({ msg: SuccessResponseMessage[200], data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const checkOrderPricing = async (userId) => {
  const userCarts = await Cart.findAll({
    where: { userUuid: userId },
    include: [
      {
        model: Product,
        attributes: ['id', 'name', 'price', 'image', 'description', 'weight'],
      },
      {
        model: User,
        attributes: ['uuid', 'first_name', 'last_name', 'role', 'email', 'city_id', 'province_id', 'postal_code'],
      },
    ],
  });
  // return userCarts
  if (userCarts.length == 0) {
    throw Error;
  }
  const user = userCarts[0].dataValues.user;

  let summary = {
    total_weight: 0,
    currency: 'IDR',
    products_price: 0,
    estimated_total_price_min: 0,
    estimated_total_price_max: 0,
    products: [],
    shippings: {},
  };

  for (const cartData of userCarts) {
    const cart = cartData.dataValues;
    summary.products_price += cart.quantity * cart.product.price;
    summary.products.push({
      ...cart.product.dataValues,
      quantity: cart.quantity
    });
    summary.total_weight += cart.product.weight;
  }
  const shippings = await getShippingCost(user.city_id, summary.total_weight);
  // console.log(shippings)
  summary.shippings = shippings;
  let costs = shippings.services.map((s) => +s.cost);
  // console.log({costs, min: Math.min(...[4000, 7000])})
  summary.estimated_total_price_min = Math.min(...costs) + summary.products_price;
  summary.estimated_total_price_max = Math.max(...costs) + summary.products_price;

  return summary;
};

const checkOrderPricingByOrder = async (orderId) => {
  const orders = await Order.findOne({
    where: { id: orderId },
    include: [
      {
        model: OrderDetail,
        include: [
          {
            model: Product,
          },
        ]
      },
      {
        model: User,
        attributes: ['uuid', 'first_name', 'last_name', 'role', 'email', 'city_id', 'province_id', 'postal_code'],
      },
    ],
  });
  // return orders
  if (!orders) {
    throw Error;
  }
  const user = orders.dataValues.user;

  let summary = {
    total_weight: 0,
    currency: 'IDR',
    products_price: 0,
    estimated_total_price_min: 0,
    estimated_total_price_max: 0,
    products: [],
    shippings: {},
  };

  for (const orderData of orders.dataValues.order_details) {
    const order = orderData.dataValues;
    const product = orderData.dataValues.product.dataValues;
    console.log({order, product})
    summary.products_price += order.quantity * order.product.price;
    summary.products.push(order.product);
    summary.total_weight += order.product.weight;
  }
  const shippings = await getShippingCost(user.city_id, summary.total_weight);
  // console.log(shippings)
  summary.shippings = shippings;
  let costs = shippings.services.map((s) => +s.cost);
  // console.log({costs, min: Math.min(...[4000, 7000])})
  summary.estimated_total_price_min = Math.min(...costs) + summary.products_price;
  summary.estimated_total_price_max = Math.max(...costs) + summary.products_price;

  return summary;
};

export const checkOrder = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    if (orderId) {
      const data = await checkOrderPricingByOrder(orderId);
      return res.status(200).json({ msg: SuccessResponseMessage[200], data });
    }

    const userId = req.user.uuid;

    res.status(200).json({ msg: SuccessResponseMessage[200], data: await checkOrderPricing(userId) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.uuid;
    //get all users products in cart
    const co = await checkOrderPricing(userId);
    //status order: 0 (need admin input), 1 (approved), 2 (customer payment), 3 (payment approval on admin), 4(sent), 9(expired)
    const order = await Order.create({
      products_price: co.products_price,
      currency: co.currency,
      status: OrderStatus.ORDER_PLACED,
      userUuid: userId,
    });

    let orderDetails = [];
    for (const item of co.products) {
      let temp = await OrderDetail.create({
        productId: item.id,
        orderId: order.dataValues.id,
        quantity: item.quantity
      });
      orderDetails.push(temp);
    }

    await Cart.destroy({ where: { userUuid: userId } });

    res.status(200).json({ msg: SuccessResponseMessage[200], data: { order, detail: orderDetails } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const adminAcceptOrder = async (req, res) => {
  try {
    const adminId = req.user.uuid;
    const orderId = req.params.id;
    const { approval } = req.body;
    const order = await Order.findOne({ where: { id: orderId } });
    if (order.dataValues.status != 0) throw Error('Order is not in confirmation state');
    const upd = await Order.update(
      {
        status: approval == true ? OrderStatus.ORDER_ACCEPTED : OrderStatus.ORDER_CANCELLED,
      },
      {
        where: { id: orderId },
      },
    );
    res.status(200).json({ msg: SuccessResponseMessage[200] + ` Order ${approval == true ? 'approved' : 'cancelled'}`, data: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const adminFillShippingInfo = async (req, res) => {
  try {
    const adminId = req.user.uuid;
    const orderId = req.params.id;
    let order = await Order.findOne({ where: { id: orderId }, include: { model: User } });
    if (order.dataValues.status != OrderStatus.ORDER_ACCEPTED) throw Error('Order state is not need to fill shipping info');

    const buyer = order.dataValues.user;

    const { provider, shipping_price, provider_service, etd } = req.body;
    const shipping = await Shipping.create({
      provider,
      shipping_price,
      provider_service,
      etd,
      reciever_postal: buyer.postal_code,
      receiver_address: buyer.address,
      receiver_province: buyer.province,
      receiver_city: buyer.city,
    });

    // if (order.dataValues.total_price == null) {
    //   order.dataValues.total_price = order.dataValues.products_price;
    // }

    const updOrder = await order.update({
      shippingId: shipping.dataValues.id,
      total_price: order.dataValues.products_price + shipping_price,
      status: OrderStatus.ORDER_NEEDS_PAYMENT,
    });

    order = await Order.findOne({ where: { id: orderId }, include: { model: Shipping } });
    res.status(200).json({ msg: SuccessResponseMessage[200], data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const payOrder = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const orderId = req.params.id;
    let order = await Order.findOne({ where: { id: orderId } });
    if (!order || order.dataValues.userUuid !== userId) throw new Error('Order not found');
    if (order.dataValues.status != OrderStatus.ORDER_NEEDS_PAYMENT) throw Error('Order state is not need payment');

    let filename = '';

    const uploadedFile = req.file;
    if (!['image/jpeg', 'image/png', 'image/jpeg'].includes(uploadedFile.mimetype)) {
      throw new ValidationError('Only JPEG, JPG, and PNG are allowed!');
    }

    console.log({ uploadedFile });
    filename = uploadedFile.filename;

    const upd = await Order.update(
      {
        payment_prove: filename,
        status: OrderStatus.ORDER_PAYED,
      },
      { where: { id: orderId } },
    );

    order = await Order.findOne({ where: { id: orderId } });
    res.status(200).json({ msg: 'File uploaded successfully!', data: order });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
};

export const adminVerifyPaymentOrder = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const orderId = req.params.id;
    let order = await Order.findOne({ where: { id: orderId } });
    if (order.dataValues.status !== OrderStatus.ORDER_PAYED) throw new Error('Order not in payment confirmation state');
    const { approval } = req.body;

    if (approval == true) {
      const upd = await Order.update(
        {
          status: OrderStatus.ORDER_ON_PROCESS,
        },
        {
          where: {
            id: orderId,
          },
        },
      );
    } else {
      res.status(200).json({ msg: 'Order status not updated', data: order });
      return;
    }

    order = await Order.findOne({ where: { id: orderId } });
    res.status(200).json({ msg: 'Payment Approved', data: order });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
};

export const adminUpdatePackageSent = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const orderId = req.params.id;
    let order = await Order.findOne({ where: { id: orderId } });
    if (order.dataValues.status !== OrderStatus.ORDER_ON_PROCESS) throw new Error('Order not in shipping sent confirmation state');
    const { approval } = req.body;

    if (approval === true) {
      const upd = await Order.update(
        {
          status: OrderStatus.ORDER_SENT,
        },
        {
          where: {
            id: orderId,
          },
        },
      );
    } else {
      res.status(200).json({ msg: 'Order status not updated', data: order });
      return;
    }

    order = await Order.findOne({ where: { id: orderId } });
    res.status(200).json({ msg: 'Order status updated', data: order });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
};

export const userConfirmPackageReceived = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const orderId = req.params.id;
    let order = await Order.findOne({ where: { id: orderId } });
    if (!order || order.dataValues.userUuid !== userId) throw new Error('Order not found');
    if (order.dataValues.status !== OrderStatus.ORDER_SENT) throw new Error('Order not in receive confirmation state');
    const { approval } = req.body;

    if (approval == true) {
      const upd = await Order.update(
        {
          status: OrderStatus.ORDER_DONE,
        },
        {
          where: {
            id: orderId,
          },
        },
      );
    } else {
      res.status(200).json({ msg: 'Order status not updated', data: order });
      return;
    }

    order = await Order.findOne({ where: { id: orderId } });
    res.status(200).json({ msg: 'Order status updated', data: order });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
};
